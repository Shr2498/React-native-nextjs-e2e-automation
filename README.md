# Rebet.app Frontend Automation Framework

A comprehensive end-to-end testing framework for the Rebet.app website, built with Playwright and TypeScript.

## About Rebet.app

**Rebet.app** is a social

### **User Journey Analysis** (`user-journey-analysis.spec.ts`)
- Complete user discovery journey
- Mobileapppromotioneffectiveness
- Conversionfunneloptimization
- Competitivepositioninganalysis
- Brandconsistencyvalidation

##🛠️Troubleshooting

###Ifnpmcommandsdon'twork:
1.MakesureNode.jsisinstalled:https://nodejs.org/
2.RestartCommandPromptafterinstallingNode.js
3.CheckPATHenvironmentvariableincludesNode.js

###Iftestsfail:
1.Checkinternetconnection(testsrunagainstlivesite)
2.Runwith`--headed`flagtoseewhat'shappening
3.Checktest- resultsfolderforscreenshots/videos
4.Updateselectorsifwebsitestructurechanged

###CommonCommandsforDebugging:
```cmd
#Runsingletestwithdebuginfo
npxplaywrighttesthomepage.spec.ts--headed--debug

#Runtestswithtrace
npxplaywrighttest--traceon

#ShowPlaywrightUIfordebugging
npxplaywrighttest--ui
```

##AdvancedConfiguration
- **WordPress-basedmarketingwebsite**promotingthegamingplatform
- **Socialsportsbetting**withcommunityfeatures
- **Casino- stylegames**(Plinko,slots,tablegames,livedealer)
- **Mobileapps**availableoniOSandAndroid
- **Socialfeatures**(following,commenting,sharingpicks)
- **Free-to-playgaming**withvirtualcurrency

## Technology Stack Analysis

- **Frontend**:WordPresswithcustomtheme
- **Assets**:Optimizedimages,SVGs,WebPformat
- **MobileApps**:ReactNative(iOS/Android)
- **MainPlatform**:React/Next.jsbased(play.rebet.app)

##AutomationFrameworkFeatures

###ComprehensiveWebTesting(Playwright)
- **Cross- browsertesting**(Chrome,Firefox,Safari)
- **Mobileresponsiveness**acrossmultipledevicetypes
- **Performancemonitoring**withCoreWebVitals
- **Accessibilitytesting**withWCAGcompliance
- **Securityvalidation**andcompliancechecks
- **Visualregressiontesting**

###Mobile&Cross- PlatformTesting
- **Responsivedesign**validationacross7+viewports
- **Touchinteraction**testing
- **Mobileapppromotion**validation
- **Appstorelinks**verification

###ProfessionalQualityAssurance
- **TypeScript**fortypesafetyandmaintainability
- **ESLint+Prettier**forcodequality
- **GitHubActions**CI/CDpipelineready
- **Comprehensivereporting**withAllureintegration

##�QuickStartGuide

###Prerequisites
- Node.js18+installed
- Gitinstalled

###Option1:AutomatedSetup(Recommended)

1.**Double- click`setup.bat`**orruninCommandPrompt:
```cmd
setup.bat
```
Thiswillautomatically:
- Installallnpmdependencies
- InstallPlaywrightbrowsers
- Create.envfilefromtemplate
- Displayavailablecommands

###Option2:ManualSetup

1.**OpenCommandPrompt**andnavigatetoprojectfolder:
```cmd
cdc:\Users\13108\Projects\React- native- nextjs- e2e- automation
```

2.**Installdependencies:**
```cmd
npminstall
```

3.**InstallPlaywrightbrowsers:**
```cmd
npxplaywrightinstall
```

4.**Copyenvironmentfile:**
```cmd
copy.env.example.env
```

###RunningTests

####EasyWay(InteractiveMenu)
1.**Double- click`run- tests.bat`**orrun:
```cmd
run- tests.bat
```
Selectfromtheinteractivemenu.

