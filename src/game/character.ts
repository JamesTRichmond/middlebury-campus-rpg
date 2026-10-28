import { z } from 'zod';
import raw from '../../content/character.json';
export const creator = z.object({id:z.literal('character-creator'),greeterNpcId:z.literal('station-greeter'),greeting:z.string(),open:z.string(),title:z.string(),save:z.string(),end:z.string(),fields:z.record(z.array(z.string()).nonempty()),interests:z.array(z.string())}).parse(raw);
export const characterSchema = z.object({
  creatorVersion:z.literal(1),name:z.string().trim().min(1).max(80),pronouns:z.string().max(80),
  body:z.enum(['Compact','Tall','Broad']),skin:z.enum(['1','2','3','4','5','6','7','8']),
  hair:z.enum(['Straight','Wavy','Curls','Coils','Braids','Locs','Shaved']),facialHair:z.enum(['None','Beard','Moustache']),covering:z.enum(['None','Headwrap','Hijab','Turban','Kippah']),
  mobility:z.enum(['Foot','Wheelchair','Another aid']),otherAid:z.string().max(80),
  captions:z.boolean(),visualSoundCues:z.boolean(),highContrast:z.boolean(),palette:z.enum(['Default','Protanopia','Deuteranopia','Tritanopia']),uiScale:z.enum(['Default','Larger']),
  term:z.enum(['Choose later','Fall','Feb']),interests:z.array(z.enum(['Outdoors','Arts','Languages','Athletics','Science'])),firstGen:z.boolean(),international:z.boolean()
});
export type Character=z.infer<typeof characterSchema>;
export const defaultCharacter:Character={creatorVersion:1,name:'',pronouns:'',body:'Compact',skin:'1',hair:'Straight',facialHair:'None',covering:'None',mobility:'Foot',otherAid:'',captions:true,visualSoundCues:true,highContrast:false,palette:'Default',uiScale:'Default',term:'Choose later',interests:[],firstGen:false,international:false};
