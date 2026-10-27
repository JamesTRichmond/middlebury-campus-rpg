import { sections, flatten } from "./questions.mjs";
import {
  applyQuery,
  defaultRank,
  drift,
  isAnswered,
  labelFor,
  latestSubmission,
  loadStore,
  moveRank,
  saveStore,
  seedDraft,
  toggleMulti,
  toMarkdown,
  unanswered,
} from "./logic.mjs";

const flat = flatten(sections);
const root = document.querySelector("#app");
const live = document.querySelector("#live");
const params = new URLSearchParams(location.search);
// Accessing the browser property can itself throw before loadStore's try/catch.
let storage = null;
try { storage = window.localStorage; } catch { /* The existing unsaved-state banner handles this. */ }
const store = loadStore(storage);
let draft = applyQuery(seedDraft(store, params.get("version") ?? ""), params, flat);
let view = "card";
let storedOk = true;

function persist() {
  store.draft = draft;
  storedOk = saveStore(storage, store);
}

function say(message) {
  live.textContent = message;
}

function optionLabel(question, id) {
  return question.options.find((option) => option.id === id)?.label ?? id;
}

function ensureRank(question) {
  const current = draft.answers[question.id];
  if (!Array.isArray(current) || current.length !== question.options.length) {
    draft.answers[question.id] = defaultRank(question);
  }
}

function render() {
  persist();
  root.replaceChildren();
  if (view === "submitted") {
    root.append(submittedView());
    return;
  }
  if (view === "review") {
    root.append(reviewView());
    return;
  }
  if (view === "unanswered") {
    root.append(unansweredView());
    return;
  }
  root.append(cardView());
}

function shell(title, body) {
  const wrap = document.createElement("div");
  const h = document.createElement("h1");
  h.textContent = title;
  wrap.append(h, body);
  return wrap;
}

function progress(index) {
  const bar = document.createElement("div");
  bar.className = "progress";
  const question = flat[index];
  const label = document.createElement("p");
  label.id = "progress-label";
  const answeredCount = flat.filter((item) => isAnswered(item, draft.answers[item.id])).length;
  label.textContent = `Question ${index + 1} of ${flat.length} · ${question.sectionTitle} · ${answeredCount} answered`;
  const meter = document.createElement("div");
  meter.className = "meter";
  meter.setAttribute("role", "progressbar");
  meter.setAttribute("aria-valuemin", "1");
  meter.setAttribute("aria-valuemax", String(flat.length));
  meter.setAttribute("aria-valuenow", String(index + 1));
  meter.setAttribute("aria-labelledby", "progress-label");
  const fill = document.createElement("span");
  fill.style.width = `${((index + 1) / flat.length) * 100}%`;
  meter.append(fill);
  bar.append(label, meter);
  return bar;
}

function contextField(question) {
  const wrap = document.createElement("details");
  wrap.className = "context";
  const summary = document.createElement("summary");
  summary.textContent = "Add context or write your own answer";
  const area = document.createElement("textarea");
  area.id = `context-${question.id}`;
  area.value = draft.contexts[question.id] ?? "";
  const lab = document.createElement("label");
  lab.htmlFor = area.id;
  lab.className = "sr";
  lab.textContent = "Add context or write your own answer";
  area.addEventListener("input", () => {
    draft.contexts[question.id] = area.value;
    persist();
  });
  wrap.append(summary, lab, area);
  return wrap;
}

function previousNote(question) {
  const previous = latestSubmission(store);
  if (!previous) return document.createElement("span");
  const prior = previous.answers?.[question.id];
  if (prior == null) return document.createElement("span");
  const p = document.createElement("p");
  p.className = "prior";
  const text = labelFor(question, prior);
  p.textContent = `Last time (${previous.version || "unversioned"}): ${
    Array.isArray(text) ? text.join(", ") : text || "a matrix or blank"
  }`;
  return p;
}

