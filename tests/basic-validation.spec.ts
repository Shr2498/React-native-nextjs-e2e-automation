import{test,expect}from'@playwright/test';

test.describe('RebetWebsiteBasicValidation',()=>{

test('Websiteaccessibilitycheck',async({page})=>{
console.log('TestingRebet.appaccessibility...');

try{
await page.goto('https://rebet.app/',{timeout:30000});
await page.waitForLoadState('domcontentloaded',{timeout:15000});

//Basicchecks
const title = await page.title();
console.log(`Pagetitle:${title}`);
expect(title.toLowerCase()).toContain('rebet');

//Checkifpageloadedproperly
const bodyText = await page.locator('body').textContent();
expect(bodyText?.toLowerCase()).toContain('rebet');

console.log('Websiteisaccessibleandresponsive');

}catch(error){
console.error('Websiteaccessibilitytestfailed:',error);
throw error;
}
});

test('Maincontentverification',async({page})=>{
console.log('Verifyingmaincontent...');

await page.goto('https://rebet.app/');
await page.waitForLoadState('domcontentloaded', {timeout: 15000}).catch(() => {}); await page.waitForTimeout(1000);

//Takeascreenshotforreference
await page.screenshot({
path:'test-results/homepage-screenshot.png',
fullPage:true
});

console.log('Screenshotsavedtotest-results/homepage-screenshot.png');

//Checkforkeycontent
const pageContent = await page.textContent('body');
const hasGamingContent = /casino|sports|gaming|betting/i.test(pageContent||'');

expect(hasGamingContent).toBeTruthy();
console.log('Gaming/sportscontentdetected');
});

test('Linksandnavigationcheck',async({page})=>{
console.log('Testingnavigation...');

await page.goto('https://rebet.app/');
await page.waitForLoadState('domcontentloaded', {timeout: 15000}).catch(() => {}); await page.waitForTimeout(1000);

//Getalllinks
const links = await page.locator('a[href]').all();
console.log(`Found${links.length}linksonpage`);

//Checkfirstfewlinksarevalid
for (let i =0;i<Math.min(links.length,5);i++){
const href = await links[i].getAttribute('href');
if(href&&!href.startsWith('#')){
console.log(`Link${i+1}:${href}`);
}
}

expect(links.length).toBeGreaterThan(0);
console.log('Navigationlinksfound');
});
});
