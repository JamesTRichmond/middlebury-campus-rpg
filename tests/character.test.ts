import { describe,it,expect } from 'vitest';
import { defaultCharacter,characterSchema } from '../src/game/character';
import { startArrival,writeJourney,readJourney,replayArrival } from '../src/game/arrival';
import { loadContent } from '../src/content/load';
const content=loadContent();
describe('M2 character',()=>{
 it('round trips wheelchair, colorblind access and optional identity without dropping notes',()=>{
 const character=characterSchema.parse({...defaultCharacter,name:'Ari',pronouns:'they/she',mobility:'Wheelchair',palette:'Deuteranopia',captions:true,firstGen:true,term:'Feb',interests:['Arts']});
 const save={...startArrival('Home',content),character,notes:[{id:'keep',text:'Keep this'}]};
 const map=new Map<string,string>();const storage={getItem:(k:string)=>map.get(k)??null,setItem:(k:string,v:string)=>{map.set(k,v);}};
 expect(writeJourney(storage,save,content)).toBe(true);const loaded=readJourney(storage,content).save!;expect(loaded.character).toEqual(character);expect(loaded.notes).toEqual(save.notes);expect(replayArrival(loaded,'Home',content).character).toEqual(character);
 });
 it('never infers optional flags, term, interests or pronouns and rejects blank names',()=>{expect(defaultCharacter.firstGen).toBe(false);expect(defaultCharacter.international).toBe(false);expect(defaultCharacter.interests).toEqual([]);expect(defaultCharacter.pronouns).toBe('');expect(defaultCharacter.term).toBe('Choose later');expect(characterSchema.safeParse({...defaultCharacter,name:'  '}).success).toBe(false);});
});
