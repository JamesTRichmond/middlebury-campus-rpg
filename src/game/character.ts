import { z } from 'zod';
import raw from '../../content/character.json' with {type:'json'};
import { characterRangeSchema, defaultRange } from './character-range';
export { rangeControls, defaultRange, characterRangeSchema } from './character-range';
export type { CharacterRange, RangeKey } from './character-range';
export const creator = z.object({id:z.literal('character-creator'),greeterNpcId:z.literal('station-greeter'),greeting:z.string(),open:z.string(),title:z.string(),save:z.string(),end:z.string(),fields:z.record(z.array(z.string()).nonempty()),interests:z.array(z.string()),skinTones:z.array(z.object({id:z.string(),name:z.string(),hex:z.string().regex(/^#[a-fA-F0-9]{6}$/)}))}).parse(raw);
export const characterSchema = z.object({
  range:characterRangeSchema.default(defaultRange),
  creatorVersion:z.literal(1),name:z.string().trim().min(1).max(80),pronouns:z.string().max(80),
  body:z.enum(['Compact','Tall','Broad']),skin:z.enum(['1','2','3','4','5','6','7','8']),
  hair:z.enum(['Straight','Wavy','Curls','Coils','Braids','Locs','Shaved','Afro','Bun','Ponytail']),facialHair:z.enum(['None','Beard','Moustache','Goatee']),covering:z.enum(['None','Headwrap','Hijab','Turban','Kippah']),
  hairColor:z.enum(['Ink','Brown','Blond','Silver','Auburn']).default('Ink'),
  clothes:z.enum(['Sweater','Jacket','T-shirt']).default('Sweater'),clothesColor:z.enum(['Pine','Gold','Stone','Ink']).default('Pine'),bottom:z.enum(['Trousers','Skirt']).default('Trousers'),eyewear:z.enum(['None','Square glasses','Round glasses']).default('None'),scarf:z.enum(['None','Scarf']).default('None'),bag:z.enum(['None','Shoulder bag']).default('None'),
  mobility:z.enum(['Foot','Wheelchair','Another aid']),otherAid:z.string().max(80),
  captions:z.boolean(),visualSoundCues:z.boolean(),highContrast:z.boolean(),palette:z.enum(['Default','Protanopia','Deuteranopia','Tritanopia']),uiScale:z.enum(['Default','Larger']),
  term:z.enum(['Choose later','Fall','Feb']),interests:z.array(z.enum(['Outdoors','Arts','Languages','Athletics','Science'])),firstGen:z.boolean(),international:z.boolean()
});
export type Character=z.infer<typeof characterSchema>;
export const defaultCharacter:Character={range:{...defaultRange},hairColor:'Ink',clothes:'Sweater',clothesColor:'Pine',bottom:'Trousers',eyewear:'None',scarf:'None',bag:'None',creatorVersion:1,name:'',pronouns:'',body:'Compact',skin:'1',hair:'Straight',facialHair:'None',covering:'None',mobility:'Foot',otherAid:'',captions:true,visualSoundCues:true,highContrast:false,palette:'Default',uiScale:'Default',term:'Choose later',interests:[],firstGen:false,international:false};
