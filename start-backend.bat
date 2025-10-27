@echo off
echo ============================================
echo Anonymous Confessions Board - Backend Setup
echo ============================================
echo.

cd backend

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed.
)

echo.
echo ============================================
echo Starting Backend Server on port 5000...
echo ============================================
echo.

call npm run dev
