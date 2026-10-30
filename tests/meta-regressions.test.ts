import {it,expect} from 'vitest';
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import ts from 'typescript';
import {repoRoot,loadContent} from '../src/content/load';
import {startArrival,readJourney,writeJourney,SAVE_KEY,PREVIOUS_SAVE_KEY} from '../src/game/arrival';
const root=repoRoot();
function sourceFiles(dir:string):string[]{return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?sourceFiles(join(dir,e.name)):/\.tsx?$/.test(e.name)?[join(dir,e.name)]:[]);}
it('every static source JSON import declares its native module type',()=>{
 const imports:string[]=[];
 for(const file of sourceFiles(join(root,'src'))){const source=ts.createSourceFile(file,readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);for(const node of source.statements){if(!ts.isImportDeclaration(node)||!ts.isStringLiteral(node.moduleSpecifier)||!node.moduleSpecifier.text.endsWith('.json'))continue;imports.push(node.moduleSpecifier.text);expect(node.attributes?.elements.some(e=>e.name.text==='type'&&ts.isStringLiteral(e.value)&&e.value.text==='json'),`${file}: ${node.moduleSpecifier.text}`).toBe(true);}}
 expect(imports).toEqual(expect.arrayContaining(['../../content/escort.json','../../content/dorm.json','../../content/lessons.json']));
});
it('default world/UI colors match the accepted Figma palette receipt',()=>{
 const receipt=JSON.parse(readFileSync(join(root,'docs/figma/M0-acceptance.json'),'utf8'));
 const css=readFileSync(join(root,'src/ui/arrival.css'),'utf8');
 for(const name of ['paper','ink','pine','gold','grass','stone','snow']){const token=receipt.paletteContrast.palette.find((p:{name:string})=>p.name==='color/'+name);const expected=token.values.find((v:{mode:string})=>v.mode==='default').hex;const actual=css.match(new RegExp('--color-'+name+':\\s*(#[a-fA-F0-9]{6})'))?.[1];expect(actual?.toUpperCase(),name).toBe(expected.toUpperCase());}
});
it.each([{notes:'not an array'},{notes:[{id:7,text:'keep me'}]},{notes:[{id:'n',text:null}]}])('rejects malformed notes without silently resetting or overwriting a good backup (%j)',({notes})=>{
 const c=loadContent(),data=new Map<string,string>(),storage={getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>{data.set(k,v);}};
 const good={...startArrival('Home',c),notes:[{id:'n',text:'Keep this note'}]};expect(writeJourney(storage,good,c)).toBe(true);const backup=JSON.stringify(good);data.set(PREVIOUS_SAVE_KEY,backup);const bad=JSON.stringify({...good,notes});data.set(SAVE_KEY,bad);const loaded=readJourney(storage,c);expect(loaded.save).toBeNull();expect(loaded.readOnly).toBe(true);expect(loaded.warning).toBe(c.arrival.loadWarning);expect(writeJourney(storage,good,c)).toBe(false);expect(data.get(SAVE_KEY)).toBe(bad);expect(data.get(PREVIOUS_SAVE_KEY)).toBe(backup);
});
