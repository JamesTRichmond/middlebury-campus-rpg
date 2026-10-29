import type { Character } from './character';
import type { CharacterRange } from './character-range';
import type { PixelShape } from './character-art';
type ArtValues = Character & CharacterRange;
/* Original D2 design study. Native 64×80 integer-grid sprite; separate from detailed portrait. */
function baseCharacterShapes(v: ArtValues) {
 const out: PixelShape[]=[]; const r=(part:string,x:number,y:number,w:number,h:number,color:string)=>out.push({part,x,y,w,h,color});
 const skin='skin-'+v.skin, hair=({Ink:'ink',Brown:'skin-6',Blond:'gold',Silver:'stone',Auburn:'skin-4'})[v.hairColor||'Ink'];
 const cloth=({Pine:'pine',Gold:'gold',Stone:'stone',Ink:'ink'})[v.clothesColor||'Pine'];
 const broad=v.body==='Broad', tall=v.body==='Tall', left=broad?16:tall?23:20, width=broad?32:tall?18:24, y=tall?33:36;
 // Large original pixel-paper doll. Every choice alters the same 64×80 footprint.
 r('shadow',10,76,44,2,'stone');
 if(v.bag==='Shoulder bag') {r('bag',46,40,10,20,'gold');r('bag-strap',43,30,3,25,'ink');}
 r('legs',left+2,59,width-4,15,v.bottom==='Skirt'?cloth:'stone');
 if(v.bottom!=='Skirt')r('leg-gap',30,65,4,10,'paper');
 r('shoe-left',left,73,10,4,'ink');r('shoe-right',left+width-10,73,10,4,'ink');
 r('neck',28,29,8,9,skin);
 r('shirt',left,y,width,27,cloth);r('arm-left',left-4,y+3,5,23,skin);r('arm-right',left+width-1,y+3,5,23,skin);
 if(v.clothes==='Jacket'){r('jacket-opening',30,y,4,27,'paper');r('jacket-pocket',left+3,y+16,6,3,'ink');}
 if(v.clothes==='Sweater'){r('sweater-cuff-left',left-4,y+4,5,17,cloth);r('sweater-cuff-right',left+width-1,y+4,5,17,cloth);r('sweater-rib',left,y+24,width,3,'ink');}
 if(v.clothes==='T-shirt'){r('sleeve-left',left-4,y+2,5,7,cloth);r('sleeve-right',left+width-1,y+2,5,7,cloth);}
 r('ear-left',20,17,4,8,skin);r('ear-right',40,17,4,8,skin);r('face',23,9,18,23,skin);
 r('eye-white-left',25,18,5,5,'snow');r('eye-white-right',34,18,5,5,'snow');
 r('eye-left',26,19,3,3,'ink');r('eye-right',35,19,3,3,'ink');r('nose',31,23,2,3,'skin-4');r('mouth',29,28,7,2,'ink');
 if(v.hair==='Straight'){r('hair',21,6,22,8,hair);r('hair-left',19,10,4,24,hair);}
 if(v.hair==='Wavy'){for(let i=0;i<4;i++)r('wave-'+i,19+i*6,5+(i%2)*2,7,9,hair);r('wave-side',40,13,5,21,hair);}
 if(v.hair==='Curls'||v.hair==='Coils'){for(let row=0;row<2;row++)for(let i=0;i<5;i++)r('curl-'+row+'-'+i,18+i*6,3+row*5+(i%2)*2,v.hair==='Coils'?5:7,6,hair);r('curl-side',18,13,5,14,hair);}
 if(v.hair==='Braids'||v.hair==='Locs'){r('hair-crown',21,5,22,7,hair);for(let i=0;i<3;i++){r('strand-'+i,17+i*13,10,4,v.hair==='Braids'?29:24,hair);if(v.hair==='Braids')r('braid-tie-'+i,17+i*13,32,4,3,'gold');}}
 if(v.hair==='Shaved')r('buzz',23,7,18,3,hair);
 if(v.hair==='Afro'){r('afro',15,3,34,14,hair);r('afro-left',13,10,8,12,hair);r('afro-right',43,10,8,12,hair);}
 if(v.hair==='Bun'){r('hair-bun',26,0,12,7,hair);r('hair-cap',21,6,22,7,hair);}
 if(v.hair==='Ponytail'){r('hair-cap',21,6,22,7,hair);r('ponytail',41,9,6,28,hair);}
 if(v.facialHair==='Moustache')r('moustache',26,25,12,3,hair);
 if(v.facialHair==='Beard'){r('beard-left',24,24,4,9,hair);r('beard-right',36,24,4,9,hair);r('beard-chin',27,30,10,5,hair);}
 if(v.facialHair==='Goatee'){r('goatee',29,29,6,8,hair);}
 if(v.covering==='Headwrap'){r('wrap',19,5,26,11,'gold');r('wrap-fold',21,9,22,3,'pine');}
 if(v.covering==='Hijab'){r('hijab-top',19,4,26,8,'pine');r('hijab-left',17,11,6,27,'pine');r('hijab-right',41,11,6,27,'pine');r('hijab-drape',21,33,22,7,'pine');}
 if(v.covering==='Turban'){r('turban-top',24,1,16,4,'gold');r('turban',19,5,26,10,'gold');r('turban-fold',30,4,3,10,'pine');}
 if(v.covering==='Kippah')r('kippah',26,5,13,4,'pine');
 if(v.eyewear!=='None'&&v.eyewear){for(const x of [24,34]){r('glasses-top-'+x,x,17,8,2,'ink');r('glasses-bottom-'+x,x,23,8,2,'ink');r('glasses-left-'+x,x,18,2,5,'ink');r('glasses-right-'+x,x+6,18,2,5,'ink');if(v.eyewear==='Round glasses')r('round-glasses-'+x,x+2,16,4,1,'ink');}r('glasses-bridge',31,19,4,2,'ink');}
 if(v.scarf==='Scarf'){r('scarf',23,34,18,5,'gold');r('scarf-tail',35,38,5,13,'gold');}
 if(v.mobility==='Wheelchair'){r('chair-back',15,40,4,24,'ink');r('chair-seat',15,60,30,4,'ink');r('wheel-left',9,58,12,18,'ink');r('wheel-left-inner',12,61,6,12,'stone');r('wheel-right',43,58,12,18,'ink');r('wheel-right-inner',46,61,6,12,'stone');r('footrest',24,73,16,4,'ink');}
 if(v.mobility==='Another aid'){r('aid-shaft',48,43,3,34,'stone');r('aid-grip',45,43,8,3,'ink');r('aid-foot',47,75,5,3,'ink');}
 return out;
}


