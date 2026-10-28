import type { Character } from './character';
export type PixelShape={part:string;x:number;y:number;w:number;h:number;color:string};
export function characterShapes(v: Character) {
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

