import arrival from "../../content/arrival.json";
import places from "../../content/places.json";
import npcs from "../../content/npcs.json";
import quests from "../../content/quests/quests.json";
import abilities from "../../content/abilities.json";
import lessons from "../../content/lessons.json" with {type:"json"};
import calendar from "../../content/calendar.json";
import { contentSchema } from "./schema";

// The browser uses the same schema/data as validation, without Node filesystem imports.
export const content = contentSchema.parse({ arrival, places, npcs, quests, abilities, lessons, calendar });
