export const FORM_ID = "midd-skillgame-feedback";
export const STORAGE_KEY = "midd-campus-rpg.feedback.v1";

const demoOptions = [
  ["D1-letter-train", "D1 — Letter and train"],
  ["D2-character", "D2 — Character and accessibility"],
  ["D3-escort", "D3 — Walk from the station to the dorm"],
  ["D4-dorm", "D4 — Unpack and doodads"],
  ["D5-campus", "D5 — Campus: dining, library, portraits"],
  ["D6-class", "D6 — Class, virtual lesson, notes, questions"],
  ["D7-town", "D7 — Town beyond Triangle Park"],
  ["D8-snow", "D8 — Seasons and Snow Bowl"],
  ["later", "A later build, or I am not sure which demo"],
];

function opts(pairs) {
  return pairs.map(([id, label]) => ({ id, label }));
}

export const sections = [
  {
    id: "session",
    title: "This playtest",
    questions: [
      {
        id: "demo",
        type: "single",
        prompt: "Which demo did you just play?",
        options: opts(demoOptions),
      },
      {
        id: "device",
        type: "single",
        prompt: "What did you play on?",
        options: opts([
          ["phone", "Phone"],
          ["tablet", "Tablet"],
          ["laptop", "Laptop"],
          ["desktop", "Desktop"],
          ["other-device", "Something else"],
        ]),
      },
      {
        id: "duration",
        type: "single",
        prompt: "How long did you play this version?",
        options: opts([
          ["under-5", "Under 5 minutes"],
          ["5-15", "5 to 15 minutes"],
          ["15-30", "15 to 30 minutes"],
          ["over-30", "More than 30 minutes"],
        ]),
      },
    ],
  },
  {
    id: "start",
    title: "Could you play it",
    questions: [
      {
        id: "loaded",
        type: "single",
        prompt: "Did this version load and let you play?",
        options: opts([
          ["yes", "Yes"],
          ["partial", "Partly — I got stuck or it broke"],
          ["no", "No"],
        ]),
      },
      {
        id: "first-clear",
        type: "single",
        prompt: "Within the first minute, was it clear what this demo was asking you to do?",
        options: opts([
          ["clear", "Clear"],
          ["unclear", "I could click around but I was guessing"],
          ["lost", "I did not know what to do"],
          ["not-there", "The promised scene was not in this build"],
        ]),
      },
      {
        id: "stuck",
        type: "multi",
        selectMax: 4,
        prompt: "Where did you get stuck? Select up to 4.",
        options: opts([
          ["load", "It did not load"],
          ["controls", "I could not tell how to move or continue"],
          ["text", "Text was hard to read or cut off"],
          ["access", "An accessibility option did not work"],
          ["dead-end", "I hit a dead end"],
          ["none", "I did not get stuck"],
        ]),
      },
      {
        id: "landed",
        type: "matrix",
        prompt: "How did each part land in this build? Choose one column per row. Skip a row only if you truly have no impression.",
        rows: [
          { id: "letter", label: "Acceptance letter" },
          { id: "train", label: "Train into the station" },
          { id: "character", label: "Character and access" },
          { id: "walk", label: "Walk to the dorm" },
          { id: "class", label: "Class matches the virtual lesson" },
          { id: "town", label: "Town, seasons, or Snow Bowl" },
        ],
        columns: [
          { id: "absent", label: "Not in this build" },
          { id: "broken", label: "Broken" },
          { id: "weak", label: "Weak" },
          { id: "good", label: "Good" },
          { id: "strong", label: "Delightful" },
        ],
      },
    ],
  },
  {
    id: "arrival",
    title: "Arrival",
    questions: [
      {
        id: "letter",
        type: "single",
        prompt: "The opening letter felt like an acceptance to Middlebury, and it was clear the game is unofficial.",
        options: opts([
          ["yes", "Yes"],
          ["unclear-unofficial", "It felt like an acceptance, but not clearly unofficial"],
          ["no", "No"],
          ["absent", "Not in this build"],
        ]),
      },
      {
        id: "train",
        type: "single",
        prompt: "The train ride read as traveling into Vermont and arriving at Middlebury station.",
        options: opts([
          ["yes", "Yes"],
          ["vague", "I knew it was a train, not that I had arrived in Middlebury"],
          ["no", "No"],
          ["absent", "Not in this build"],
        ]),
      },
      {
        id: "origin",
        type: "single",
        prompt: "Setting where you were traveling from was available, and it only affected the trip, not a guess about your real life.",
        options: opts([
          ["yes", "Yes"],
          ["confusing", "It was there but confusing"],
          ["no", "No"],
          ["absent", "Not in this build"],
        ]),
      },
      {
        id: "third-person",
        type: "single",
        prompt: "After the greeter asked what to call you, play shifted into a third-person character you could see.",
        options: opts([
          ["yes", "Yes"],
          ["partial", "The question happened, but I did not become a visible character"],
          ["no", "No"],
          ["absent", "Not in this build"],
        ]),
      },
    ],
  },
  {
    id: "character",
    title: "Character and access",
    questions: [
      {
        id: "name-pronouns",
        type: "single",
        prompt: "You could set your name and pronouns, including pronouns that were not in the suggestion list.",
        options: opts([
          ["yes", "Yes"],
          ["list-only", "Only from a short list"],
          ["no", "No"],
          ["absent", "Not in this build"],
        ]),
      },
      {
        id: "appearance",
        type: "multi",
        selectMax: 6,
        prompt: "Which appearance options were actually there? Select every that applies, up to 6.",
        options: opts([
          ["skin", "A wide range of skin tones"],
          ["hair", "Hair including textured or protective styles"],
          ["face-hair", "Facial hair"],
          ["covering", "Cultural or religious head coverings"],
          ["body", "More than one body shape"],
          ["thin", "Too few options to feel included"],
        ]),
      },
      {
        id: "wheelchair",
        type: "single",
        prompt: "Wheelchair was a real option, and the path you needed in this demo was completable with it.",
        options: opts([
          ["yes", "Yes"],
          ["sprite-only", "I could pick it, but the path did not work with it"],
          ["no", "I could not pick it"],
          ["absent", "Not in this build"],
        ]),
      },
      {
        id: "access-tools",
        type: "multi",
        selectMax: 6,
        prompt: "Which access tools worked in this version? Select every that applies, up to 6.",
        options: opts([
          ["captions", "Captions"],
          ["visual-sound", "Visual cues when something makes a sound"],
          ["colorblind", "Colorblind palettes"],
          ["contrast", "High contrast"],
          ["scale", "Larger interface"],
          ["screen-reader", "Screen reader could reach the controls"],
        ]),
      },
    ],
  },
  {
    id: "campus",
    title: "Campus life",
    questions: [
      {
        id: "places",
        type: "multi",
        selectMax: 5,
        prompt: "Which of these did you actually visit as your character? Select every that applies, up to 5.",
        options: opts([
          ["dorm", "Your dorm room"],
          ["dining", "A dining hall"],
          ["library", "The library"],
          ["central", "Another central campus place"],
          ["none", "None of these"],
        ]),
      },
      {
        id: "tasks",
        type: "single",
        prompt: "Orientation tasks told you what to do next without expiring or punishing you for skipping.",
        options: opts([
          ["yes", "Yes"],
          ["punished", "I was locked out or rushed"],
          ["aimless", "There were no tasks, and I was aimless"],
          ["absent", "Not in this build"],
        ]),
      },
      {
        id: "facts",
        type: "single",
        prompt: "Campus facts that were stated as true were distinguishable from sample or unconfirmed text.",
        options: opts([
          ["yes", "Yes"],
          ["mixed", "Some were labeled, some were not"],
          ["no", "No — it all sounded official"],
          ["absent", "Not in this build"],
        ]),
      },
    ],
  },
  {
    id: "class",
    title: "Class and the virtual lesson",
    questions: [
      {
        id: "entered-class",
        type: "single",
        prompt: "You entered a classroom as your character, not as a disembodied menu.",
        options: opts([
          ["yes", "Yes"],
          ["menu", "It was a menu or a video with no character"],
          ["no", "No"],
          ["absent", "Not in this build"],
        ]),
      },
      {
        id: "same-lesson",
        type: "single",
        prompt: "The teacher delivered the same lesson as the virtual lesson for that class, not a different speech.",
        options: opts([
          ["yes", "Yes — it matched"],
          ["diverged", "The teacher added or changed the lesson"],
          ["no-virtual", "I could not tell what the virtual lesson was"],
          ["absent", "Not in this build"],
        ]),
      },
      {
        id: "notes",
        type: "single",
        prompt: "You took notes during the lesson, and they were still there after you left the room.",
        options: opts([
          ["yes", "Yes"],
          ["lost", "I took notes and they disappeared"],
          ["no-notes", "I could not take notes"],
          ["absent", "Not in this build"],
        ]),
      },
      {
        id: "question",
        type: "single",
        prompt: "You asked a question, and the answer came from that lesson rather than from a generic chatbot.",
        options: opts([
          ["yes", "Yes"],
          ["off-lesson", "The answer was not from the lesson"],
          ["no-ask", "I could not ask"],
          ["absent", "Not in this build"],
        ]),
      },
      {
        id: "class-rank",
        type: "rank",
        prompt: "Rank what this class still needs, most urgent first.",
        options: opts([
          ["fidelity", "Teacher sticks to the virtual lesson"],
          ["notes", "Notes that persist"],
          ["questions", "Questions answered from the lesson"],
          ["presence", "Being in the room as your character"],
          ["pace", "Room to listen without being rushed"],
        ]),
      },
    ],
  },
  {
    id: "world",
    title: "Town, seasons, Snow Bowl",
    questions: [
      {
        id: "triangle",
        type: "single",
        prompt: "Triangle Park worked as the door between campus and town, and the game did not pretend that door is an official campus boundary.",
        options: opts([
          ["yes", "Yes"],
          ["official-claim", "It claimed to be the official boundary"],
          ["no", "I could not use it that way"],
          ["absent", "Not in this build"],
        ]),
      },
      {
        id: "town-spots",
        type: "multi",
        selectMax: 4,
        prompt: "After campus objectives, which town places could you enter? Select every that applies, up to 4.",
        options: opts([
          ["theater", "Movie theater"],
          ["food", "Restaurants or cafés"],
          ["other", "Other downtown places"],
          ["none", "Town did not open"],
        ]),
      },
      {
        id: "seasons",
        type: "single",
        prompt: "You could toggle the map across seasons without losing quests or your place.",
        options: opts([
          ["yes", "Yes"],
          ["broke-state", "The toggle changed or wiped my progress"],
          ["no", "No toggle"],
          ["absent", "Not in this build"],
        ]),
      },
      {
        id: "snow",
        type: "single",
        prompt: "The Snow Bowl was a trip you could choose, and the minigame did not block the story if you skipped or failed it.",
        options: opts([
          ["yes", "Yes"],
          ["required", "I was forced through it, or failure blocked me"],
          ["next-door", "It was treated like a building next to the dorm"],
          ["absent", "Not in this build"],
        ]),
      },
    ],
  },
  {
    id: "art",
    title: "Look and feel",
    questions: [
      {
        id: "pixel",
        type: "single",
        prompt: "On the map, you and the world read as cozy pixel art in a 16-bit to 64-bit range, not as a menu of buttons and not as a copy of a commercial game.",
        options: opts([
          ["yes", "Yes"],
          ["buttons", "It was mostly buttons or a list"],
          ["copy", "It looked copied from another game"],
          ["absent", "No map in this build"],
        ]),
      },
      {
        id: "portrait",
        type: "single",
        prompt: "Talking to someone opened a portrait more detailed than their map sprite.",
        options: opts([
          ["yes", "Yes"],
          ["same", "The portrait was just the tiny sprite"],
          ["no", "No portrait"],
          ["absent", "Not in this build"],
        ]),
      },
    ],
  },
  {
    id: "drift",
    title: "Since last time",
    questions: [
      {
        id: "played-before",
        type: "single",
        prompt: "Have you playtested an earlier version of this game?",
        options: opts([
          ["yes", "Yes"],
          ["no", "No, this is my first"],
        ]),
      },
      {
        id: "compared",
        type: "single",
        prompt: "Compared with the last version you played, this one is:",
        options: opts([
          ["better", "Better — the promised work landed"],
          ["same", "About the same"],
          ["mixed", "Better in places, worse in others"],
          ["worse", "Worse — something regressed"],
          ["na", "I have nothing to compare"],
        ]),
      },
      {
        id: "regressions",
        type: "multi",
        selectMax: 6,
        prompt: "What got worse or drifted, if anything? Select every that applies, up to 6.",
        options: opts([
          ["none", "Nothing I noticed"],
          ["start", "The opening"],
          ["access", "Accessibility"],
          ["move", "Movement or the walk"],
          ["class", "The class no longer matches the lesson"],
          ["save", "Progress, notes, or the room did not keep"],
          ["facts", "Facts that used to be careful are now stated as certain"],
        ]),
      },
    ],
  },
  {
    id: "next",
    title: "What next",
    questions: [
      {
        id: "fix-first",
        type: "rank",
        prompt: "Rank what the next build should fix first.",
        options: opts([
          ["playable", "Make this demo reliably playable"],
          ["access", "Accessibility"],
          ["arrival", "Letter, train, and character"],
          ["map", "The pixel map and the walk"],
          ["lesson", "Class matches the virtual lesson"],
          ["notes", "Notes and questions"],
          ["town", "Town, seasons, or Snow Bowl"],
          ["facts", "Stop stating unsure facts as true"],
        ]),
      },
      {
        id: "blocker",
        type: "single",
        prompt: "Is there a problem that should stop new features until it is fixed?",
        options: opts([
          ["no", "No"],
          ["yes", "Yes — I will describe it in the context box"],
        ]),
      },
    ],
  },
];

export function flatten(list = sections) {
  const flat = [];
  for (const section of list) {
    for (const question of section.questions) {
      flat.push({
        ...question,
        sectionId: section.id,
        sectionTitle: section.title,
      });
    }
  }
  return flat;
}
