import {z} from 'zod';
import raw from '../../content/snow-bowl.json' with {type:'json'};
import type {Save} from './arrival';
import type {GameContent} from '../content/schema';
export const seasons=['spring','summer','fall','winter'] as const;
export const snowCopy=z.object({id:z.literal('snow-bowl-trip'),departureId:z.string(),destinationId:z.string(),title:z.string(),tripLabel:z.string(),description:z.string(),gameTitle:z.string(),sign:z.string(),success:z.string(),missed:z.string(),skipped:z.string()}).parse(raw);
export const snowStateSchema=z.object({phase:z.enum(['idle','travel','visit']),result:z.enum(['unplayed','success','missed','skipped'])});
export function changeSeason(s:Save,season:Save['seasonView']):Save{return {...s,seasonView:z.enum(seasons).parse(season)};}
export function unlockSnow(s:Save):Save{if(s.quests.orientation?.done&&s.unlockedPlaces.includes(snowCopy.departureId)&&(s.placeId===snowCopy.departureId||s.campus?.visited.includes(snowCopy.departureId)))return {...s,unlockedPlaces:[...new Set([...s.unlockedPlaces,snowCopy.destinationId])]};return s;}
export function startSnowTrip(s:Save,c:GameContent):Save{if(s.placeId!==snowCopy.departureId||!s.quests.orientation?.done||!s.unlockedPlaces.includes(snowCopy.destinationId)||!c.places.find(p=>p.id===s.placeId)?.exits.includes(snowCopy.destinationId))throw Error('Visit town before taking this trip');return {...s,snowBowl:{phase:'travel',result:s.snowBowl?.result??'unplayed'}};}
export function arriveSnow(s:Save):Save{if(s.snowBowl?.phase!=='travel'||s.placeId!==snowCopy.departureId)throw Error('Start the trip first');return {...s,placeId:snowCopy.destinationId,snowBowl:{...s.snowBowl,phase:'visit'}};}
export function playSnow(s:Save,choice:'star'|'circle'|'skip'):Save{if(s.snowBowl?.phase!=='visit'||s.placeId!==snowCopy.destinationId)throw Error('Arrive first');return {...s,snowBowl:{phase:'visit',result:choice==='star'?'success':choice==='circle'?'missed':'skipped'}};}
export function retrySnow(s:Save):Save{if(s.snowBowl?.phase!=='visit')throw Error('Arrive first');return {...s,snowBowl:{phase:'visit',result:'unplayed'}};}
export function returnFromSnow(s:Save):Save{if(!s.snowBowl||s.snowBowl.phase==='idle')throw Error('No active trip');return {...s,placeId:snowCopy.departureId,snowBowl:{...s.snowBowl,phase:'idle'}};}
