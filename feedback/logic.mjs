import { FORM_ID, STORAGE_KEY, flatten } from "./questions.mjs";

export { FORM_ID, STORAGE_KEY };

export function emptyDraft(version = "") {
  return {
    testerId: newId(),
    step: 0,
    version,
    answers: {},
    contexts: {},
    submitted: false,
  };
}

function newId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `tester-${Date.now()}`;
}

export function emptyStore() {
  return { draft: null, submissions: [] };
}

export function loadStore(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return emptyStore();
    return {
      draft: parsed.draft ?? null,
      submissions: Array.isArray(parsed.submissions) ? parsed.submissions : [],
    };
  } catch {
    return emptyStore();
  }
}

export function saveStore(storage, store) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(store));
    return true;
  } catch {
    return false;
  }
}

export function latestSubmission(store) {
  const list = store.submissions ?? [];
  return list.length ? list[list.length - 1] : null;
}

export function seedDraft(store, version) {
  if (store.draft?.answers) return structuredClone(store.draft);
  const previous = latestSubmission(store);
  const draft = emptyDraft(version);
  if (previous) {
    draft.testerId = previous.testerId || draft.testerId;
    draft.answers = structuredClone(previous.answers ?? {});
    draft.contexts = structuredClone(previous.contexts ?? {});
    draft.seededFrom = {
      at: previous.at,
      version: previous.version,
      demo: previous.answers?.demo ?? "",
    };
  }
  return draft;
}

export function applyQuery(draft, params, flat) {
  const demo = params.get("demo");
  const version = params.get("version");
  if (version) draft.version = version;
  const demoQuestion = flat.find((question) => question.id === "demo");
  if (demo && demoQuestion?.options.some((option) => option.id === demo)) {
    draft.answers.demo = demo;
  }
  return draft;
}

export function labelFor(question, value) {
  if (question.type === "matrix") {
    if (!value || typeof value !== "object") return "";
    return (question.rows ?? [])
      .filter((row) => value[row.id])
      .map(
        (row) =>
          `${row.label}: ${question.columns.find((column) => column.id === value[row.id])?.label ?? value[row.id]}`,
      )
      .join("; ");
  }
  if (value == null || value === "") {
    return question.type === "multi" || question.type === "rank" ? [] : "";
  }
  const options = question.options ?? [];
  const one = (id) => options.find((option) => option.id === id)?.label ?? String(id);
  if (question.type === "single") return one(value);
  if (question.type === "multi" || question.type === "rank") {
    return (Array.isArray(value) ? value : []).map(one);
  }
  return String(value);
}

export function toggleMulti(current, optionId, selectMax) {
  const list = Array.isArray(current) ? [...current] : [];
  const index = list.indexOf(optionId);
  if (index >= 0) {
    list.splice(index, 1);
    return list;
  }
  if (list.length >= selectMax) return list;
  list.push(optionId);
  return list;
}

export function moveRank(order, optionId, direction) {
  const list = [...order];
  const index = list.indexOf(optionId);
  if (index < 0) return list;
  const next = index + direction;
  if (next < 0 || next >= list.length) return list;
  const [item] = list.splice(index, 1);
  list.splice(next, 0, item);
  return list;
}

export function defaultRank(question) {
  return question.options.map((option) => option.id);
}

export function unanswered(flat, answers) {
  return flat.filter((question) => !isAnswered(question, answers[question.id]));
}

export function isAnswered(question, value) {
  if (question.type === "rank") return Array.isArray(value) && value.length === question.options.length;
  if (question.type === "multi") return Array.isArray(value) && value.length > 0;
  if (question.type === "matrix") {
    if (!value || typeof value !== "object") return false;
    return question.rows.some((row) => Boolean(value[row.id]));
  }
  return typeof value === "string" && value.length > 0;
}

export function drift(flat, currentAnswers, previousAnswers) {
  if (!previousAnswers) return [];
  const lines = [];
  for (const question of flat) {
    const before = canonicalize(question, previousAnswers[question.id]);
    const after = canonicalize(question, currentAnswers[question.id]);
    if (before === after) continue;
    lines.push({
      id: question.id,
      prompt: question.prompt,
      before: before || "(blank)",
      after: after || "(blank)",
    });
  }
  return lines;
}

