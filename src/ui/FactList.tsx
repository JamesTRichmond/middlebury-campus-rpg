import type {Place} from '../content/schema';
export function FactList({facts}:{facts:Place['facts']}){if(!facts.length)return null;return <section aria-label="Verified place facts">{facts.map((f,i)=><p key={i}>{f.status} · {f.text} {f.sourceUrl&&<a href={f.sourceUrl}>Source</a>} · as of {f.asOf}</p>)}</section>;}
