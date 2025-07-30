@echo off
echo =================================
echo Rebet.app Automation Framework
echo =================================
echo.

echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install npm dependencies
    pause
    exit /b 1
)

echo.
echo Installing Playwright browsers...
npx playwright install
if %errorlevel% neq 0 (
    echo Error: Failed to install Playwright browsers
    pause
    exit /b 1
)

echo.
echo Setting up environment file...
if not exist .env (
    copy .env.example .env
    echo Created .env file from template
)

echo.
echo ✅ Setup completed successfully!
echo.
echo Available commands:
echo   npm test              - Run all tests
echo   npm run test:headed   - Run tests with browser visible
echo   npm run test:ui       - Run tests with Playwright UI
echo   npm run test:mobile   - Run mobile tests only
echo   npm run test:codegen  - Generate test code interactively
echo   npm run test:report   - View test report
echo.
pause
