import {z} from 'zod';
import raw from '../../content/dorm.json' with {type:'json'};
import type {Save} from './arrival';
export const dormCopy=z.object({id:z.literal('dorm-settle'),title:z.string(),origin:z.string(),notice:z.string(),end:z.string(),items:z.array(z.object({id:z.string(),name:z.string()})).length(3),slots:z.array(z.object({id:z.string(),name:z.string(),x:z.number().int()})).length(3)}).parse(raw);
export const dormStateSchema=z.object({unpacked:z.boolean(),finished:z.boolean()});
export function openDorm(s:Save):Save{if(s.placeId!=='dorm-room'||!s.quests.welcome?.done)throw Error('Reach your room first');return {...s,dorm:s.dorm??{unpacked:false,finished:false}};}
export function unpack(s:Save):Save{return {...openDorm(s),dorm:{unpacked:true,finished:s.dorm?.finished??false}};}
export function placeDoodad(s:Save,id:string,slot:string):Save{if(!s.dorm?.unpacked||!dormCopy.items.some(i=>i.id===id)||!dormCopy.slots.some(i=>i.id===slot))throw Error('Invalid placement');if(s.doodads.some(d=>d.id!==id&&d.slot===slot&&dormCopy.items.some(i=>i.id===d.id)))throw Error('That spot is occupied');return {...s,doodads:[...s.doodads.filter(d=>d.id!==id),{id,slot}]};}
export function canFinish(s:Save){return Boolean(s.dorm?.unpacked&&dormCopy.items.every(i=>s.doodads.some(d=>d.id===i.id&&dormCopy.slots.some(p=>p.id===d.slot))));}
export function finishDorm(s:Save):Save{if(!canFinish(s))throw Error('Place all three items first');return {...s,dorm:{unpacked:true,finished:true}};}
