import { characterShapes } from '../game/character-art';
import { creator, type Character } from '../game/character';
export function CharacterPreview({value}:{value:Character}) {
 const label=`${value.body} character, ${creator.skinTones.find(t=>t.id===value.skin)?.name} skin, ${value.hairColor} ${value.hair} hair, ${value.facialHair}, ${value.covering}, ${value.mobility}, ${value.clothesColor} ${value.clothes}, ${value.bottom}, ${value.eyewear}, ${value.scarf}, ${value.bag}`;
 const shapes=characterShapes(value);
 function color(token:string){if(token.startsWith('skin-'))return creator.skinTones.find(t=>t.id===token.slice(5))!.hex;return `var(--color-${token})`;}
 return <aside className="live-preview" aria-label="Live character preview">
   <p>{value.name.trim()||'Your character'} · live preview</p>
   <svg role="img" aria-label={label} className={`preview-sprite ${value.mobility==='Wheelchair'?'wheelchair':''}`} width="192" height="240" viewBox="0 0 64 80" shapeRendering="crispEdges">
     {shapes.map((s,i)=><rect key={`${s.part}-${i}`} data-part={s.part} x={s.x} y={s.y} width={s.w} height={s.h} fill={color(s.color)}/>)}
   </svg>
   <p className="preview-help">Changes appear here immediately.</p>
 </aside>;
}
