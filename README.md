<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1xveDiCUuPWBV-WVTLm8Ku7qi2wmlupMj

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Azure App Service (Linux)

**Prerequisites:** Azure CLI, Azure subscription

1. Login to Azure:
   `az login`

2. Create a resource group (if needed):
   `az group create --name myResourceGroup --location eastus`

3. Create an App Service plan:
   `az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku B1 --is-linux`

4. Create the web app:
   `az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name sentinel-security-app --runtime 'NODE|24-lts'`

5. Set the startup command:
   `az webapp config set --resource-group myResourceGroup --name sentinel-security-app --startup-file "npm start"`

6. Set environment variables:
   `az webapp config appsettings set --resource-group myResourceGroup --name sentinel-security-app --settings GEMINI_API_KEY=your_api_key_here`

7. Deploy the app:
   `az webapp up --name sentinel-security-app --resource-group myResourceGroup`

Alternatively, run the deployment script:
   `./azure-deploy.sh`
