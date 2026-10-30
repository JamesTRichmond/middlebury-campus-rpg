import type {Save} from '../game/arrival';
import {changeSeason,seasons} from '../game/seasons-snow';
import './seasons.css';
export function SeasonControl({save,onSave}:{save:Save;onSave:(s:Save)=>void}){return <label className="season-control">Season<select aria-label="Season" value={save.seasonView} onChange={e=>onSave(changeSeason(save,e.target.value as Save['seasonView']))}>{seasons.map(s=><option key={s} value={s}>{s}</option>)}</select><small>Presentation only · your progress stays saved</small></label>;}