function cardView() {
  const index = Math.min(Math.max(draft.step, 0), flat.length - 1);
  draft.step = index;
  const question = flat[index];
  const wrap = document.createElement("article");
  wrap.append(progress(index));
  if (!storedOk) {
    const warn = document.createElement("p");
    warn.className = "warn";
    warn.textContent = "This browser refused to save. Copy your report before you leave.";
    wrap.append(warn);
  }
  if (draft.seededFrom) {
    const seed = document.createElement("p");
    seed.className = "prior";
    seed.textContent = `Answers started from your last report (${draft.seededFrom.version || "unversioned"}). Change anything that is different in this version.`;
    wrap.append(seed);
  }
  const h = document.createElement("h2");
  h.id = "question-title";
  h.tabIndex = -1;
  h.textContent = question.prompt;
  wrap.append(h, previousNote(question), controls(question), contextField(question), nav(index));
  queueMicrotask(() => h.focus());
  return wrap;
}

function controls(question) {
  if (question.type === "single") return radios(question);
  if (question.type === "multi") return checks(question);
  if (question.type === "rank") return ranks(question);
  if (question.type === "matrix") return matrix(question);
  return document.createElement("p");
}

function radios(question) {
  const group = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.className = "sr";
  legend.textContent = question.prompt;
  group.append(legend);
  for (const option of question.options) {
    const id = `${question.id}-${option.id}`;
    const label = document.createElement("label");
    label.htmlFor = id;
    const input = document.createElement("input");
    input.type = "radio";
    input.name = question.id;
    input.id = id;
    input.value = option.id;
    input.checked = draft.answers[question.id] === option.id;
    input.addEventListener("change", () => {
      draft.answers[question.id] = option.id;
      persist();
    });
    label.append(input, document.createTextNode(option.label));
    group.append(label);
  }
  return group;
}

function checks(question) {
  const group = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = `Select up to ${question.selectMax}.`;
  group.append(legend);
  const note = document.createElement("p");
  note.className = "limit";
  note.setAttribute("aria-live", "polite");
  const selected = Array.isArray(draft.answers[question.id]) ? draft.answers[question.id] : [];
  note.textContent = `${selected.length} of ${question.selectMax} selected.`;
  group.append(note);
  for (const option of question.options) {
    const id = `${question.id}-${option.id}`;
    const label = document.createElement("label");
    label.htmlFor = id;
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.value = option.id;
    input.checked = selected.includes(option.id);
    input.addEventListener("change", () => {
      const next = toggleMulti(draft.answers[question.id], option.id, question.selectMax);
      const rejected = input.checked && !next.includes(option.id);
      draft.answers[question.id] = next;
      if (rejected) {
        input.checked = false;
        say(`Limit is ${question.selectMax}. Uncheck one to add another.`);
      }
      note.textContent = `${next.length} of ${question.selectMax} selected.`;
      persist();
    });
    label.append(input, document.createTextNode(option.label));
    group.append(label);
  }
  return group;
}

function ranks(question) {
  ensureRank(question);
  const list = document.createElement("ol");
  list.className = "rank";
  for (const optionId of draft.answers[question.id]) {
    const item = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = optionLabel(question, optionId);
    const up = document.createElement("button");
    up.type = "button";
    up.textContent = "Move up";
    up.setAttribute("aria-label", `Move up ${name.textContent}`);
    up.addEventListener("click", () => {
      draft.answers[question.id] = moveRank(draft.answers[question.id], optionId, -1);
      render();
    });
    const down = document.createElement("button");
    down.type = "button";
    down.textContent = "Move down";
    down.setAttribute("aria-label", `Move down ${name.textContent}`);
    down.addEventListener("click", () => {
      draft.answers[question.id] = moveRank(draft.answers[question.id], optionId, 1);
      render();
    });
    item.append(name, up, down);
    list.append(item);
  }
  return list;
}