export function rangeSpriteShapes(v: ArtValues) {
 const base=baseCharacterShapes(v);
 const out: PixelShape[]=[];
 const r=(part:string,x:number,y:number,w:number,h:number,color:string)=>out.push({part,x,y,w,h,color});
 const surface=v.surfaceColor==='Natural'?'skin-'+v.skin:v.surfaceColor.toLowerCase();
 const fur=({Ink:'ink',Brown:'skin-6',Blond:'gold',Silver:'stone',Auburn:'skin-4'})[v.hairColor||'Ink'];
 const frame=v.frameColor.toLowerCase();
 const broad=v.body==='Broad', tall=v.body==='Tall', left=broad?16:tall?23:20, width=broad?32:tall?18:24;
 const longFur=v.furLength==='Long', hasFur=v.furLength && v.furLength!=='None' && v.furLength!=='Bare';
 // Behind the figure: fur changes the readable outer silhouette, without covering the face.
 if(hasFur){
   r('fur-mass-left',longFur?13:17,17,longFur?8:5,longFur?32:19,fur);
   r('fur-mass-right',longFur?43:42,17,longFur?8:5,longFur?32:19,fur);
   if(longFur){r('fur-tuft-left',11,35,6,10,fur);r('fur-tuft-right',47,34,6,10,fur);}
 }
 for(const shape of base){
   const s={...shape};
   if(['neck','arm-left','arm-right','ear-left','ear-right','face'].includes(s.part))s.color=surface;
   if(['chair-back','chair-seat','footrest','aid-shaft','aid-grip'].includes(s.part))s.color=frame;
   // Posture is an original drawing variation; it changes the upper figure only.
   if(v.posture==='Leaning' && !/^(shadow|legs|leg-gap|shoe|wheel|footrest|chair-seat|aid-)/.test(s.part)){s.x+=2;s.y+=2;}
   if(v.posture==='Relaxed' && /^(neck|shirt|arm|sleeve|sweater|jacket)/.test(s.part)){s.y+=2;if(s.part==='shirt')s.h-=2;}
   out.push(s);
 }
 // Species and construct marks remain visible at native resolution.
 if(v.buildKind==='Creature'){
   r('creature-ear-left',15,4,7,12,surface);r('creature-ear-tip-left',17,0,3,5,surface);
   r('creature-ear-inner-left',17,6,3,6,'ink');
   r('creature-ear-right',42,4,7,12,surface);r('creature-ear-tip-right',44,0,3,5,surface);
   r('creature-ear-inner-right',44,6,3,6,'ink');
   r('creature-muzzle',27,24,11,7,surface);r('creature-nose',30,24,5,2,'ink');r('creature-mouth',30,29,5,1,'ink');
 }
 if(v.buildKind==='Construct'){
   r('construct-temple-left',21,16,2,12,'stone');r('construct-temple-right',41,16,2,12,'stone');
   r('construct-jaw',24,31,16,2,'ink');r('construct-head-seam',31,12,2,5,'gold');
   r('construct-forehead-panel',28,10,8,2,'stone');
 }
 if(v.walkRig==='Measured'){
   r('measured-step-left',left+2,70,8,5,'stone');r('measured-step-shoe',left+2,74,9,3,'ink');
   r('measured-hand-left',left-5,51,5,5,surface);
 }
 if(v.walkRig==='Springy'){
   r('springy-elbow-left',left-7,45,5,5,surface);r('springy-hand-left',left-7,41,4,5,surface);
   r('springy-step-right',left+width-10,68,9,4,'stone');r('springy-shoe-right',left+width-7,71,10,4,'ink');
 }
 if(v.mobility==='Wheelchair' && v.spokeMarks && v.spokeMarks!=='Plain'){
   for(const x of [12,46]){
     r('spoke-vertical-'+x,x+2,61,2,12,frame);r('spoke-horizontal-'+x,x,65,6,2,frame);
     if(v.spokeMarks==='Stars'){
       r('spoke-star-top-'+x,x,62,2,2,'gold');r('spoke-star-bottom-'+x,x+4,70,2,2,'gold');
       r('spoke-star-upper-'+x,x+4,62,2,2,'gold');r('spoke-star-lower-'+x,x,70,2,2,'gold');
     }
   }
 }
 if(v.accessory==='Star pin'){
   r('pin-contrast-field',left+3,44,9,9,'ink');r('pin-star-center',left+5,46,5,5,'gold');
   r('pin-star-top',left+7,45,1,1,'snow');r('pin-star-bottom',left+7,51,1,1,'snow');
   r('pin-star-left',left+4,48,1,1,'snow');r('pin-star-right',left+10,48,1,1,'snow');
 }
 if(v.accessory==='Leaf pin'){
   r('pin-contrast-field',left+3,44,9,9,'snow');r('pin-leaf-center',left+5,46,5,4,'pine');
   r('pin-leaf-tip',left+8,45,3,2,'pine');r('pin-leaf-stem',left+4,50,2,2,'ink');
   r('pin-leaf-vein',left+7,47,1,3,'gold');
 }
 // A trail specimen at native scale, independent of future M3 movement.
 if(v.stepTrail==='Dots')for(let i=0;i<3;i++)r('trail-dot-'+i,2+(i%2)*3,60+i*6,3,3,'pine');
 if(v.stepTrail==='Leaves')for(let i=0;i<3;i++){
   r('trail-leaf-'+i,1+(i%2)*3,59+i*6,4,3,'pine');r('trail-leaf-stem-'+i,3+(i%2)*3,62+i*6,1,2,'gold');
 }
 return out;
}
