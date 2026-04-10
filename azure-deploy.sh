#!/bin/bash
# Azure App Service Linux Deployment Script

set -e

echo "Building Sentinel Security App for Azure..."

# Install dependencies
npm ci

# Build the app
npm run build

echo "Build complete!"
echo ""
echo "To deploy to Azure App Service:"
echo "1. Create App Service: az webapp create --resource-group <RG> --plan <PLAN> --name <APP_NAME> --runtime 'NODE|20-lts'"
echo "2. Set startup command: az webapp config set --resource-group <RG> --name <APP_NAME> --startup-file 'npm start'"
echo "3. Deploy: az webapp up --name <APP_NAME> --resource-group <RG>"
echo ""
echo "Ensure environment variables are set in Azure Portal:"
echo "- GEMINI_API_KEY (required for AI features)"