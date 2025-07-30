@echo off
echo =================================
echo Running Rebet.app Tests
echo =================================
echo.

@echo off
echo =================================
echo Running Rebet.app Tests
echo =================================
echo.

echo Select test type:
echo 1. Quick validation (basic connectivity)
echo 2. Homepage tests (comprehensive)
echo 3. Content validation (sports/casino features)
echo 4. All tests
echo 5. Run tests with browser visible
echo 6. Mobile responsiveness tests
echo 7. Generate test code interactively
echo 8. View test report
echo.

set /p choice="Enter your choice (1-8): "

if "%choice%"=="1" (
    echo Running quick validation...
    npx playwright test quick-validation.spec.ts --reporter=line
) else if "%choice%"=="2" (
    echo Running homepage tests...
    npx playwright test homepage.spec.ts --reporter=line
) else if "%choice%"=="3" (
    echo Running content validation...
    npx playwright test rebet-content.spec.ts --reporter=line
) else if "%choice%"=="4" (
    echo Running all tests...
    npx playwright test --reporter=line
) else if "%choice%"=="5" (
    echo Running tests with browser visible...
    npx playwright test quick-validation.spec.ts --headed
) else if "%choice%"=="6" (
    echo Running mobile tests...
    npx playwright test mobile.spec.ts --reporter=line
) else if "%choice%"=="7" (
    echo Starting Playwright codegen...
    npx playwright codegen https://rebet.app/
) else if "%choice%"=="8" (
    echo Opening test report...
    npx playwright show-report
) else (
    echo Invalid choice. Please run the script again.
)

echo.
pause
