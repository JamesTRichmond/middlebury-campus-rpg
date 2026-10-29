import type { Character } from './character';
import type { CharacterRange } from './character-range';
import type { PixelShape } from './character-art';
type ArtValues = Character & CharacterRange;
// Original editable portrait geometry. Design source for Figma, before application code.
export function portraitShapes(v: ArtValues) {
 const out: PixelShape[]=[]; const r=(part:string,x:number,y:number,w:number,h:number,color:string)=>{if(w>0&&h>0)out.push({part,x:Math.round(x),y:Math.round(y),w:Math.round(w),h:Math.round(h),color});};
 const skin=v.surfaceColor&&v.surfaceColor!=='Natural'?v.surfaceColor.toLowerCase():'skin-'+v.skin;
 const hair={Ink:'ink',Brown:'skin-6',Blond:'gold',Silver:'stone',Auburn:'skin-4'}[v.hairColor]||'ink';
 const cloth={Pine:'pine',Gold:'gold',Stone:'stone',Ink:'ink'}[v.clothesColor]||'pine';
 const broad=v.body==='Broad',tall=v.body==='Tall';
 const sx=broad?21:tall?39:31,sw=160-2*sx;
 r('bust-outline',sx-3,109,sw+6,68,'ink');r('bust-clothing',sx,112,sw,65,cloth);
 r('shoulder-left',sx-11,122,15,49,skin);r('shoulder-right',sx+sw-4,122,15,49,skin);
 r('neck-outline',61,89,38,33,'ink');r('neck',64,89,32,32,skin);
 r('collar-left',sx,110,39,9,'paper');r('collar-right',91,110,160-sx-91,9,'paper');
 r('ear-outline-left',33,48,13,28,'ink');r('ear-left',36,51,11,21,skin);r('ear-outline-right',114,48,13,28,'ink');r('ear-right',113,51,11,21,skin);
 r('face-outline',43,25,74,60,'ink');r('jaw-outline',51,78,58,18,'ink');r('chin-outline',60,91,40,9,'ink');
 r('face',46,28,68,55,skin);r('jaw',54,77,52,17,skin);r('chin',63,91,34,6,skin);
 r('brow-shade',48,48,63,3,'skin-5');r('nose-bridge',78,60,4,15,'skin-4');r('nose-tip',75,73,11,3,'skin-5');
 // Portrait hair is drawn on its own finer grid, not scaled from the map sprite.
 r('hair-crown',43,21,74,14,hair);
 if(v.hair==='Straight'){r('straight-fringe',44,32,25,13,hair);r('straight-side',39,34,8,55,hair);}
 if(v.hair==='Wavy'){for(let i=0;i<8;i++)r('wave-'+i,38+i*10,18+(i%2)*6,13,18,hair);for(let i=0;i<4;i++)r('wave-side-'+i,112+(i%2)*4,36+i*13,10,17,hair);}
 if(['Curls','Coils','Afro'].includes(v.hair)){for(let j=0;j<3;j++)for(let i=0;i<9;i++)r('curl-'+j+'-'+i,34+i*10+(j%2)*3,11+j*9+(i%2)*3,v.hair==='Coils'?7:12,11,hair);if(v.hair==='Afro'){r('afro-left',27,27,15,35,hair);r('afro-right',118,27,15,35,hair);}}
 if(['Braids','Locs'].includes(v.hair)){for(let i=0;i<6;i++){const x=35+i*17;r('strand-'+i,x,26,7,i===0||i===5?77:14,hair);if(v.hair==='Braids'){for(let j=0;j<5;j++)r('braid-weave-'+i+'-'+j,x+1,30+j*13,3,3,'stone');r('braid-tie-'+i,x,99,7,5,'gold');}}}
 if(v.hair==='Shaved'){r('shaved-scalp',43,22,74,11,skin);for(let i=0;i<13;i++)r('buzz-'+i,46+i*5,25+(i%2)*3,2,2,hair);}
 if(v.hair==='Bun'){r('bun-outline',62,1,36,21,'ink');r('bun',65,4,30,17,hair);r('bun-tie',62,19,36,4,'gold');}
 if(v.hair==='Ponytail'){r('ponytail',118,32,13,66,hair);r('tie',116,32,15,5,'gold');}
 // Detailed eyes, mouth and teeth stay readable at portrait size.
 for(const x of [52,91]){r('eye-outline-'+x,x-2,53,21,15,'ink');r('sclera-'+x,x,55,17,11,'snow');r('iris-'+x,x+6,55,8,11,'pine');r('pupil-'+x,x+8,57,4,8,'ink');r('eye-shine-'+x,x+7,56,2,3,'paper');}
 r('mouth',65,80,30,10,'ink');r('teeth',68,81,24,3,'snow');r('tongue',74,86,12,3,'skin-4');
 if(v.facialHair==='Moustache'){r('moustache-left',61,77,19,4,hair);r('moustache-right',82,77,17,4,hair);}
 if(v.facialHair==='Beard'){r('beard-left',50,73,9,23,hair);r('beard-right',102,73,9,23,hair);r('beard-chin',58,93,45,9,hair);}
 if(v.facialHair==='Goatee'){r('goatee',70,92,22,13,hair);}
 if(v.covering==='Headwrap'){r('headwrap',37,17,87,20,'gold');r('headwrap-fold',41,26,79,4,'pine');}
 if(v.covering==='Hijab'){r('hijab-top',37,17,87,17,'pine');r('hijab-left',31,32,15,68,'pine');r('hijab-right',114,32,15,68,'pine');r('hijab-drape',42,100,76,10,'pine');r('hijab-fold',39,37,3,60,'grass');}
 if(v.covering==='Turban'){r('turban-top',55,8,51,10,'gold');r('turban',36,18,89,19,'gold');r('turban-fold',75,14,5,23,'pine');}
 if(v.covering==='Kippah'){r('kippah',58,17,44,10,'pine');r('kippah-rim',55,27,50,3,'gold');}
 if(v.clothes==='Jacket'){r('jacket-opening',75,120,10,56,'paper');r('pocket',sx+10,144,17,4,'ink');r('lapel',sx+12,120,7,20,'stone');}
 if(v.clothes==='Sweater'){for(let i=0;i<8;i++)r('sweater-rib-'+i,sx+4+i*10,168,2,9,'ink');r('cuff-left',sx-11,122,15,16,cloth);r('cuff-right',sx+sw-4,122,15,16,cloth);}
 if(v.clothes==='T-shirt'){r('short-sleeve-left',sx-11,122,15,8,cloth);r('short-sleeve-right',sx+sw-4,122,15,8,cloth);}
 // Lower hem is an outfit detail at the bottom of the bust.
 r('lower-garment',sx+2,174,sw-4,6,v.bottom==='Skirt'?cloth:'stone');if(v.bottom==='Trousers')r('trouser-seam',79,174,2,6,'ink');
 if(v.eyewear!=='None'){for(const x of [49,88]){r('glasses-top-'+x,x,51,25,2,'ink');r('glasses-bottom-'+x,x,67,25,2,'ink');r('glasses-left-'+x,x,53,2,14,'ink');r('glasses-right-'+x,x+23,53,2,14,'ink');if(v.eyewear==='Round glasses'){r('round-top-'+x,x+4,49,17,2,'ink');r('round-bottom-'+x,x+4,69,17,2,'ink');}}r('bridge',74,57,14,2,'ink');}
 if(v.scarf==='Scarf'){r('scarf',60,108,43,10,'gold');r('scarf-tail',90,118,10,28,'gold');r('scarf-fringe',88,146,14,4,'ink');}
 if(v.bag==='Shoulder bag'){r('bag-strap',111,114,6,49,'gold');r('bag',116,151,25,26,'gold');r('bag-seam',118,157,21,3,'ink');}
 if(v.mobility==='Wheelchair'){r('chair-left',8,126,7,50,'ink');r('chair-right',145,126,7,50,'ink');r('chair-arm-left',10,143,21,5,'stone');r('chair-arm-right',129,143,21,5,'stone');r('wheel-left',2,157,16,23,'ink');r('wheel-left-hub',7,162,6,13,'stone');r('wheel-right',142,157,16,23,'ink');r('wheel-right-hub',147,162,6,13,'stone');}
 if(v.mobility==='Another aid'){r('aid-grip',138,124,16,5,'ink');r('aid-shaft',146,129,5,49,'stone');}
 // Biological details remain skin/face/arm layers; five patterns occupy independent zones.
 const change=(part:string,props:Partial<PixelShape>)=>{for(const s of out)if(s.part===part)Object.assign(s,props);};
 if(v.buildKind==='Creature'){r('creature-ear-left',30,9,13,29,skin);r('ear-point-left',34,3,6,8,skin);r('creature-ear-right',117,9,13,29,skin);r('ear-point-right',120,3,6,8,skin);r('ear-inner-left',34,14,5,19,'skin-5');r('ear-inner-right',121,14,5,19,'skin-5');}
 if(v.buildKind==='Construct'){r('temple-panel-left',46,43,7,9,'stone');r('temple-panel-right',107,43,7,9,'stone');r('jaw-seam',56,92,48,2,'gold');r('forehead-core',76,38,8,8,'gold');}
 if(v.furLength!=='None'){const len=v.furLength==='Long'?18:7;for(let i=0;i<6;i++){r('fur-left-'+i,30-(i%2)*4,57+i*8,14,len,hair);r('fur-right-'+i,116+(i%2)*4,57+i*8,14,len,hair);}}
 if(v.guardHairStiffness!=='Soft'){for(let i=0;i<7;i++)r('guard-hair-'+i,34+i*3,86+(i%2)*3,v.guardHairStiffness==='Bristled'?2:1,v.guardHairStiffness==='Bristled'?15:9,hair);}
 if(v.undercoatDensity!=='None'){const step=v.undercoatDensity==='Dense'?3:7;for(let y=128;y<156;y+=step)r('undercoat-'+y,sx-10,y,12,2,hair);}
 if(v.crimp!=='Straight'){for(let i=0;i<7;i++){r('crimp-'+i,115+(i%2)*(v.crimp==='Tight'?2:5),41+i*5,v.crimp==='Tight'?3:5,3,'gold');}}

 if(v.wetness!=='Dry'){r('wet-cheek',105,70,3,v.wetness==='Wet'?13:5,'snow');r('wet-arm',sx+sw+4,144,2,v.wetness==='Wet'?15:5,'snow');}
 if(v.muzzleProportion!=='Flat'){r('muzzle-outline',59,72,43,v.muzzleProportion==='Long'?21:13,'skin-5');r('muzzle',62,73,37,v.muzzleProportion==='Long'?16:9,skin);r('muzzle-nose',74,72,14,5,'ink');r('muzzle-smile',69,80,24,2,'ink');}
 if(v.follicleProminence!=='Smooth'){for(let i=0;i<5;i++)r('follicle-'+i,54+(i%2)*5,68+i*3,v.follicleProminence==='Raised'?3:1,2,'skin-6');}
 if(v.whiskerLength!=='None'){let len=v.whiskerLength==='Long'?27:13;for(let y=76;y<86;y+=4){r('whisker-left-'+y,61-len,y,len,1,'snow');r('whisker-right-'+y,99,y,len,1,'snow');}}
 if(v.coreTranslucency!=='Opaque'){r('core-field',68,98,23,11,v.coreTranslucency==='Clear'?'snow':'stone');r('core-heart',76,100,7,7,'gold');r('core-rib',71,102,17,1,'pine');if(v.coreTranslucency==='Clear')r('core-spine',79,98,2,11,'pine');}
 if(v.chitinIridescence!=='None'){const c=v.chitinIridescence==='Gold sheen'?'gold':'pine';for(let i=0;i<4;i++){r('chitin-plate-'+i,106,82+i*4,9,3,c);r('chitin-shine-'+i,106,82+i*4,4,1,'snow');}}
 if(v.floraGrowth!=='None'){for(let i=0;i<3;i++){r('flora-stem-'+i,23+i*5,100-i*9,2,15,'pine');r('flora-leaf-'+i,20+i*5,98-i*9,6,5,v.floraGrowth==='Blossoms'?'gold':'grass');}}
 if(v.hypermobilityPose==='Flexible pose'){r('flexible-forearm',sx-13,150,24,10,skin);r('flexible-hand',sx+3,142,8,14,skin);r('flexible-wrist-line',sx+1,153,2,6,'skin-5');}
 if(v.fatDistribution==='Cheeks'){r('cheek-left',44,73,12,18,skin);r('cheek-right',104,73,12,18,skin);r('cheek-crease',48,89,8,2,'skin-5');}
 if(v.fatDistribution==='Upper arms'){r('arm-round-left',sx-15,140,7,25,skin);r('arm-round-right',sx+sw+8,140,7,25,skin);}
 if(v.muscleDistribution==='Shoulders'){r('shoulder-line-left',sx-8,124,9,3,'skin-5');r('shoulder-line-right',sx+sw-1,124,9,3,'skin-5');}
 if(v.muscleDistribution==='Arms'){r('arm-muscle-left',sx-7,144,3,18,'skin-5');r('arm-muscle-right',sx+sw+4,144,3,18,'skin-5');}
 if(v.vascularity!=='None'){const c=v.vascularity==='Defined'?(skin==='pine'?'snow':'pine'):(skin==='skin-5'?'ink':'skin-5');r('vein-left',sx-4,148,2,17,c);r('vein-branch',sx-7,154,4,2,c);r('vein-right',sx+sw+2,148,2,17,c);}
 for(const x of [52,91]){
  change('sclera-'+x,{color:v.sclera.toLowerCase()});change('iris-'+x,{color:v.iris.toLowerCase()});
  const offset=v.gazeComfort==='Sideways'?3:0,dy=v.gazeComfort==='Lowered'?3:0;
  change('iris-'+x,{x:x+5+offset,y:55+dy,h:11-dy});
  change('pupil-'+x,{color:v.iris==='Ink'?'snow':'ink',x:x+8+offset,y:57+dy,w:v.pupilRange==='Slit'?2:v.pupilRange==='Wide'?7:4,h:8-dy});
  if(v.limbalRing!=='None'){let w=v.limbalRing==='Bold'?2:1;r('limbal-left-'+x,x+4+offset,55+dy,w,11-dy,'skin-6');r('limbal-right-'+x,x+13+offset,55+dy,w,11-dy,'skin-6');}
  change('eye-shine-'+x,{w:0,h:0});
  if(v.eyeShine!=='None'){r('eye-glint-'+x,x+7+offset,56+dy,2,2,'snow');if(v.eyeShine==='Star'){r('eye-star-'+x,x+6+offset,57+dy,4,1,'snow');r('eye-star-v-'+x,x+7+offset,55+dy,1,4,'snow');}}
  if(x===91&&v.thirdEyelid!=='Absent'){r('third-eyelid-'+x,x,55,17,v.thirdEyelid==='Closed'?11:4,'stone');r('eyelid-line-'+x,x,55+(v.thirdEyelid==='Closed'?10:3),17,1,'pine');}
 }
 if(v.dyeGrowth==='Roots')r('dyed-roots',47,22,66,4,hair==='gold'?'ink':'gold');if(v.dyeGrowth==='Tips'){r('dyed-tips',40,39,6,18,'gold');r('dyed-tip-right',112,34,6,9,'gold');}
 if(v.colorFade==='Ends')r('faded-ends',46,31,65,4,'stone');if(v.colorFade==='Streaks')for(let i=0;i<4;i++)r('fade-streak-'+i,48+i*15,23,3,14,'stone');
 if(v.cowlick!=='None'){const x=v.cowlick==='Left'?48:103;r('cowlick-base',x,9,5,13,hair);r('cowlick-tip',x+(v.cowlick==='Left'?-4:4),8,5,4,hair);}
 // Mouth stays in front of muzzle details so each tooth/tongue option is inspectable.
 r('mouth-detail',65,80,30,10,'ink');r('teeth-detail',68,81,24,3,'snow');
 if(v.toothMarks==='Gap')r('tooth-gap',79,81,3,3,'ink');if(v.toothMarks==='Fang'){r('tooth-fang-left',69,81,3,6,'snow');r('tooth-fang-right',88,81,3,6,'snow');}
 if(v.tongueShape==='Round')r('tongue-detail',74,86,12,3,'skin-4');if(v.tongueShape==='Pointed'){r('tongue-detail',76,85,8,2,'skin-4');r('tongue-point',78,87,4,3,'skin-4');}if(v.tongueShape==='Forked'){r('tongue-fork-left',74,85,4,5,'skin-4');r('tongue-fork-right',82,85,4,5,'skin-4');}
 if(v.baseLayer==='Striped')for(let i=0;i<3;i++)r('base-stripe-'+i,65,113+i*3,30,1,'ink');if(v.baseLayer==='High collar')r('base-high-collar',61,107,38,6,'stone');
 if(v.outerwear==='Coat'){r('coat-left',sx,119,16,61,'stone');r('coat-right',sx+sw-16,119,16,61,'stone');r('coat-button',sx+sw-10,142,3,3,'gold');}
 if(v.outerwear==='Capelet'){r('cape-left',sx-3,113,31,18,'stone');r('cape-right',sx+sw-28,113,31,18,'stone');r('cape-clasp',76,118,8,4,'gold');}
 if(v.wardrobePreset==='Techwear'){r('techwear-pocket',50,135,20,15,'ink');r('techwear-zip',72,122,2,41,'snow');}
 if(v.wardrobePreset==='Emo'){r('emo-band',49,133,62,5,'ink');r('emo-badge',57,145,12,9,'snow');}
 if(v.wardrobePreset==='Decora'){for(let i=0;i<5;i++)r('decora-pin-'+i,49+i*12,135+(i%2)*8,5,5,i%2?'gold':'snow');}
 if(v.wardrobePreset==='Historical formal'){r('formal-lapel-left',52,119,10,29,'ink');r('formal-lapel-right',99,119,10,29,'ink');r('formal-bow',72,118,16,6,'gold');}
 if(v.wardrobePreset==='Toony fursuit'){r('toony-bib',63,125,34,35,'snow');r('toony-paw-left',sx-12,153,16,18,hair);r('toony-pad-left',sx-8,159,8,8,'gold');}
 if(v.wardrobePreset==='Realistic fursuit'){for(let i=0;i<9;i++)r('suit-fur-'+i,45+i*8,124+(i%2)*12,4,23,hair);r('suit-seam',79,146,1,24,'stone');}
 if(v.fabricWeight==='Light'){r('light-fold',62,141,2,21,'snow');r('light-fold-two',91,137,2,27,'snow');}
 if(v.fabricWeight==='Heavy'){r('heavy-hem',47,164,65,5,cloth==='ink'?'stone':'ink');r('heavy-fold',55,140,5,20,cloth==='ink'?'stone':'ink');}
 if(v.weathering==='Faded'){r('faded-cloth',88,147,17,11,'stone');}if(v.weathering==='Patched'){r('patch',88,147,17,14,'gold');for(let x=88;x<105;x+=4)r('patch-stitch-'+x,x,147,2,2,'ink');}
 if(v.chest==='Soft'){r('chest-curve-left',57,134,15,2,'stone');r('chest-curve-right',88,134,15,2,'stone');}if(v.chest==='Fuller'){r('chest-curve-left',51,139,25,3,'stone');r('chest-curve-right',84,139,25,3,'stone');r('chest-center',79,134,2,8,'ink');}
 if(v.prostheticStyle!=='None'){r('prosthetic-arm',sx+sw-3,140,14,31,v.prostheticStyle==='Crystal construct'?'snow':'stone');if(v.prostheticStyle==='Industrial'){for(let y=142;y<170;y+=7)r('industrial-joint-'+y,sx+sw-3,y,14,3,'ink');}if(v.prostheticStyle==='Sleek panels'){r('panel-seam',sx+sw+3,142,1,27,'ink');r('panel-light',sx+sw+6,148,2,8,'gold');}if(v.prostheticStyle==='Crystal construct'){r('crystal-facet',sx+sw+1,143,5,25,'pine');r('crystal-shine',sx+sw+5,145,3,21,'gold');}}
 if(v.exposedTech==='Circuit'){r('circuit-trace',sx+sw+4,145,2,21,'gold');r('circuit-chip',sx+sw+1,149,8,7,'ink');r('circuit-pad',sx+sw+3,151,3,3,'gold');}if(v.exposedTech==='Mechanism'){r('mechanism',sx+sw,149,9,9,'ink');r('mechanism-hub',sx+sw+3,152,3,3,'gold');}
 if(v.graftBlend==='Seamed')r('graft-seam',sx+sw-3,139,14,2,'ink');if(v.graftBlend==='Mottled'){for(let i=0;i<4;i++)r('graft-mottle-'+i,sx+sw-3+i*3,138+(i%2)*3,3,4,i%2?(skin==='stone'?'ink':'stone'):(skin==='pine'?'snow':'pine'));}
 if(v.accessory==='Star pin'){r('star-pin-h',49,146,13,3,'gold');r('star-pin-v',54,141,3,13,'gold');r('star-pin-center',53,145,5,5,'snow');}
 if(v.accessory==='Leaf pin'){r('leaf-pin',49,142,12,7,'snow');r('leaf-pin-stem',50,148,2,5,'pine');r('leaf-pin-vein',53,144,6,2,'pine');}
 if(v.stimmingIdle==='Finger tap'){r('tap-hand',sx-11,161,15,7,skin);r('tap-finger',sx-3,158,3,9,skin);r('tap-cue',sx-3,154,3,2,'ink');}if(v.stimmingIdle==='Hand flutter'){r('flutter-hand',sx-15,150,17,7,skin);for(let i=0;i<3;i++)r('flutter-finger-'+i,sx-17+i*5,142,3,12,skin);r('flutter-cue',sx-20,147,2,9,'ink');}
 const frame=v.frameColor.toLowerCase();for(const s of out)if(['chair-left','chair-right','chair-arm-left','chair-arm-right','aid-shaft'].includes(s.part))s.color=frame;
 if(v.mobility==='Wheelchair'&&v.spokeMarks!=='Plain'){for(const x of [7,147]){r('spoke-h-'+x,x-2,167,10,2,frame);r('spoke-v-'+x,x+2,160,2,17,frame);if(v.spokeMarks==='Stars'){r('spoke-star-'+x,x-1,162,3,3,'gold');r('spoke-star-bottom-'+x,x+4,173,3,3,'gold');}}}

 if(v.mobility!=='Wheelchair'){
  r('aid-detail-wheel',2,157,16,23,'ink');r('aid-detail-hub',6,161,8,15,'stone');r('aid-detail-frame',0,150,3,24,frame);
  if(v.spokeMarks!=='Plain'){r('aid-detail-spoke-h',4,167,12,2,frame);r('aid-detail-spoke-v',9,159,2,19,frame);if(v.spokeMarks==='Stars'){r('aid-detail-star-top',4,161,3,3,'gold');r('aid-detail-star-bottom',12,173,3,3,'gold');}}
 }
 // A small ground/step sample is part of the portrait panel, before map travel exists.
 if(v.walkRig==='Measured'){r('measured-step-left',60,178,13,2,'ink');r('measured-step-right',87,178,13,2,'ink');}if(v.walkRig==='Springy'){r('spring-step-left',62,175,7,3,'gold');r('spring-step-right',91,175,7,3,'gold');}
 if(v.stepTrail!=='None'){for(let i=0;i<3;i++){r('portrait-trail-'+i,3+i*5,103+i*7,v.stepTrail==='Leaves'?5:3,3,'pine');if(v.stepTrail==='Leaves')r('portrait-trail-stem-'+i,5+i*5,106+i*7,1,3,'gold');}}
 for(let i=1;i<=5;i++){const mode=v[('pattern'+i) as keyof CharacterRange],x=[0,48,97,69,sx-11,sx+sw][i],y=[0,70,70,98,141,141][i],color=i%2?(skin==='ink'?'snow':'ink'):(skin==='gold'?'ink':'gold');if(mode==='Spots'){for(let j=0;j<3;j++)r('pattern-'+i+'-spot-'+j,x+(j%2)*6,y+j*3,4,4,color);}if(mode==='Stripes'){for(let j=0;j<3;j++)r('pattern-'+i+'-stripe-'+j,x,y+j*4,12,2,color);}if(mode==='Speckles'){for(let j=0;j<9;j++)r('pattern-'+i+'-speckle-'+j,x+(j%3)*4,y+Math.floor(j/3)*4,2,2,color);}}
 // Move head/shoulder pose together; lower wheel/ground stays anchored.
 if(v.posture==='Leaning'){for(const s of out)if(s.y<110){s.x+=3;s.y+=3;}}
 if(v.posture==='Relaxed'){for(const s of out)if(s.y>=110&&s.y<170&&!/^(chair|wheel|aid)/.test(s.part)){s.y+=2;s.h=Math.min(s.h,180-s.y);}}
 return out.filter(s=>s.w>0&&s.h>0);
}

