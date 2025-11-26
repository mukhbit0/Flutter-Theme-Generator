---
description: How to configure build secrets for Cloudflare Workers/Pages CI/CD
---

Since your repository is public and `.env` is gitignored, Cloudflare's build server cannot see your environment variables. You must configure them in the Cloudflare Dashboard.

## Step 1: Go to Cloudflare Dashboard
1.  Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com).
2.  Navigate to **Workers & Pages**.
3.  Select your project (`flutter-theme-generator`).

## Step 2: Add Environment Variables
1.  Go to **Settings** > **Variables and Secrets**.
2.  Click **Add variable**.
3.  Add each variable from your `.env` file. 
    *   **Important**: For a Vite app, these must be available at **Build Time**.
    *   If you are using **Cloudflare Pages**, these are added as "Environment Variables".
    *   If you are using **Workers** with GitHub Actions, you need to add them as "Secrets" in your GitHub Repository Settings (Settings > Secrets and variables > Actions), and update your workflow file to pass them to the build command.

### Variables to Add:
*   `VITE_FIREBASE_API_KEY`
*   `VITE_FIREBASE_AUTH_DOMAIN`
*   `VITE_FIREBASE_PROJECT_ID`
*   `VITE_FIREBASE_STORAGE_BUCKET`
*   `VITE_FIREBASE_MESSAGING_SENDER_ID`
*   `VITE_FIREBASE_APP_ID`
*   `VITE_FIREBASE_MEASUREMENT_ID`

## Step 3: Trigger a New Build
Once the variables are saved:
1.  Go to the **Deployments** tab.
2.  Trigger a new deployment (or push a new commit to GitHub).
3.  The build process will now be able to read these variables and bake them into your application.
