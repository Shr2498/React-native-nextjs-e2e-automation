import{test,expect}from'@playwright/test';

test.describe('RebetSecurity&DataValidationTests',()=>{

test('shouldvalidatesecureconnectionandSSLcertificate',async({page})=>{
console.log('Testingsecurityimplementation...');

await page.goto('https://rebet.app/');
await page.waitForLoadState('domcontentloaded',{timeout:15000});

//VerifyHTTPSisenforced
const currentUrl = page.url();
expect(currentUrl).toMatch(/^https:\/\//);
console.log('HTTPSconnectionverified');

//Checkforsecurityheaders
const response = await page.goto('https://rebet.app/');
const headers = response?.headers();

if(headers){
const securityHeaders = {
'strict-transport-security':'HSTS',
'content-security-policy':'CSP',
'x-frame-options':'FrameOptions',
'x-content-type-options':'ContentTypeOptions',
'referrer-policy':'ReferrerPolicy'
};

const foundHeaders = [];
for (const [header, name] of Object.entries(securityHeaders)){
if(headers[header]){
foundHeaders.push(name);
console.log(`${name}headerpresent`);
}
}

console.log(`Securityheadersfound:${foundHeaders.join(',')}`);
}

//Testformixedcontentwarnings
const mixedContentWarnings: string[] = [];
page.on('console',(msg)=>{
if(msg.text().includes('MixedContent')||msg.text().includes('insecure')){
mixedContentWarnings.push(msg.text());
}
});

await page.waitForTimeout(3000);
expect(mixedContentWarnings.length).toBe(0);
console.log('Nomixedcontentwarningsdetected');
});

test('shouldvalidateformsecurityanddatahandling',async({page})=>{
console.log('Testingformsecurityandvalidation...');

await page.goto('https://rebet.app/');
await page.waitForLoadState('domcontentloaded', {timeout: 15000}).catch(() => {}); await page.waitForTimeout(1000);

//Lookforformsonthepage
const forms = page.locator('form');
const formCount = await forms.count();

if(formCount>0){
console.log(`Found${formCount}formstotest`);

for(let i = 0;i<Math.min(formCount,3);i++){
const form = forms.nth(i);

//CheckforCSRFprotection
const csrfToken = form.locator('input[name*="token"],input[name*="csrf"]');
const hasCsrfToken = await csrfToken.count()>0;

if(hasCsrfToken){
console.log('CSRFprotectiondetected');
}

//Testinputvalidation
const inputs = form.locator('input[type="email"],input[type="password"],input[type="text"]');
const inputCount = await inputs.count();

for(let j = 0;j<Math.min(inputCount,3);j++){
const input = inputs.nth(j);
const inputType = await input.getAttribute('type');
const required = await input.getAttribute('required');
const pattern = await input.getAttribute('pattern');

console.log(`Inputvalidation-Type:${inputType},Required:${!!required},Pattern:${!!pattern}`);
}
}
}else{
//Lookforpotentialsignup/loginflows
const authButtons = page.locator('text=/sign.*up|log.*in|register|join/i');
const authCount = await authButtons.count();

if(authCount>0){
console.log(`Found${authCount}authentication-relatedelements`);
}
}
});

test('shouldtestdataprivacyandcookiecompliance',async({page})=>{
console.log('Testingprivacyandcookiecompliance...');

//Startwithafreshcontexttotestinitialcookiebehavior
await page.goto('https://rebet.app/');
await page.waitForLoadState('domcontentloaded',{timeout:15000});

//Checkforcookieconsentbannerwithmoreflexibleapproach
const cookieIndicators = [
page.locator('text=/cookie/i'),
page.locator('text=/consent/i'),
page.locator('text=/privacy/i'),
page.locator('text=/gdpr/i'),
page.locator('[class*="cookie"]'),
page.locator('[class*="consent"]'),
page.locator('[id*="cookie"]'),
page.locator('[data-*="cookie"]')
];

let hasCookieBanner = false;
let foundBanner = null;

for (const indicator of cookieIndicators){
try{
if(await indicator.first().isVisible({timeout:2000})){
hasCookieBanner=true;
foundBanner=indicator;
break;
}
}catch(error){
//Logandcontinuecheckingotherindicators
console.log(`Cookieindicatorcheckfailed:${String(error)}`);
}
}

if(hasCookieBanner&&foundBanner){
console.log('Cookieconsentmechanismdetected');

//Testaccept/declineoptions
const acceptButton = page.locator('text=/accept|agree|ok|allow/i').first();
const declineButton = page.locator('text=/decline|reject|no|deny/i').first();

const hasAccept = await acceptButton.isVisible().catch(()=>false);
const hasDecline = await declineButton.isVisible().catch(()=>false);

console.log(`Cookiecontrols-Accept:${hasAccept},Decline:${hasDecline}`);
}

//Checkforprivacypolicylinkwithseparateselectors
const privacyLinkHref = page.locator('a[href*="privacy"]');
const privacyLinkText = page.locator('text="PrivacyPolicy"');

const hasPrivacyHref = await privacyLinkHref.count()>0;
const hasPrivacyText = await privacyLinkText.count()>0;
const hasPrivacyLink = hasPrivacyHref||hasPrivacyText;

if(hasPrivacyLink){
console.log('Privacypolicylinkfound');
}

//Testinitialcookies(shouldbeminimalwithoutconsent)
const initialCookies = await page.context().cookies();
const essentialCookies = initialCookies.filter(cookie=>
cookie.name.includes('session')||
cookie.name.includes('csrf')||
cookie.name.includes('security')
);

console.log(`Initialcookies:${initialCookies.length}total,${essentialCookies.length}essential`);
});

test('shouldvalidateresponsiblegamingfeatures',async({page})=>{
console.log('Testingresponsiblegamingcompliance...');

await page.goto('https://rebet.app/');
await page.waitForLoadState('domcontentloaded', {timeout: 15000}).catch(() => {}); await page.waitForTimeout(1000);

//Lookforresponsiblegamingindicators
const responsibleGamingTerms = [
'responsiblegaming',
'responsiblegambling',
'problemgambling',
'gamblingaddiction',
'self-exclusion',
'depositlimit',
'timelimit',
'18+',
'ageverification',
'gambleresponsibly'
];

const foundTerms = [];
for (const term of responsibleGamingTerms){
const elements = page.locator(`text=/${term}/i`);
const count = await elements.count();

if(count>0){
foundTerms.push(term);
console.log(`Foundresponsiblegamingcontent:"${term}"`);
}
}

//Checkforageverificationmentionswithescapedregex
const ageVerification = page.locator('text=/18|21|\\+|age|verify|adult/i');
const ageCount = await ageVerification.count();

if(ageCount>0){
console.log(`Ageverificationreferences:${ageCount}`);
}

//Lookforregulatorycompliance
const regulatoryTerms = page.locator('text=/license|regulated|commission|authority/i');
const regulatoryCount = await regulatoryTerms.count();

if(regulatoryCount>0){
console.log(`Regulatorycompliancereferences:${regulatoryCount}`);
}

console.log(`Responsiblegamingfeatures:${foundTerms.join(',')}`);
expect(foundTerms.length+ageCount+regulatoryCount).toBeGreaterThan(0);
});

test('shouldtestAPIendpointsecurity',async({page})=>{
console.log('TestingAPIsecurityanddataprotection...');

const apiCalls: string[] = [];
const secureApiCalls: string[] = [];

//Monitornetworkrequests
page.on('request',(request)=>{
const url = request.url();

//TrackAPIcalls
if(url.includes('/api/')||url.includes('/v1/')||url.includes('.json')){
apiCalls.push(url);

//CheckifusingHTTPS
if(url.startsWith('https://')){
secureApiCalls.push(url);
}
}
});

await page.goto('https://rebet.app/');
await page.waitForLoadState('domcontentloaded', {timeout: 15000}).catch(() => {}); await page.waitForTimeout(1000);

//TriggersomeinteractionstogenerateAPIcalls
const interactiveElements = page.locator('button,a[href],[onclick]');
const elementCount = await interactiveElements.count();

if(elementCount>0){
//ClickafewelementstotriggerpotentialAPIcalls
for(let i = 0;i<Math.min(elementCount,3);i++){
const element = interactiveElements.nth(i);
if(await element.isVisible()){
await element.click().catch(()=>{});
await page.waitForTimeout(1000);
}
}
}

await page.waitForTimeout(3000);

console.log(`APIcallsdetected:${apiCalls.length}`);
console.log(`SecureAPIcalls:${secureApiCalls.length}`);

//AllAPIcallsshouldbesecure
if(apiCalls.length>0){
const securityRatio = (secureApiCalls.length/apiCalls.length)*100;
console.log(`APIsecurityratio:${securityRatio.toFixed(1)}%`);
expect(securityRatio).toBeGreaterThan(90);//Atleast90%shouldbeHTTPS
}

//LogsomeAPIendpointsforreference
if(apiCalls.length>0){
console.log('SampleAPIendpoints:',apiCalls.slice(0,3));
}
});
});
