import { portraitShapes } from '../game/character-portrait';
import { rangeSpriteShapes } from '../game/character-sprite';
import { creator, type Character } from '../game/character';
import { rangeControls } from '../game/character-range';
export function CharacterPreview({value,dialogue=false}:{value:Character;dialogue?:boolean}) {
 const appearance=`${value.body}, ${creator.skinTones.find(t=>t.id===value.skin)?.name} skin, ${value.hairColor} ${value.hair}, ${value.facialHair}, ${value.covering}, ${value.mobility}, ${value.clothesColor} ${value.clothes}, ${value.bottom}, ${value.eyewear}, ${value.scarf}, ${value.bag}`;
 const label=`${appearance}. ${rangeControls.map(c=>`${c.label}: ${value.range[c.key]}`).join('; ')}`;
 const art={...value,...value.range};
 function color(token:string){if(token.startsWith('skin-'))return creator.skinTones.find(t=>t.id===token.slice(5))!.hex;return `var(--color-${token})`;}
 return <aside className={`live-preview ${dialogue?'dialogue-preview':''}`} aria-label="Live character preview">
   <p>{value.name.trim()||'Your character'} · {dialogue?'portrait':'live preview'}</p>
   <div className="preview-drawings">
    <svg role="img" aria-label={`Portrait: ${label}`} className="preview-portrait" width="320" height="360" viewBox="0 0 160 180" shapeRendering="crispEdges">
     {portraitShapes(art).map((s,i)=><rect key={`${s.part}-${i}`} data-part={s.part} x={s.x} y={s.y} width={s.w} height={s.h} fill={color(s.color)}/>)}
    </svg>
    <svg role="img" aria-label={`Map sprite: ${appearance}`} className={`preview-sprite ${value.mobility==='Wheelchair'?'wheelchair':''}`} width="64" height="80" viewBox="0 0 64 80" shapeRendering="crispEdges">
     {rangeSpriteShapes(art).map((s,i)=><rect key={`${s.part}-${i}`} data-part={s.part} x={s.x} y={s.y} width={s.w} height={s.h} fill={color(s.color)}/>)}
    </svg>
   </div>
   <p className="preview-help">Portrait · Map sprite<br/>Voice: {value.range.voiceLabel} · Filter: {value.range.vocalFilter}</p>
   <p className="preview-help">{value.mobility!=='Wheelchair'?'Aid detail shown separately when on foot. ':''}Changes appear immediately.</p>
 </aside>;
}