####ProfessionalTestExecution
Forcomprehensivetestingwithprofessionalreporting:
```bash
#WindowsCommandPrompt
run- tests- professional.bat

#PowerShell(ifexecutionpolicyallows)
.\run- tests- professional.bat

#Manualexecution
npxplaywrighttest--project=chromium--project=firefox--reporter=html,allure- playwright
```

####CommandLineOptions
```cmd
#Runalltests
npmtest

#Runtestswithbrowservisible
npmruntest:headed

#RuntestswithPlaywrightUI
npmruntest:ui

#Runmobiletestsonly
npmruntest:mobile

#Runspecifictestfile
npxplaywrighttesthomepage.spec.ts

#Generatetestcodeinteractively
npmruntest:codegen

#Viewtestreport
npmruntest:report
```

###ViewingResults

Afterrunningtests,viewresults:

1.**HTMLReport:**
```cmd
npmruntest:report
```

2.**Checktest- resultsfolder**forscreenshotsandvideosoffailedtests

3.**AllureReport**(ifconfigured):
```cmd
npxallureserveallure- results
```

##ProjectStructure

```
react- native- nextjs- e2e- automation/
├──tests/#Testsuites
│├──homepage.spec.ts#Homepagefunctionalitytests
│├──advanced- user- flows.spec.ts#Userjourneyandconversiontests
│├──performance- accessibility.spec.ts#Performanceandaccessibility
│├──cross- platform- gaming.spec.ts#Gamingfeaturesanddevices
│├──security- compliance.spec.ts#Securityandcompliance
│├──user- journey- analysis.spec.ts#End-to-enduserexperience
│├──navigation.spec.ts#Navigationandroutingtests
│├──mobile.spec.ts#Mobileresponsivenesstests
│└──quick- validation.spec.ts#Basicconnectivitytests
├──utils/#Helperutilitiesandpageobjects
│└──helpers.ts#Commontesthelpersandutilities
├──.github/workflows/#CI/CDconfiguration
│└──playwright.yml#GitHubActionsworkflow
├──playwright.config.ts#Playwrightconfiguration
├──setup.bat#Automatedsetupscript
├──run- tests- professional.bat#Professionaltestrunner
└──package.json#Dependenciesandscripts
```

##TestCoverage

###**FoundationTests**(`homepage.spec.ts`)
- Pageloadingandbasicfunctionalityvalidation
- Rebetbrandingandcontentverification
- Call-to-actionelementstesting
- Sportsandgamingcontentdetection
- Footerandnavigationvalidation
- Imageloadingoptimization
- Mobileresponsivenessverification

###**AdvancedUserFlows**(`advanced- user- flows.spec.ts`)
- Completeusersignupjourneytesting
- Socialfeaturesanduserreviewsvalidation
- Gamingcontentandfeaturesverification
- Cross- platformapppromotiontesting
- PromotionalcontentandCTAeffectiveness

###**Performance&Accessibility**(`performance- accessibility.spec.ts`)
- CoreWebVitalsmeasurement(FCP,LCP)
- Accessibilitycompliancetesting
- Networkconditionsandresilience
- SEOoptimizationvalidation
- Errorhandlingandedgecases

###**Cross- PlatformGaming**(`cross- platform- gaming.spec.ts`)
- Browser- specificfeaturetesting
- Multi- resolutionresponsivedesign
- Touchinteractionvalidation
- Gamingplatformfeaturesdetection
- Socialbettingfeaturesvalidation

###**Security&Compliance**(`security- compliance.spec.ts`)
- SSLcertificateandHTTPSvalidation
- Securityheadersanalysis
- Formsecurityanddatahandling
- Cookiecomplianceandprivacy
- Responsiblegamingcompliance
- APIendpointsecuritytesting

###**UserJourneyAnalysis**(`user- journey- analysis.spec.ts`)
- Completeuserdiscoveryjourney
- Mobileapppromotioneffectiveness
- Conversionfunneloptimization
- Competitivepositioninganalysis
- Brandconsistencyvalidation

##Configuration

###PlaywrightConfiguration
The`playwright.config.ts`filecontains:
- **Multiplebrowsersupport**(Chrome,Firefox,Safari)
- **Mobiledeviceemulation**
- **Screenshotandvideorecording**
- **Paralleltestexecution**
- **Customtimeoutsandretries**

