import{test,expect}from'@playwright/test';

test.describe('RebetAdvancedUserFlows',()=>{
test.beforeEach(async({page})=>{
await page.goto('https://rebet.app/');
await page.waitForLoadState('domcontentloaded',{timeout:15000});
});

test('shouldhandleuserjourneyfromhomepagetosignup',async({page})=>{
console.log('Testingcompleteusersignupflow...');

//FindandclickprimaryCTA
const signupSelectors = [
'text="SignUptoPlayNow"',
'text="PlayNow"',
'text="GetStarted"',
'a[href*="play.rebet.app"]'
];

let signupClicked = false;
for (const selector of signupSelectors){
const element = page.locator(selector).first();
if(await element.isVisible().catch(()=>false)){
//Handlepotentialnewtab/redirect
const[newPage]=await Promise.all([
page.context().waitForEvent('page').catch(()=>null),
element.click().catch(()=>{})
]);

if(newPage){
await newPage.waitForLoadState('domcontentloaded',{timeout:15000});
console.log(`Navigatedto:${newPage.url()}`);

//Validatesignuppageelements
const hasSignupForm = await newPage.locator('form,input[type="email"],input[type="password"]').first().isVisible().catch(()=>false);
if(hasSignupForm){
console.log('Signupformdetected');
}

await newPage.close();
}
signupClicked=true;
break;
}
}

expect(signupClicked).toBeTruthy();
});

test('shouldvalidatesocialfeaturesanduserreviews',async({page})=>{
console.log('Testingsocialfeaturesvalidation...');

//Scrolltoreviewssection
await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight*0.6));
await page.waitForTimeout(2000);

//Testuserreviewinteractions
const reviewElements = page.locator('text=/review|rating|★|star/i');
const reviewCount = await reviewElements.count();
console.log(`Found${reviewCount}review-relatedelements`);

if(reviewCount>0){
//Checkforreviewauthenticityindicators
const userAvatars = page.locator('img[src*="avatar"],img[alt*="user"]');
const userNames = page.locator('text=/^[A-Za-z]{3,}\\s?[A-Za-z]*$/');
//Splitcomplexselectortoavoidparsingissues
const timestampsAgo = page.locator('text=/ago|\\d{1,2}\\s?(min|hour|day|week|month)/i');
const timestampsDate = page.locator('text=/\\w{3}\\s?\\d{1,2}/');

const avatarCount = await userAvatars.count();
const nameCount = await userNames.count();
const timeCountAgo = await timestampsAgo.count();
const timeCountDate = await timestampsDate.count();
const timeCount = timeCountAgo+timeCountDate;

console.log(`Socialproofelements:${avatarCount}avatars,${nameCount}names,${timeCount}timestamps`);
expect(avatarCount+nameCount+timeCount).toBeGreaterThan(0);
}
});

test('shouldvalidategamingcontentandfeatures',async({page})=>{
console.log('Testinggamingcontentvalidation...');

//Testforspecificgamingfeaturesmentionedonsite
const gamingFeatures = [
{name:'Plinko',selector:'text=/plinko/i'},
{name:'Slots',selector:'text=/slots/i'},
{name:'LiveDealer',selector:'text=/livedealer/i'},
{name:'Blackjack',selector:'text=/blackjack/i'},
{name:'Roulette',selector:'text=/roulette/i'},
{name:'SportsBetting',selector:'text=/sports.*bet|bet.*sports/i'},
{name:'SocialGaming',selector:'text=/social.*gam/i'}
];

const foundFeatures = [];
for (const feature of gamingFeatures){
const element = page.locator(feature.selector).first();
if(await element.isVisible().catch(()=>false)){
foundFeatures.push(feature.name);
console.log(`Foundgamingfeature:${feature.name}`);
}
}

expect(foundFeatures.length).toBeGreaterThan(2);
console.log(`Gamingplatformfeaturesvalidated:${foundFeatures.join(',')}`);
});

//Helper function to get text-based app store count
async function getAppStoreTextCount(page: any, platform: string): Promise<number> {
if (platform === 'iOS') {
return await page.locator('text=/app store/i').count();
} else if (platform === 'Android') {
return await page.locator('text=/google play/i').count();
}
return 0;
}

//Helper function to validate app store links
async function validateAppStoreLink(element: any, platform: string): Promise<void> {
if (await element.evaluate((el: any) => el.tagName === 'A')) {
const href = await element.getAttribute('href');
console.log(`${platform} app link found: ${href}`);

//Validate app store URLs
if (platform === 'iOS') {
expect(href).toMatch(/apps\.apple\.com|itunes\.apple\.com/);
} else {
expect(href).toMatch(/play\.google\.com/);
}
}
}

test('shouldtestcross-platformapppromotion',async({page})=>{
console.log('Testingmobileapppromotionanddownloads...');

//Lookforappstorebadgesandlinks
const appStoreElements = [
{platform:'iOS',selector:'a[href*="apps.apple.com"],img[src*="app-store"]'},
{platform:'Android',selector:'a[href*="play.google.com"],img[src*="google-play"]'}
];

for (const app of appStoreElements){
const elements = page.locator(app.selector);
const count = await elements.count();
const textCount = await getAppStoreTextCount(page,app.platform);
const totalCount = count+textCount;

if(totalCount>0){
console.log(`Found${app.platform}apppromotion:${totalCount}elements`);

if(count>0){
const firstElement = elements.first();
await expect(firstElement).toBeVisible();
await validateAppStoreLink(firstElement,app.platform);
}
}
}
});

test('shouldvalidatepromotionalcontentandCTAs',async({page})=>{
console.log('Testingpromotionalcontentandconversionelements...');

//Checkforpromotionalelements
const promoElements = [
'text=/free.*play|free.*bet/i',
'text=/bonus|depositmatch|100%/i',
'text=/nodeposit|welcome/i',
'text=/$\\d+|$\\s?\\d+/i'//Moneyamounts
];

let promoCount = 0;
for (const selector of promoElements){
const elements = page.locator(selector);
const count = await elements.count();
if(count>0){
promoCount+=count;
console.log(`Promotionalcontentfound:${selector}`);
}
}

//TestCTAeffectiveness
const ctaButtons = page.locator('button,a[href]').filter({hasText:/play|sign|join|start|download|get/i});
const ctaCount = await ctaButtons.count();

console.log(`Found${ctaCount}call-to-actionelements`);
console.log(`Found${promoCount}promotionalcontentpieces`);

expect(ctaCount).toBeGreaterThan(0);
});
});