function matrix(question) {
  const wrap = document.createElement("div");
  wrap.className = "matrix-scroll";
  const table = document.createElement("table");
  const caption = document.createElement("caption");
  caption.className = "sr";
  caption.textContent = question.prompt;
  const head = document.createElement("tr");
  head.append(document.createElement("th"));
  for (const column of question.columns) {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = column.label;
    head.append(th);
  }
  const thead = document.createElement("thead");
  thead.append(head);
  const body = document.createElement("tbody");
  const current = draft.answers[question.id] ?? {};
  for (const row of question.rows) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    th.textContent = row.label;
    tr.append(th);
    for (const column of question.columns) {
      const td = document.createElement("td");
      const id = `${question.id}-${row.id}-${column.id}`;
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `${question.id}-${row.id}`;
      input.id = id;
      input.checked = current[row.id] === column.id;
      input.addEventListener("change", () => {
        draft.answers[question.id] = { ...draft.answers[question.id], [row.id]: column.id };
        persist();
      });
      const label = document.createElement("label");
      label.htmlFor = id;
      label.className = "sr";
      label.textContent = `${row.label}: ${column.label}`;
      td.append(input, label);
      tr.append(td);
    }
    body.append(tr);
  }
  table.append(caption, thead, body);
  wrap.append(table);
  return wrap;
}

function nav(index) {
  const row = document.createElement("div");
  row.className = "nav";
  const back = document.createElement("button");
  back.type = "button";
  back.textContent = "Back";
  back.disabled = index === 0;
  back.addEventListener("click", () => {
    draft.step = index - 1;
    view = "card";
    render();
  });
  const skip = document.createElement("button");
  skip.type = "button";
  skip.textContent = "Skip";
  skip.addEventListener("click", () => go(index + 1));
  const next = document.createElement("button");
  next.type = "button";
  next.textContent = index === flat.length - 1 ? "Review" : "Next";
  next.addEventListener("click", () => go(index + 1));
  const jump = document.createElement("button");
  jump.type = "button";
  jump.textContent = `Unanswered (${unanswered(flat, draft.answers).length})`;
  jump.addEventListener("click", () => {
    view = "unanswered";
    render();
  });
  row.append(back, skip, next, jump);
  return row;
}

function go(index) {
  if (index >= flat.length) {
    view = "review";
  } else {
    draft.step = index;
    view = "card";
  }
  render();
}

function unansweredView() {
  const wrap = document.createElement("article");
  const h = document.createElement("h2");
  h.textContent = "Unanswered";
  const list = document.createElement("ul");
  const missing = unanswered(flat, draft.answers);
  if (missing.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Every question has an answer. You can still go back and edit.";
    wrap.append(h, p);
  } else {
    for (const question of missing) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `${question.sectionTitle}: ${question.prompt}`;
      button.addEventListener("click", () => {
        draft.step = flat.findIndex((item) => item.id === question.id);
        view = "card";
        render();
      });
      li.append(button);
      list.append(li);
    }
    wrap.append(h, list);
  }
  wrap.append(backToQuestion());
  return wrap;
}

