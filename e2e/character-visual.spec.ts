import {test,expect} from '@playwright/test';
import copy from '../content/character.json' with { type: 'json' };

test('preview is visible, every named visual choice changes pixels, and wardrobe survives reload',async({page},info)=>{
 test.setTimeout(90000);
 await page.goto('/');await page.getByLabel('Your character is traveling from').fill('Home');await page.getByRole('button',{name:'Board the train',exact:true}).click();for(const name of ['Watch the countryside','Approach Middlebury','Step onto the platform'])await page.getByRole('button',{name,exact:true}).click();await page.getByRole('button',{name:'Create your character'}).click();
 const figure=page.locator('svg.preview-sprite');await expect(figure).toBeVisible();let bounds=await figure.boundingBox();expect(bounds!.y).toBeGreaterThanOrEqual(0);expect(bounds!.y+bounds!.height).toBeLessThanOrEqual(page.viewportSize()!.height);expect(bounds!.width).toBe(info.project.name==='phone'?128:192);
 await expect(page.getByRole('combobox',{name:'Skin tone',exact:true})).toHaveCount(0);
 let prior=await figure.screenshot();
 for(const tone of copy.skinTones){await page.getByRole('button',{name:tone.name,exact:true}).click();await expect(page.getByRole('button',{name:tone.name,exact:true})).toHaveAttribute('aria-pressed','true');const next=await figure.screenshot();if(tone.id!=='1')expect(next.equals(prior)).toBe(false);prior=next;}
 for(const [field,label] of [['body','Body'],['hair','Hair'],['hairColor','Hair color'],['facialHair','Facial hair'],['covering','Head covering'],['mobility','Mobility'],['clothes','Clothes'],['clothesColor','Clothes color'],['bottom','Bottom'],['eyewear','Eyewear'],['scarf','Scarf'],['bag','Bag']] as const){
   const options=copy.fields[field];await page.getByRole('combobox',{name:label,exact:true}).selectOption(options[0]);let previous=await figure.screenshot();
   for(const option of options.slice(1)){await page.getByRole('combobox',{name:label,exact:true}).selectOption(option);const rendered=await figure.screenshot();expect(rendered.equals(previous),`${field}: ${option} must change the figure`).toBe(false);previous=rendered;}
   await page.getByRole('combobox',{name:label,exact:true}).selectOption(options[0]);
 }
 await page.getByLabel('Name',{exact:true}).fill('Ari');await page.getByLabel('Mobility',{exact:true}).selectOption('Wheelchair');await page.getByLabel('Clothes',{exact:true}).selectOption('Jacket');await page.getByLabel('Eyewear',{exact:true}).selectOption('Round glasses');await page.getByLabel('Bag',{exact:true}).selectOption('Shoulder bag');
 await page.getByLabel('Bag',{exact:true}).scrollIntoViewIfNeeded();
 bounds=await figure.boundingBox();expect(bounds!.y).toBeGreaterThanOrEqual(0);expect(bounds!.y+bounds!.height).toBeLessThanOrEqual(page.viewportSize()!.height);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`work/screenshots/${info.project.name}/wardrobe-scrolled.png`});await page.evaluate(()=>window.scrollTo(0,0));const before=await figure.screenshot();await page.getByRole('button',{name:'Save character'}).click();await expect(figure).toBeVisible();await page.reload();await page.getByRole('button',{name:'Create your character'}).click();await page.evaluate(()=>window.scrollTo(0,0));expect((await figure.screenshot()).equals(before)).toBe(true);await expect(page.getByLabel('Clothes',{exact:true})).toHaveValue('Jacket');
 await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`work/screenshots/${info.project.name}/wardrobe-top.png`});
});
