#!/bin/bash

echo "🚀 Starting Vercel deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Ensure all dependencies are installed
echo "📦 Installing dependencies..."
npm install

# Build the project locally to catch any build errors
echo "🔨 Building project locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!" 