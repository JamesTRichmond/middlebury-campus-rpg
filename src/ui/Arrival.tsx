import { useEffect, useRef, useState, type FormEvent } from "react";
import { content } from "../content/bundle";
import { arrive, feedbackPath, originSchema, readJourney, rideCaption, startArrival, writeJourney, type Save } from "../game/arrival";
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
  const stage = save?.arrival.stage ?? "letter";
  const previousStage = useRef(stage);

  useEffect(() => {
    if (previousStage.current !== stage) {
      heading.current?.focus();
      previousStage.current = stage;
    }
  }, [stage]);

  function persist(next: Save) {
    if (!boot.readOnly && !writeJourney(browserStorage(), next, content)) setWarning(copy.saveWarning);
    setSave(next);
  }

  function leaveHome(event: FormEvent) {
    event.preventDefault();
    const parsed = originSchema.safeParse(origin);
    if (!parsed.success) { setInvalidOrigin(true); input.current?.focus(); return; }
    persist(startArrival(parsed.data, content));
  }

  if (!save) return <main className="arrival letter-stage" data-stage="letter">
    <form className="letter" onSubmit={leaveHome} noValidate aria-labelledby="letter-title">
      <p className="unofficial">{copy.unofficialLabel}</p>
      <h1 id="letter-title" className="letter-title" ref={heading} tabIndex={-1}>{copy.title}</h1>
      <p className="letter-body">{copy.body}</p>
      <div className="text-field">
        <label htmlFor="origin">{copy.originLabel}</label>
        <input id="origin" name="origin" type="text" dir="auto" ref={input} value={origin} maxLength={80}
          placeholder={copy.originPlaceholder} autoComplete="off" aria-required="true"
          aria-invalid={invalidOrigin} aria-describedby={invalidOrigin ? "origin-error" : undefined}
          onChange={(event) => { setOrigin(event.target.value); if (invalidOrigin) setInvalidOrigin(false); }} />
        {invalidOrigin && <p id="origin-error" role="alert" className="field-error">{copy.originError}</p>}
      </div>
      <button className="button" type="submit">{copy.continueLabel}</button>
      <p className="legal">{copy.disclaimer}</p>
      {warning && <p className="letter-warning" role="alert">{warning}</p>}
    </form>
  </main>;

  const station = content.places.find((place) => place.id === copy.placeId);
  if (!station) return <main><p role="alert">Missing arrival place: {copy.placeId}</p></main>;

  return <main className={`arrival scene-stage ${stage}-stage`} data-stage={stage}>
    <h1 className="scene-title" tabIndex={-1} ref={heading}>{stage === "train" ? copy.trainTitle : copy.platformTitle}</h1>
    {stage === "train" ? <>
      <TrainWindow />
      <p className="ride-caption">{rideCaption(save, content)}</p>
      {warning && <p className="scene-warning" role="alert">{warning}</p>}
      <button className="button scene-continue train-continue" onClick={() => persist(arrive(save, content))}>{copy.continueLabel}</button>
    </> : <>
      <PlatformScene name={station.name} caption={copy.platformCaption} />
      <p className="mobile-platform-caption">{copy.platformCaption}</p>
      <a className="button scene-continue platform-continue" href={feedbackPath(__BUILD_VERSION__)}>{copy.continueLabel}</a>
      <p className="feedback-hint">{copy.feedbackHint}</p>
      {warning && <p className="platform-warning" role="alert">{warning}</p>}
    </>}
  </main>;
}
