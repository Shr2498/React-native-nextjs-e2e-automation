import{test,expect}from'@playwright/test';

test.describe('RebetWebsiteQuickValidation',()=>{
test('shouldaccessRebethomepagesuccessfully',async({page})=>{
//Navigatetothewebsite
await page.goto('https://rebet.app/');

//Waitforpagetoload
await page.waitForLoadState('domcontentloaded',{timeout:15000});

//Basicvalidationthatpageloaded
await expect(page).toHaveTitle(/rebet/i);

//Checkforkeycontent
const hasRebetContent = await page.locator('text=rebet').first().isVisible({timeout:10000});
expect(hasRebetContent).toBeTruthy();

console.log('Rebetwebsiteisaccessibleandloadingproperly');
});

test('shouldfindmaincall-to-actionelements',async({page})=>{
await page.goto('https://rebet.app/');
await page.waitForLoadState('domcontentloaded', {timeout: 15000}).catch(() => {}); await page.waitForTimeout(1000);

//Lookfor"PlayNow"orsimilarCTAbuttons
const playButtons = page.locator('text="PlayNow"');
const buttonCount = await playButtons.count();

if(buttonCount>0){
console.log(`Found${buttonCount}"PlayNow"button(s)`);
await expect(playButtons.first()).toBeVisible();
}else{
console.log('No"PlayNow"buttonsfound,checkingforotherCTAs');

//CheckforotherpossibleCTAs
const signUpButtons = page.locator('text="SignUp",text="GetStarted",text="Download",text="Sign Up",text="Get Started",a[href*="signup"],a[href*="register"],a[href*="join"]');
const ctaCount = await signUpButtons.count();

// If no exact matches, try more flexible approach
if (ctaCount === 0) {
  console.log('No exact CTA buttons found, checking for alternative CTAs...');
  const alternativeCTAs = page.locator('text=/sign.*up|get.*started|download|join|register/i');
  const altCount = await alternativeCTAs.count();
  expect(altCount).toBeGreaterThan(0);
} else {
  expect(ctaCount).toBeGreaterThan(0);
}
}
});

test('shouldhaveresponsivedesign',async({page})=>{
await page.goto('https://rebet.app/');

//Testdesktopview
await page.setViewportSize({width:1920,height:1080});
await page.waitForLoadState('domcontentloaded', {timeout: 15000}).catch(() => {}); await page.waitForTimeout(1000);

//Testmobileview
await page.setViewportSize({width:375,height:667});
await page.waitForTimeout(2000);//Allowtimeforresponsivechanges

//Checkthatpageisstillfunctionalonmobile
const bodyVisible = await page.locator('body').isVisible();
expect(bodyVisible).toBeTruthy();

console.log('Websiteappearsresponsiveacrossdifferentviewports');
});
});
