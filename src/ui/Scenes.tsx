import type { CSSProperties } from "react";

type Color = "paper" | "ink" | "pine" | "gold" | "grass" | "stone" | "snow" | "skin";

function Pixel({ x, y, w, h, color }: { x: number; y: number; w: number; h: number; color: Color }) {
  return <span className="pixel" style={{ left: x, top: y, width: w, height: h, background: `var(--color-${color})` }} />;
}

import rideScenes from "./ride-scenes.json" with {type:'json'};

export function TrainWindow({ scene, paused }: { scene: keyof typeof rideScenes; paused: boolean }) {
  return <div className="train-window" role="img" aria-label={`Train window: ${scene}`} data-scene={scene}>
    <div className="train-scenery" aria-hidden="true"><div className="moving-scenery" style={{ animationPlayState: paused ? "paused" : "running" }}>
      {[0, 1].map((repeat) => <div className="ride-strip" key={repeat} style={{ left: repeat * 728 }}>
        {rideScenes[scene].map((r, i) => <Pixel key={i} {...r} color={r.color as Color} />)}
      </div>)}
    </div></div>
  </div>;
}

function Person({ x, greeter = false, wheelchair = false }: { x: number; greeter?: boolean; wheelchair?: boolean }) {
  return <span className="person" style={{ left: x, top: 176 }}>
    <Pixel x={12} y={3} w={8} h={9} color="skin" />
    {!greeter && <Pixel x={10} y={2} w={12} h={4} color="ink" />}
    <Pixel x={greeter ? 10 : 9} y={12} w={greeter ? 12 : 14} h={greeter ? 12 : 11} color={greeter ? "gold" : "pine"} />
    {!greeter && <><Pixel x={12} y={7} w={2} h={2} color="ink" /><Pixel x={18} y={7} w={2} h={2} color="ink" /></>}
    <Pixel x={wheelchair ? 4 : 9} y={wheelchair ? 20 : greeter ? 24 : 23} w={wheelchair ? 4 : 5} h={wheelchair ? 11 : greeter ? 7 : 8} color="ink" />
    <Pixel x={wheelchair ? 24 : 18} y={wheelchair ? 20 : greeter ? 24 : 23} w={wheelchair ? 4 : 5} h={wheelchair ? 11 : 7} color="ink" />
    {wheelchair && <><Pixel x={8} y={25} w={16} h={3} color="stone" /><Pixel x={8} y={26} w={2} h={3} color="gold" /><Pixel x={14} y={22} w={8} h={3} color="stone" /></>}
  </span>;
}

export function PlatformScene({ name, caption }: { name: string; caption: string }) {
  return <div className="platform-viewport" role="img" aria-label={`${name}: the train, platform, a greeter, and arriving students, including a wheelchair user`}>
    <div className="platform-map" aria-hidden="true" data-source-size="480x270">
      <Pixel x={8} y={24} w={464} h={72} color="pine" />
      {Array.from({ length: 8 }, (_, i) => <Pixel key={i} x={24 + i * 56} y={36} w={32} h={24} color="snow" />)}
      <Pixel x={8} y={104} w={464} h={8} color="ink" />
      {Array.from({ length: 24 }, (_, i) => <Pixel key={i} x={8 + i * 20} y={112} w={4} h={8} color="stone" />)}
      <Pixel x={8} y={128} w={464} h={100} color="stone" /><Pixel x={8} y={128} w={464} h={4} color="gold" />
      <Pixel x={360} y={144} w={56} h={12} color="pine" /><Pixel x={368} y={156} w={8} h={16} color="pine" /><Pixel x={400} y={156} w={8} h={16} color="pine" />
      <Pixel x={24} y={144} w={144} h={32} color="paper" />
      <span className="station-sign">{name}</span>
      <Person x={192} /><Person x={240} greeter /><Person x={288} wheelchair />
      <Pixel x={8} y={240} w={464} h={22} color="paper" /><span className="platform-sign-caption">{caption}</span>
    </div>
  </div>;
}
