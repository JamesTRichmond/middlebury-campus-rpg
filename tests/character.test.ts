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

it('loads pre-wardrobe characters without losing their choices and saves the new visible options',()=>{
 const old={...defaultCharacter,name:'Returner',skin:'8',hair:'Locs',mobility:'Wheelchair' as const,palette:'Tritanopia' as const};
 const legacy:Record<string,unknown>={...old};for(const k of ['hairColor','clothes','clothesColor','bottom','eyewear','scarf','bag'])delete legacy[k];
 const upgraded=characterSchema.parse(legacy);expect(upgraded.name).toBe('Returner');expect(upgraded.skin).toBe('8');expect(upgraded.mobility).toBe('Wheelchair');expect(upgraded.clothes).toBe('Sweater');
 const character=characterSchema.parse({...upgraded,clothes:'Jacket',hairColor:'Silver',bottom:'Skirt',eyewear:'Round glasses',scarf:'Scarf',bag:'Shoulder bag'});
 const store=new Map<string,string>();const storage={getItem:(k:string)=>store.get(k)??null,setItem:(k:string,v:string)=>{store.set(k,v);}};
 const save={...startArrival('Home',content),character,notes:[{id:'note',text:'Still here'}]};expect(writeJourney(storage,save,content)).toBe(true);expect(readJourney(storage,content).save).toEqual(save);
});
