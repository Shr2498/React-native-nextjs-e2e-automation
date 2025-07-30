@echo off
echo =================================
echo Rebet.app Professional Test Suite
echo =================================
echo.

echo Select test category:
echo 1. Quick validation (basic connectivity)
echo 2. Homepage tests (comprehensive)
echo 3. Advanced user flows (conversion testing)
echo 4. Performance & accessibility
echo 5. Cross-platform & gaming features
echo 6. Security & compliance
echo 7. User journey analysis
echo 8. All core tests (recommended for demo)
echo 9. Complete test suite (all tests)
echo 10. Run with browser visible (debug mode)
echo 11. Generate test code interactively
echo 12. View test report
echo.

set /p choice="Enter your choice (1-12): "

if "%choice%"=="1" (
    echo Running quick validation...
    npx playwright test quick-validation.spec.ts --reporter=line
) else if "%choice%"=="2" (
    echo Running homepage tests...
    npx playwright test homepage.spec.ts --reporter=line
) else if "%choice%"=="3" (
    echo Running advanced user flows...
    npx playwright test advanced-user-flows.spec.ts --reporter=line
) else if "%choice%"=="4" (
    echo Running performance and accessibility tests...
    npx playwright test performance-accessibility.spec.ts --reporter=line
) else if "%choice%"=="5" (
    echo Running cross-platform and gaming tests...
    npx playwright test cross-platform-gaming.spec.ts --reporter=line
) else if "%choice%"=="6" (
    echo Running security and compliance tests...
    npx playwright test security-compliance.spec.ts --reporter=line
) else if "%choice%"=="7" (
    echo Running user journey analysis...
    npx playwright test user-journey-analysis.spec.ts --reporter=line
) else if "%choice%"=="8" (
    echo Running core test suite for demonstration...
    npx playwright test homepage.spec.ts advanced-user-flows.spec.ts cross-platform-gaming.spec.ts --reporter=line
) else if "%choice%"=="9" (
    echo Running complete test suite...
    npx playwright test --reporter=line
) else if "%choice%"=="10" (
    echo Running tests with browser visible...
    npx playwright test homepage.spec.ts advanced-user-flows.spec.ts --headed
) else if "%choice%"=="11" (
    echo Starting Playwright codegen...
    npx playwright codegen https://rebet.app/
) else if "%choice%"=="12" (
    echo Opening test report...
    npx playwright show-report
) else (
    echo Invalid choice. Please run the script again.
)

echo.
pause
