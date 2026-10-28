import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('work/range-design-data.json'));
const code=`
const page=await figma.getNodeByIdAsync('2:3');await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({family:'Atkinson Hyperlegible Mono',style:'Regular'});
const created=[]; const vars=await figma.variables.getLocalVariablesAsync(); const vmap=Object.fromEntries(vars.map(v=>[v.name,v]));
function paint(token){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',vmap['color/'+token]);}
function track(n){created.push(n.id);return n;}
function textNode(parent,txt,w,size=14){const n=track(figma.createText());n.fontName={family:'Atkinson Hyperlegible Mono',style:'Regular'};n.fontSize=size;n.lineHeight={unit:'PIXELS',value:size+6};n.characters=txt;n.fills=[paint('ink')];parent.appendChild(n);n.resize(w,20);n.textAutoResize='HEIGHT';return n;}
function col(parent,w){const n=track(figma.createAutoLayout('VERTICAL'));n.fills=[];n.itemSpacing=12;parent.appendChild(n);n.resize(w,10);n.primaryAxisSizingMode='AUTO';return n;}
function art(name,shapes,w,h){const c=track(figma.createComponent());c.name=name;c.resize(w,h);c.fills=[];c.clipsContent=false;page.appendChild(c);for(const s of shapes){const n=track(figma.createRectangle());n.name=s.part;n.resize(s.w,s.h);n.fills=[paint(s.color)];c.appendChild(n);n.x=s.x;n.y=s.y;}return c;}
const data=${JSON.stringify(data)};
const right=Math.max(...page.children.map(n=>n.x+n.width));const board=col(page,1140);board.name='D2 / Character range / design atlas';board.x=right+160;board.y=400;board.paddingTop=24;board.paddingBottom=24;board.paddingLeft=24;board.paddingRight=24;board.fills=[paint('paper')];
textNode(board,'Two drawings. One character.',1092,28);textNode(board,'Original portrait: 160 × 180. Original map sprite: 64 × 80, whole-number scale. Content: character-creator. Voice and filter are captions only.',1092,16);
const row=track(figma.createAutoLayout('HORIZONTAL'));row.fills=[];row.itemSpacing=24;board.appendChild(row);const portraits=[],sprites=[];
for(const s of data.samples){const cell=col(row,340);textNode(cell,s.value.buildKind+' · portrait + map',330,18);const p=art('D2 portrait / '+s.value.buildKind,s.portrait,160,180);p.description='Original separate detailed bust. Character range named layers. '+JSON.stringify(s.value);p.rescale(2);cell.appendChild(p);portraits.push(p.id);const sprite=art('D2 map sprite / '+s.value.buildKind,s.sprite,64,80);sprite.description='Original gameplay-size 64×80 integer grid; readable range marks only.';cell.appendChild(sprite);sprites.push(sprite.id);}
const control=track(figma.createComponent());control.name='Character range / named control';control.layoutMode='VERTICAL';control.paddingTop=12;control.paddingBottom=12;control.paddingLeft=16;control.paddingRight=16;control.itemSpacing=8;control.resize(300,72);control.fills=[paint('paper')];control.strokes=[paint('ink')];control.strokeWeight=2;page.appendChild(control);control.x=board.x;control.y=100;textNode(control,'Control name',268,14);textNode(control,'Named choice',268,18);
textNode(board,'Control studies · last named choice shown',1092,24);textNode(board,'Each tile names all saved choices and shows its final option on the same portrait. Occluding layers remain clothing: inspect the uncovered detail by removing the covering. Frame / spoke controls preview the wheelchair.',1092,14);
const studies=[];
for(let i=0;i<data.studies.length;i+=4){const rr=track(figma.createAutoLayout('HORIZONTAL'));rr.itemSpacing=16;rr.fills=[];board.appendChild(rr);for(const s of data.studies.slice(i,i+4)){const cc=col(rr,258);textNode(cc,s.label,250,16);textNode(cc,s.options.join(' / '),250,12);const p=art('D2 portrait detail / '+s.key+' / '+s.options[s.options.length-1],s.portrait,160,180);cc.appendChild(p);textNode(cc,s.description,250,12);studies.push({key:s.key,nodeId:p.id,options:s.options});}}
return {createdNodeIds:created,board:board.id,portraits,sprites,control:control.id,studies,contentId:'character-creator',fileKey:figma.fileKey,sourceGrids:{portrait:[160,180],sprite:[64,80]}};
`;
fs.writeFileSync('work/figma-range-components.js',code);