###EnvironmentVariables
Configurein`.env`file:
- `BASE_URL`:TargetwebsiteURL
- `TEST_USER_EMAIL`:Testcredentials(ifneeded)
- `HEADLESS`:Runtestsinheadlessmode
- `MAX_WORKERS`:Parallelexecutionworkers

###Cross- BrowserTesting
- **Chrome/Chromium**:Primarybrowsertesting
- **Firefox**:Cross- browsercompatibility
- **Safari**:WebKitenginevalidation
- **MobileChrome**:Androidmobilesimulation
- **MobileSafari**:iOSmobilesimulation

###DeviceTestingMatrix
- **MobilePhones**:320px- 480px(Portrait/Landscape)
- **Tablets**:768px- 1024px(Portrait/Landscape)
- **Desktop**:1280px- 2560px(Variousresolutions)
- **4KDisplays**:Ultra- highresolutiontesting

##CI/CDPipeline

GitHubActionsworkflowautomatically:
- **Runstests**onpush/PRtomainbranch
- **Testsmultiplebrowsers**inparallel
- **Dailyscheduledruns**formonitoring
- **Generatesreports**andartifacts
- **Accessibilitytesting**
- **Performancemonitoring**

##AdvancedFeatures

###VisualTesting
```bash
#Takescreenshotsforcomparison
npxplaywrighttest--update- snapshots

#Comparevisualdifferences
npxplaywrighttest--reporter=html
```

###APITestingIntegration
```typescript
//ExampleAPItestintegration
test('shouldvalidateAPIendpoints',async({request})=>{
constresponse=awaitrequest.get('/api/health');
expect(response.status()).toBe(200);
});
```

###CustomSelectors
```typescript
//PageObjectModelexample
classRebetHomePage{
constructor(privatepage:Page){}

asyncclickPlayNow(){
awaitthis.page.locator('[data- testid="play- now"]').click();
}
}
```

##BestPractices

###TestOrganization
- **Descriptivetestnames**explainingwhatisbeingtested
- **PageObjectModel**forreusablecomponents
- **Helperfunctions**forcommonactions
- **Data- driventesting**withexternaltestdata

###Reliability
- **Properwaits**forelementsandnetwork
- **Retrymechanisms**forflakytests
- **Errorhandling**andcleanup
- **Isolatedtestexecution**

###Maintenance
- **Regularupdates**ofdependencies
- **Testreview**andrefactoring
- **Documentationupdates**
- **Performancemonitoring**

##NextSteps

1.**Runthesetup.bat**togetstarted
2.**Tryrunningtests**withrun- tests.bat
3.**Explorethetestfiles**inthe`tests/`folder
4.**Customizetests**foryourspecificneeds
5.**Addnewtestscenarios**asneeded

##FilesOverview

- `setup.bat`- Automatedsetupscript
- `run- tests.bat`- Interactivetestrunner
- `run- tests- professional.bat`- Professionaltestexecution
- `tests/`- Alltestfilesorganizedbyfunctionality
- `utils/helpers.ts`- Commontestutilitiesandpageobjects
- `playwright.config.ts`- Comprehensivetestconfiguration
- `.env.example`- Environmentvariablestemplate

--- 

*ProfessionalfrontendautomationframeworkforReactNative,TypeScript,andNext.jsapplications.*
- []**Cross- platformmobile**testing(iOS/Android)
- []**Realdevicetesting**integration

###MobileAppTesting
- []**ReactNativeapp**automationwithDetox
- []**iOSsimulator**testing
- []**Androidemulator**testing
- []**Appstoredeployment**validation

##Support&Contribution

###GettingHelp
- Checkexistingtestsforexamples
- ReviewPlaywrightdocumentation
- Openissuesforbugsorfeaturerequests

###Contributing
1.Forktherepository
2.Createafeaturebranch
3.Addtestsfornewfunctionality
4.Submitapullrequest

##License

ThisprojectislicensedundertheMITLicense- seetheLICENSEfilefordetails.

--- 



