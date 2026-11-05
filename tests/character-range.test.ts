import { it, expect } from 'vitest';
import { defaultCharacter, characterSchema, creator } from '../src/game/character';
import { rangeControls, defaultRange, characterRangeSchema } from '../src/game/character-range';
import { portraitShapes } from '../src/game/character-portrait';
import { rangeSpriteShapes } from '../src/game/character-sprite';
import type { PixelShape } from '../src/game/character-art';
import { startArrival, writeJourney, readJourney, SAVE_KEY } from '../src/game/arrival';
import { loadContent } from '../src/content/load';

// Compare painted pixels after occlusion, not rectangle names or element counts.
function pixels(shapes:PixelShape[],width:number,height:number){
 const colors:Record<string,string>={paper:'#f6ebd6',ink:'#302d28',pine:'#305c4d',gold:'#d6a45c',stone:'#a69d90',snow:'#e8f0ec',grass:'#879a6d',...Object.fromEntries(creator.skinTones.map(t=>['skin-'+t.id,t.hex]))};
 const raster=Array(width*height).fill(colors.paper);
 for(const s of shapes){expect([s.x,s.y,s.w,s.h].every(Number.isInteger)).toBe(true);expect(s.x).toBeGreaterThanOrEqual(0);expect(s.y).toBeGreaterThanOrEqual(0);expect(s.x+s.w).toBeLessThanOrEqual(width);expect(s.y+s.h).toBeLessThanOrEqual(height);expect(colors[s.color]).toBeDefined();for(let y=s.y;y<s.y+s.h;y++)for(let x=s.x;x<s.x+s.w;x++)raster[y*width+x]=colors[s.color];}
 return raster.join('');
}
it('every named drawing option changes the rendered portrait; labels remain independent',()=>{
 for(const context of [{},{thirdEyelid:'Closed'},{clothesColor:'Ink'},{surfaceColor:'Pine'},{hairColor:'Blond'},{outerwear:'Coat'}] as const){
  for(const c of rangeControls.filter(c=>!['voiceLabel','vocalFilter'].includes(c.key))){
   const images=c.options.map(option=>pixels(portraitShapes({...defaultCharacter,...defaultRange,...context,[c.key]:option}),160,180));
   expect(new Set(images).size,`${c.key} ${JSON.stringify(context)}`).toBe(c.options.length);
  }
 }
 expect(defaultRange.voiceLabel).toBe('Unspecified');expect(defaultRange.vocalFilter).toBe('None');
},30_000);
it('map retains native grid and readable silhouette, aid, accessory and trail choices',()=>{
 for(const key of ['buildKind','surfaceColor','furLength','accessory','stepTrail','frameColor','spokeMarks'] as const){const c=rangeControls.find(c=>c.key===key)!;const images=c.options.map(option=>pixels(rangeSpriteShapes({...defaultCharacter,mobility:'Wheelchair',...defaultRange,[key]:option}),64,80));expect(new Set(images).size,key).toBe(c.options.length);}
});
it('round trips all range choices and migrates existing characters without losing unrelated progress',()=>{
 const content=loadContent(),data=new Map<string,string>();const storage={getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>{data.set(k,v);}};
 const legacy:Record<string,unknown>={...defaultCharacter,name:'Ari',mobility:'Wheelchair',palette:'Tritanopia',futureNote:'Keep me'};delete legacy.range;
 const old={...startArrival('Home',content),character:legacy,notes:[{id:'note',text:'Saved note'}],doodads:[{id:'bag',slot:'desk'}],quests:{orientation:{stepIndex:0,done:false}},seasonView:'winter'};
 data.set(SAVE_KEY,JSON.stringify(old));const migrated=readJourney(storage,content).save!;expect(migrated).not.toBeNull();expect(migrated.character?.range).toEqual(defaultRange);expect(migrated.character?.futureNote).toBe('Keep me');
 for(const c of rangeControls)for(const option of c.options){const character=characterSchema.parse({...migrated.character,range:{...defaultRange,[c.key]:option}});const save={...migrated,character};expect(writeJourney(storage,save,content)).toBe(true);expect(readJourney(storage,content).save).toEqual(save);}
 expect(characterRangeSchema.safeParse({...defaultRange,pattern6:'Spots'}).success).toBe(false);expect(characterRangeSchema.safeParse({...defaultRange,furLength:'unknown'}).success).toBe(false);
 const before=data.get(SAVE_KEY)!;data.set(SAVE_KEY,JSON.stringify({...migrated,character:{...migrated.character,range:{...defaultRange,furLength:'unknown'}}}));const corrupt=data.get(SAVE_KEY);expect(readJourney(storage,content).readOnly).toBe(true);expect(writeJourney(storage,migrated,content)).toBe(false);expect(data.get(SAVE_KEY)).toBe(corrupt);expect(before).toContain('Ari');
});