function reviewView() {
  const wrap = document.createElement("article");
  const h = document.createElement("h2");
  h.textContent = "Review";
  wrap.append(h);
  const changes = drift(flat, draft.answers, latestSubmission(store)?.answers);
  if (latestSubmission(store)) {
    const p = document.createElement("p");
    p.textContent =
      changes.length === 0
        ? "Nothing labeled has changed since your previous submission."
        : `${changes.length} answer${changes.length === 1 ? "" : "s"} changed since your previous submission.`;
    wrap.append(p);
  }
  let lastSection = "";
  for (const question of flat) {
    if (question.sectionTitle !== lastSection) {
      lastSection = question.sectionTitle;
      const h3 = document.createElement("h3");
      h3.textContent = lastSection;
      wrap.append(h3);
    }
    const block = document.createElement("div");
    block.className = "review-item";
    const prompt = document.createElement("p");
    prompt.textContent = question.prompt;
    const answer = document.createElement("p");
    const shown = labelFor(question, draft.answers[question.id]);
    answer.textContent = Array.isArray(shown)
      ? shown.join(", ") || "(blank)"
      : shown || (question.type === "matrix" ? "See rows in the report" : "(blank)");
    const context = document.createElement("p");
    context.textContent = draft.contexts[question.id]?.trim()
      ? `Context: ${draft.contexts[question.id].trim()}`
      : "Context: (none)";
    const edit = document.createElement("button");
    edit.type = "button";
    edit.textContent = "Edit";
    edit.addEventListener("click", () => {
      draft.step = flat.findIndex((item) => item.id === question.id);
      view = "card";
      render();
    });
    block.append(prompt, answer, context, edit);
    wrap.append(block);
  }
  const row = document.createElement("div");
  row.className = "nav";
  const back = document.createElement("button");
  back.type = "button";
  back.textContent = "Back";
  back.addEventListener("click", () => {
    draft.step = flat.length - 1;
    view = "card";
    render();
  });
  const submit = document.createElement("button");
  submit.type = "button";
  submit.className = "primary";
  submit.textContent = "Confirm & Submit";
  submit.addEventListener("click", () => void submitReport());
  row.append(back, submit);
  wrap.append(row);
  return wrap;
}

function submittedView() {
  const wrap = document.createElement("article");
  const banner = document.createElement("p");
  banner.className = "banner";
  banner.setAttribute("role", "status");
  banner.textContent = draft.copyOk
    ? "Copied to clipboard — paste directly into chat."
    : "Could not copy automatically. Select the report and copy it, or use Copy again.";
  const pre = document.createElement("textarea");
  pre.className = "report";
  pre.readOnly = true;
  pre.value = draft.report ?? "";
  pre.setAttribute("aria-label", "Feedback report");
  const row = document.createElement("div");
  row.className = "nav";
  const again = document.createElement("button");
  again.type = "button";
  again.textContent = "Copy again";
  again.addEventListener("click", () => void copyReport(pre));
  const download = document.createElement("button");
  download.type = "button";
  download.textContent = "Download .md";
  download.addEventListener("click", () => downloadReport());
  const back = document.createElement("button");
  back.type = "button";
  back.textContent = "← Back to Review / Edit Answers";
  back.addEventListener("click", () => {
    view = "review";
    render();
  });
  row.append(again, download, back);
  wrap.append(banner, pre, row);
  return wrap;
}

async function submitReport() {
  const previous = latestSubmission(store);
  draft.submittedAt = new Date().toISOString();
  draft.report = toMarkdown({ flat, draft, previous, stored: storedOk });
  const submission = {
    at: draft.submittedAt,
    testerId: draft.testerId,
    version: draft.version,
    answers: structuredClone(draft.answers),
    contexts: structuredClone(draft.contexts),
  };
  store.submissions.push(submission);
  store.draft = draft;
  storedOk = saveStore(storage, store);
  draft.copyOk = await writeClipboard(draft.report);
  view = "submitted";
  render();
}

async function copyReport(pre) {
  draft.copyOk = await writeClipboard(draft.report ?? "");
  if (!draft.copyOk && pre) pre.focus();
  pre?.select?.();
  say(draft.copyOk ? "Copied." : "Copy failed. The report is selected.");
  const banner = root.querySelector(".banner");
  if (banner) {
    banner.textContent = draft.copyOk
      ? "Copied to clipboard — paste directly into chat."
      : "Could not copy automatically. The report is selected.";
  }
}

async function writeClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.append(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

function downloadReport() {
  const blob = new Blob([draft.report ?? ""], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `midd-playtest-${draft.version || "unversioned"}.md`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function backToQuestion() {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Back";
  button.addEventListener("click", () => {
    view = "card";
    render();
  });
  return button;
}

render();
