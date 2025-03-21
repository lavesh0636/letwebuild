# PowerShell script for deploying to Vercel on Windows

Write-Host "🚀 Starting Vercel deployment..." -ForegroundColor Cyan

# Check if Vercel CLI is installed
$vercelInstalled = $null
try {
    $vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
} catch {
    # Command not found
}

if ($vercelInstalled -eq $null) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Ensure all dependencies are installed
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

# Build the project locally to catch any build errors
Write-Host "🔨 Building project locally..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Please fix the errors before deploying." -ForegroundColor Red
    exit 1
}

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Green
vercel --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green 