function canonicalize(question, value) {
  if (question.type === "matrix") {
    if (!value || typeof value !== "object") return "";
    return question.rows
      .map((row) => `${row.label}: ${question.columns.find((column) => column.id === value[row.id])?.label ?? "—"}`)
      .join("; ");
  }
  const label = labelFor(question, value);
  return Array.isArray(label) ? label.join(", ") : label;
}

export function toMarkdown({ flat, draft, previous, stored }) {
  const bySection = new Map();
  for (const question of flat) {
    if (!bySection.has(question.sectionTitle)) bySection.set(question.sectionTitle, []);
    bySection.get(question.sectionTitle).push(question);
  }
  const demo = labelFor(
    flat.find((question) => question.id === "demo"),
    draft.answers.demo,
  );
  const lines = [
    `# Playtest feedback`,
    ``,
    `- Form: ${FORM_ID}`,
    `- Tester: ${draft.testerId}`,
    `- Demo: ${demo || "(not chosen)"}`,
    `- Version: ${draft.version || "(none)"}`,
    `- Submitted: ${draft.submittedAt ?? ""}`,
    `- Saved in this browser: ${stored ? "yes" : "no"}`,
    ``,
  ];
  if (draft.seededFrom) {
    lines.push(
      `Started from the submission on ${draft.seededFrom.at} (version ${draft.seededFrom.version || "unknown"}, demo ${draft.seededFrom.demo || "unknown"}).`,
      ``,
    );
  }
  let number = 1;
  for (const [title, questions] of bySection) {
    lines.push(`## ${title}`, ``);
    for (const question of questions) {
      lines.push(`### ${number}. ${question.prompt}`, ``);
      lines.push(answerBlock(question, draft.answers[question.id]));
      const context = (draft.contexts[question.id] ?? "").trim();
      lines.push(`- Context: ${context || "(none)"}`, ``);
      number += 1;
    }
  }
  const changes = drift(flat, draft.answers, previous?.answers);
  lines.push(`## What changed since the previous submission`, ``);
  if (!previous) {
    lines.push(`No earlier submission was stored in this browser.`, ``);
  } else if (changes.length === 0) {
    lines.push(
      `Previous submission ${previous.at}, version ${previous.version || "unknown"}. No answer labels changed.`,
      ``,
    );
  } else {
    lines.push(
      `Previous submission ${previous.at}, version ${previous.version || "unknown"}.`,
      ``,
    );
    for (const change of changes) {
      lines.push(`- ${change.prompt}`, `  - Was: ${change.before}`, `  - Now: ${change.after}`);
    }
    lines.push(``);
  }
  lines.push(`## Previous submission`, ``);
  if (!previous) {
    lines.push(`None.`, ``);
  } else {
    lines.push(`- At: ${previous.at}`, `- Version: ${previous.version || "(none)"}`, ``);
    for (const question of flat) {
      const text = canonicalize(question, previous.answers?.[question.id]) || "(blank)";
      const context = (previous.contexts?.[question.id] ?? "").trim();
      lines.push(`- ${question.prompt}: ${text}${context ? ` — context: ${context}` : ""}`);
    }
    lines.push(``);
  }
  return lines.join("\n");
}

function answerBlock(question, value) {
  if (question.type === "matrix") {
    const rows = question.rows.map((row) => {
      const chosen = value?.[row.id];
      const label = question.columns.find((column) => column.id === chosen)?.label ?? "(blank)";
      return `- ${row.label}: ${label}`;
    });
    return rows.join("\n");
  }
  const label = labelFor(question, value);
  if (Array.isArray(label)) {
    if (label.length === 0) return `- Answer: (blank)`;
    if (question.type === "rank") {
      return label.map((item, index) => `${index + 1}. ${item}`).join("\n");
    }
    return label.map((item) => `- ${item}`).join("\n");
  }
  return `- Answer: ${label || "(blank)"}`;
}
