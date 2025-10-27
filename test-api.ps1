# Test Script - API Endpoints
# Use PowerShell to test the API endpoints

# Note: Make sure the backend server is running first!

Write-Host "Testing Anonymous Confessions Board API" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green
Write-Host ""

# Test 1: Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
    Write-Host "✓ Health Check Passed" -ForegroundColor Green
    Write-Host "  Status: $($response.message)" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Health Check Failed - Is the backend running?" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 2: Create Confession
Write-Host "2. Creating Test Confession..." -ForegroundColor Yellow
$body = @{
    content = "This is a test confession from PowerShell! I'm excited to see this app in action."
    category = "Others"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/confessions" -Method Post -Body $body -ContentType "application/json"
    $confessionId = $response.data._id
    Write-Host "✓ Confession Created Successfully" -ForegroundColor Green
    Write-Host "  ID: $confessionId" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Failed to create confession" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 3: Get All Confessions
Write-Host "3. Fetching All Confessions..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/confessions" -Method Get
    Write-Host "✓ Fetched $($response.count) confessions" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to fetch confessions" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 4: Upvote Confession
Write-Host "4. Upvoting Confession..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/confessions/$confessionId/upvote" -Method Patch
    Write-Host "✓ Confession Upvoted" -ForegroundColor Green
    Write-Host "  Current upvotes: $($response.data.upvotes)" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Failed to upvote confession" -ForegroundColor Red
}

Write-Host ""

# Test 5: Filter by Category
Write-Host "5. Filtering by Category (Others)..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/confessions?category=Others" -Method Get
    Write-Host "✓ Found $($response.count) confessions in 'Others' category" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to filter confessions" -ForegroundColor Red
}

Write-Host ""

# Test 6: Search Confessions
Write-Host "6. Searching Confessions (keyword: 'test')..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/confessions?search=test" -Method Get
    Write-Host "✓ Found $($response.count) confessions matching 'test'" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to search confessions" -ForegroundColor Red
}

Write-Host ""
Write-Host "=======================================" -ForegroundColor Green
Write-Host "All Tests Completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Open http://localhost:5173 in your browser" -ForegroundColor Cyan
Write-Host "2. Try creating confessions from the UI" -ForegroundColor Cyan
Write-Host "3. Test upvoting, filtering, and searching" -ForegroundColor Cyan
