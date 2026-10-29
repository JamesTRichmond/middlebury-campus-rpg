import {z} from 'zod';
import raw from '../../content/escort.json';
import type {Save} from './arrival';
import type {GameContent} from '../content/schema';
const rect=z.object({x:z.number().int(),y:z.number().int(),w:z.number().int().positive(),h:z.number().int().positive()});
export const escortCopy=z.object({id:z.literal('escort-arrival'),status:z.literal('placeholder'),questId:z.string(),npcId:z.string(),width:z.number(),height:z.number(),path:rect,spawn:z.object({x:z.number(),y:z.number()}),stops:z.array(z.object({placeId:z.string(),x:z.number(),label:z.string(),lineId:z.string()})),obstacles:z.array(rect),title:z.string(),framing:z.string(),instructions:z.string(),start:z.string(),resume:z.string(),talk:z.string(),close:z.string(),blocked:z.string(),end:z.string(),sample:z.string(),lines:z.array(z.string())}).parse(raw);
export const escortStateSchema=z.object({x:z.number().int().min(8).max(1912),y:z.number().int().min(192).max(248),facing:z.enum(['north','east','south','west']),trail:z.array(z.object({x:z.number().int(),y:z.number().int()})).max(10)});
export type Direction=z.infer<typeof escortStateSchema>['facing'];
export function beginEscort(save:Save,c:GameContent):Save{
 for(const [i,stop] of escortCopy.stops.entries()){const place=c.places.find(p=>p.id===stop.placeId);if(!place||(i>0&&!c.places.find(p=>p.id===escortCopy.stops[i-1].placeId)?.exits.includes(stop.placeId)))throw Error('Invalid escort route');}
 if(save.escort)return save;
 const q=c.quests.find(q=>q.id===escortCopy.questId);if(!q)throw Error('Missing escort quest');
 return {...save,placeId:escortCopy.stops[0].placeId,escort:{...escortCopy.spawn,facing:'east',trail:[]},quests:{...save.quests,[q.id]:save.quests[q.id]??{stepIndex:1,done:false}}};
}
export function moveEscort(save:Save,direction:Direction,c:GameContent):Save{
 const e=escortStateSchema.parse(save.escort);const [dx,dy]={north:[0,-8],east:[8,0],south:[0,8],west:[-8,0]}[direction];const x=e.x+dx,y=e.y+dy;
 const blocked=x<8||x>1912||y<192||y>248||escortCopy.obstacles.some(o=>x+8>o.x&&x-8<o.x+o.w&&y+8>o.y&&y-8<o.y+o.h);
 if(blocked)return {...save,escort:{...e,facing:direction}};
 const next=escortCopy.stops[Math.floor(x/320)],current=c.places.find(p=>p.id===save.placeId);
 if(next.placeId!==save.placeId&&!current?.exits.includes(next.placeId))throw Error('Missing graph exit');
 const q=c.quests.find(q=>q.id===escortCopy.questId)!;let progress=save.quests[q.id];const step=q.steps[progress.stepIndex];if(step?.on.type==='enter-place'&&step.on.placeId===next.placeId)progress={stepIndex:progress.stepIndex+1,done:progress.stepIndex+1===q.steps.length};
 return {...save,placeId:next.placeId,escort:{x,y,facing:direction,trail:[...e.trail,{x:e.x,y:e.y}].slice(-10)},quests:{...save.quests,[q.id]:progress}};
}
