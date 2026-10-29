import {test,expect} from '@playwright/test';
import range from '../content/character-range.json' with {type:'json'};

test('range choices paint the separate portrait and survive save/reload',async({page},info)=>{
 test.setTimeout(180000);
 await page.goto('/');await page.getByLabel('Your character is traveling from').fill('Home');await page.getByRole('button',{name:'Board the train',exact:true}).click();for(const name of ['Watch the countryside','Approach Middlebury','Step onto the platform'])await page.getByRole('button',{name,exact:true}).click();await page.getByRole('button',{name:'Create your character'}).click();
 const portrait=page.locator('.preview-portrait'),sprite=page.locator('.preview-sprite');await expect(portrait).toBeVisible();await expect(sprite).toBeVisible();expect((await portrait.boundingBox())!.width).toBe(info.project.name==='phone'?160:320);expect((await sprite.boundingBox())!.width).toBe(64);
 await page.getByLabel('Name',{exact:true}).fill('Rowan');
 for(const group of [...new Set(range.controls.map(c=>c.group))]){
  await page.locator('summary').filter({hasText:new RegExp('^'+group+'$')}).click();
  for(const c of range.controls.filter(c=>c.group===group)){
   const input=page.getByRole('combobox',{name:c.label,exact:true});const images:Buffer[]=[];
   for(const option of c.options){await input.selectOption(option);await expect(input).toHaveValue(option);if(['voiceLabel','vocalFilter'].includes(c.key)){await expect(page.locator('.preview-help').first()).toContainText(option);}else{images.push(await portrait.screenshot());}}
   if(images.length)expect(new Set(images.map(b=>b.toString('base64'))).size,c.key).toBe(c.options.length);
   await input.selectOption(c.default);
  }
  await page.locator('summary').filter({hasText:new RegExp('^'+group+'$')}).click();
 }
 await page.getByLabel('Mobility',{exact:true}).selectOption('Wheelchair');await page.getByLabel('Colorblind palette',{exact:true}).selectOption('Deuteranopia');await page.getByLabel('High contrast',{exact:true}).check();await page.getByLabel('UI scale',{exact:true}).selectOption('Larger');
 await page.locator('summary').filter({hasText:/^Biological$/}).click();await page.getByLabel('Build kind',{exact:true}).selectOption('Construct');await page.getByLabel('Surface pattern 1',{exact:true}).selectOption('Spots');
 await expect(page.locator('main')).toHaveAttribute('data-palette','Deuteranopia');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`work/screenshots/${info.project.name}/range-access.png`});
 await page.getByRole('button',{name:'Save character',exact:true}).click();await expect(page.getByText('Your character is ready. D2 ends here; the escorted walk comes next.',{exact:true})).toBeVisible();await expect(portrait).toBeVisible();await page.reload();await page.getByRole('button',{name:'Create your character'}).click();await page.locator('summary').filter({hasText:/^Biological$/}).click();await expect(page.getByLabel('Build kind',{exact:true})).toHaveValue('Construct');await expect(page.getByLabel('Surface pattern 1',{exact:true})).toHaveValue('Spots');await expect(page.getByLabel('Mobility',{exact:true})).toHaveValue('Wheelchair');await expect(page.getByLabel('Colorblind palette',{exact:true})).toHaveValue('Deuteranopia');await expect(page.getByLabel('First-generation',{exact:true})).not.toBeChecked();await expect(page.getByLabel('International',{exact:true})).not.toBeChecked();
 await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`work/screenshots/${info.project.name}/range-portrait.png`});
});
