import { Dorm } from './Dorm';
import { openDorm } from '../game/dorm';
import { Escort } from './Escort';
import { beginEscort } from '../game/escort';
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CharacterBuilder } from "./CharacterBuilder";
import { creator, characterSchema } from "../game/character";
import { content } from "../content/bundle";
import { advanceRide, replayArrival, feedbackPath, originSchema, readJourney, rideCaption, startArrival, writeJourney, type Save } from "../game/arrival";
import { PlatformScene, TrainWindow } from "./Scenes";

declare const __BUILD_VERSION__: string;

function browserStorage() {
  try { return window.localStorage; } catch { return null; }
}

export function Arrival() {
  const copy = content.arrival;
  const [boot] = useState(() => readJourney(browserStorage(), content));
  const [save, setSave] = useState<Save | null>(boot.save);
  const [origin, setOrigin] = useState(boot.save?.origin ?? "");
  const [invalidOrigin, setInvalidOrigin] = useState(false);
  const [warning, setWarning] = useState(boot.warning);
  const heading = useRef<HTMLHeadingElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [escorting,setEscorting]=useState(Boolean(boot.save?.escort));
  const [inDorm,setInDorm]=useState(Boolean(boot.save?.dorm));
  const [building, setBuilding] = useState(false);
  const [replaying, setReplaying] = useState(false);
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const stage = replaying ? "letter" : save?.arrival.stage ?? "letter";
  const step = copy.rideSteps[save?.arrival.beat ?? 0];
  const focusKey = `${stage}-${save?.arrival.beat ?? 0}`;
  const previousStage = useRef(focusKey);

  useEffect(() => {
    if (previousStage.current !== focusKey) {
      heading.current?.focus();
      previousStage.current = focusKey;
    }
  }, [focusKey]);

  useEffect(() => {
    const c = characterSchema.safeParse(save?.character);
    const root = document.documentElement;
    root.dataset.palette = c.success ? c.data.palette : 'Default';
    root.dataset.contrast = c.success && c.data.highContrast ? 'high' : 'default';
    root.dataset.uiScale = c.success ? c.data.uiScale : 'Default';
    root.dataset.captions = String(c.success ? c.data.captions : true);
    root.dataset.visualCues = String(c.success ? c.data.visualSoundCues : true);
  }, [save]);

  function persist(next: Save) {
    if (!boot.readOnly && !writeJourney(browserStorage(), next, content)) setWarning(copy.saveWarning);
    setSave(next);
  }

  function leaveHome(event: FormEvent) {
    event.preventDefault();
    const parsed = originSchema.safeParse(origin);
    if (!parsed.success) { setInvalidOrigin(true); input.current?.focus(); return; }
    persist(save ? replayArrival(save, parsed.data, content) : startArrival(parsed.data, content));
    setReplaying(false);
  }

  if (stage === "letter" || !save) return <main className="arrival letter-stage" data-stage="letter">
    <form className="letter" onSubmit={leaveHome} noValidate aria-labelledby="letter-title">
      <p className="unofficial">{copy.unofficialLabel}</p>
      <h1 id="letter-title" className="letter-title" ref={heading} tabIndex={-1}>{copy.title}</h1>
      <p className="letter-body">{copy.body}</p>
      <div className="text-field">
        <label htmlFor="origin">{copy.originLabel}</label>
        <input id="origin" name="origin" type="text" dir="auto" ref={input} value={origin} maxLength={80}
          placeholder={copy.originPlaceholder} autoComplete="off" aria-required="true"
          aria-invalid={invalidOrigin} aria-describedby={invalidOrigin ? "origin-help origin-error" : "origin-help"}
          onChange={(event) => { setOrigin(event.target.value); if (invalidOrigin) setInvalidOrigin(false); }} />
        {invalidOrigin && <p id="origin-error" role="alert" className="field-error">{copy.originError}</p>}
      </div>
      <p id="origin-help" className="origin-help">{copy.originHelp}</p>
      <button className="button" type="submit">{copy.continueLabel}</button>
      <p className="legal">{copy.disclaimer}</p>
      {warning && <p className="letter-warning" role="alert">{warning}</p>}
    </form>
  </main>;

  if (building && save) return <CharacterBuilder save={save} onSave={persist} onClose={() => setBuilding(false)} version={__BUILD_VERSION__} warning={warning} onEscort={()=>{persist(beginEscort(save,content));setBuilding(false);setEscorting(true);}} />;

  if(inDorm && stage==="platform" && save.dorm) return <Dorm save={save} onSave={persist} onClose={()=>setInDorm(false)} version={__BUILD_VERSION__} warning={warning}/>;
  if(escorting && stage==="platform" && save.escort) return <Escort save={save} onSave={persist} onDorm={()=>{persist(openDorm(save));setInDorm(true);}} onSettings={()=>setBuilding(true)} onClose={()=>setEscorting(false)} version={__BUILD_VERSION__} warning={warning}/>;

  const station = content.places.find((place) => place.id === copy.placeId);
  if (!station) return <main><p role="alert">Missing arrival place: {copy.placeId}</p></main>;

  return <main className={`arrival scene-stage ${stage}-stage`} data-stage={stage}>
    <h1 className="scene-title" tabIndex={-1} ref={heading}>{stage === "train" ? copy.trainTitle : copy.platformTitle}</h1>
    {stage === "train" ? <div className="ride-body">
      <p className="ride-progress" aria-live="polite">{step.title}</p>
      <TrainWindow scene={step.id} paused={paused} />
      <p className="ride-story">{step.caption}</p>
      <p className="ride-origin">{rideCaption(save, content)}</p>
      <div className="ride-actions">
        <button className="button" onClick={() => persist(advanceRide(save, content))}>{step.action}</button>
        <button className="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? copy.resumeLabel : copy.pauseLabel}</button>
      </div>
      <p className="journey-label">{copy.journeyLabel}</p>
      {warning && <p role="alert">{warning}</p>}
    </div> : <div className="ending-layout">
      <PlatformScene name={station.name} caption={copy.platformCaption} />
      <section className="ending-copy" aria-labelledby="end-title">
        <p>{creator.greeting}</p><button className="button" onClick={() => setBuilding(true)}>{creator.open}</button>
        {characterSchema.safeParse(save.character).success&&<button className="button" onClick={()=>{persist(beginEscort(save,content));setEscorting(true);}}>Walk with the greeter</button>}<h2 id="end-title">{copy.endTitle}</h2><p>{copy.endBody}</p>
        <a className="button" href={feedbackPath(__BUILD_VERSION__)}>{copy.feedbackLabel}</a>
        <button className="button" onClick={() => setReplaying(true)}>{copy.replayLabel}</button>
        <p className="journey-label">{copy.feedbackHint}</p>
        {warning && <p role="alert">{warning}</p>}
      </section>
    </div>}
  </main>;
}
