@echo off
echo ============================================
echo Anonymous Confessions Board - Frontend Setup
echo ============================================
echo.

cd frontend

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed.
)

echo.
echo ============================================
echo Starting Frontend Dev Server on port 5173...
echo ============================================
echo.

call npm run dev
