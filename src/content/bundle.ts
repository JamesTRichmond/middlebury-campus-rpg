import arrival from "../../content/arrival.json" with {type:'json'};
import places from "../../content/places.json" with {type:'json'};
import npcs from "../../content/npcs.json" with {type:'json'};
import quests from "../../content/quests/quests.json" with {type:'json'};
import abilities from "../../content/abilities.json" with {type:'json'};
import lessons from "../../content/lessons.json" with {type:"json"};
import calendar from "../../content/calendar.json" with {type:'json'};
import { contentSchema } from "./schema";

// The browser uses the same schema/data as validation, without Node filesystem imports.
export const content = contentSchema.parse({ arrival, places, npcs, quests, abilities, lessons, calendar });
