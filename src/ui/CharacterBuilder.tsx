import { useEffect, useRef, useState } from 'react';
import { characterSchema, creator, defaultCharacter, type Character } from '../game/character';
import type { Save } from '../game/arrival';
import './character.css';
export function CharacterBuilder({save,onSave,onClose,version,warning}:{save:Save;onSave:(s:Save)=>void;onClose:()=>void;version:string;warning?:string}) {
  const parsed=characterSchema.safeParse(save.character);
  const [value,setValue]=useState<Character>(parsed.success?parsed.data:defaultCharacter);
  const [done,setDone]=useState(false);const heading=useRef<HTMLHeadingElement>(null);
  useEffect(()=>{heading.current?.focus();},[done]);
  function update<K extends keyof Character>(key:K,v:Character[K]){setValue(s=>({...s,[key]:v}));}
  const labels:Record<string,string>={body:'Body',skin:'Skin tone',hair:'Hair',facialHair:'Facial hair',covering:'Head covering',mobility:'Mobility',palette:'Colorblind palette',uiScale:'UI scale',term:'Start term (optional)'};
  const skin=['#f4d9c0','#e5b894','#d39a72','#b57755','#965b3e','#75432f','#52301f','#332018'][+value.skin-1];
  return <main className={`creator ${value.highContrast?'contrast':''} ${value.uiScale==='Larger'?'larger':''}`} data-palette={value.palette} data-captions={value.captions} data-visual-cues={value.visualSoundCues}>
    <h1 tabIndex={-1} ref={heading}>{done?'Your character is ready':creator.title}</h1>
    {done?<><p>{creator.end}</p><button className="button" onClick={()=>setDone(false)}>Edit character</button><a className="button" href={`feedback/index.html?demo=D2-character&version=${version}`}>Give feedback</a><button className="button" onClick={onClose}>Back to platform</button>{warning&&<p role="alert">{warning}</p>}</>:<form onSubmit={e=>{e.preventDefault();onSave({...save,character:characterSchema.parse(value)});setDone(true);}}>
      <label>Name<input required pattern={".*\\S.*"} maxLength={80} value={value.name} onChange={e=>update('name',e.target.value)} /></label>
      <label>Pronouns · write your own<input maxLength={80} value={value.pronouns} onChange={e=>update('pronouns',e.target.value)} /></label>
      <div className="pronoun-suggestions" aria-label="Pronoun suggestions">{['they/them','she/her','he/him'].map(p=><button type="button" key={p} onClick={()=>update('pronouns',p)}>{p}</button>)}</div>
      {Object.entries(creator.fields).map(([key,options])=><label key={key}>{labels[key]}<select aria-label={labels[key]} value={String(value[key as keyof Character])} onChange={e=>update(key as keyof Character,e.target.value as never)}>{options.map(o=><option key={o}>{o}</option>)}</select></label>)}
      {value.mobility==='Another aid'&&<label>Other aid (optional)<input maxLength={80} value={value.otherAid} onChange={e=>update('otherAid',e.target.value)}/></label>}
      <div className="character-preview" role="img" aria-label={`${value.body} character with ${value.hair} hair, ${value.covering} covering, ${value.mobility}`}>
        <span className={`preview-sprite ${value.mobility==='Wheelchair'?'wheelchair':''}`} style={{'--skin':skin,'--body-width':value.body==='Broad'?'20px':value.body==='Tall'?'12px':'16px'} as React.CSSProperties}>
          <i className="sprite-head"/><i className={`sprite-hair hair-${value.hair}`}/><i className="sprite-body"/><i className="sprite-legs"/>{value.covering!=='None'&&<i className="sprite-covering"/>}{value.facialHair!=='None'&&<i className="sprite-beard"/>}{value.mobility==='Wheelchair'&&<i className="sprite-wheel"/>}{value.mobility==='Another aid'&&<i className="sprite-aid"/>}
        </span>
      </div>
      <fieldset><legend>Accessibility · applies now</legend>{(['captions','visualSoundCues','highContrast'] as const).map(k=><label key={k}><input type="checkbox" checked={value[k]} onChange={e=>update(k,e.target.checked)}/>{{captions:'Captions',visualSoundCues:'Visual sound cues',highContrast:'High contrast'}[k]}</label>)}</fieldset>
      {value.captions&&<p className="caption">Greeter: {creator.greeting}</p>}{value.visualSoundCues&&<p className="sound-cue">♪ Station ambience · visual cue</p>}
      <fieldset><legend>Interests (optional)</legend>{creator.interests.map(i=><label key={i}><input type="checkbox" checked={value.interests.includes(i as never)} onChange={e=>update('interests',e.target.checked?[...value.interests,i as never]:value.interests.filter(x=>x!==i))}/>{i}</label>)}</fieldset>
      <fieldset><legend>Optional · choose only if you want</legend>{(['firstGen','international'] as const).map(k=><label key={k}><input type="checkbox" checked={value[k]} onChange={e=>update(k,e.target.checked)}/>{k==='firstGen'?'First-generation':'International'}</label>)}</fieldset>
      <button className="button" type="submit">{creator.save}</button><button className="button" type="button" onClick={onClose}>Back to platform</button>
    </form>}
  </main>;
}
