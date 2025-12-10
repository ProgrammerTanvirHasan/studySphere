# Firebase Deployment Guide - Fixing API URL Issues

## Problem

Your project works on localhost but can't find data when deployed to Firebase. This is because:

1. Environment variables aren't set in Firebase Hosting
2. Some components use hardcoded URLs instead of environment variables
3. Server CORS might not include your Firebase deployment URL

## Solution Steps

### 1. Set Environment Variables in Firebase

#### Option A: Using Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (gear icon)
4. Scroll down to **Your apps** section
5. Click on your web app
6. In the **Config** section, you'll see your Firebase config
7. **For Vite projects**, you need to set environment variables during build time

#### Option B: Using .env file (For local development)

Create a `.env` file in your project root:

```env
VITE_API_URL=https://stydy-sphere-server.vercel.app
```

**Important**: `.env` files are NOT automatically deployed to Firebase. You need to set them during build.

### 2. Update Firebase Build Configuration

Since Firebase Hosting doesn't support environment variables directly for static sites, you have two options:

#### Option A: Build with Environment Variables (Recommended)

Update your build script in `package.json`:

```json
{
  "scripts": {
    "build": "VITE_API_URL=https://stydy-sphere-server.vercel.app vite build",
    "build:local": "vite build"
  }
}
```

Then deploy:

```bash
npm run build
firebase deploy
```

#### Option B: Use Firebase Functions (Advanced)

If you need dynamic environment variables, consider using Firebase Functions.

### 3. Update Server CORS Configuration

Make sure your server (the one at `https://stydy-sphere-server.vercel.app`) includes your Firebase deployment URL in CORS:

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://studysphere-cf030.web.app",
      "https://studysphere-cf030.firebaseapp.com",
      "https://stydysphereserver.onrender.com",
      // Add your Firebase deployment URL here
      "https://your-firebase-project.web.app",
      "https://your-firebase-project.firebaseapp.com",
    ],
    credentials: true,
  })
);
```

### 4. Verify Environment Variables

After deployment, check if the environment variable is being used:

1. Open your deployed site
2. Open browser console (F12)
3. Run: `console.log(import.meta.env.VITE_API_URL)`
4. It should show your API URL, not `undefined`

### 5. Common Issues and Fixes

#### Issue: `VITE_API_URL` is undefined

**Fix**: Make sure you're setting the variable during build:

```bash
VITE_API_URL=https://stydy-sphere-server.vercel.app npm run build
```

#### Issue: CORS errors in console

**Fix**: Add your Firebase URL to server CORS configuration

#### Issue: Cookies not working

**Fix**:

- Ensure `credentials: "include"` is in all fetch requests
- Server must have `credentials: true` in CORS
- Server must use `sameSite: "none"` and `secure: true` for cookies

### 6. Testing After Deployment

1. Deploy to Firebase: `firebase deploy`
2. Visit your deployed URL
3. Open browser DevTools (F12) → Network tab
4. Try logging in or fetching data
5. Check if API calls are going to the correct URL
6. Check for CORS errors in console

### 7. Quick Fix Script

Create a `deploy.sh` file:

```bash
#!/bin/bash
export VITE_API_URL=https://stydy-sphere-server.vercel.app
npm run build
firebase deploy
```

Make it executable:

```bash
chmod +x deploy.sh
./deploy.sh
```

## Summary

The main fix is ensuring `VITE_API_URL` is set during the build process. Since Firebase Hosting serves static files, environment variables must be baked into the build at build time, not runtime.

All hardcoded URLs in the codebase have been replaced with the `apiEndpoint` helper, which uses `VITE_API_URL` from environment variables.
