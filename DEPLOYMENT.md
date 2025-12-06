# Deployment Guide - Vercel

## Prerequisites
- Vercel account (you can use Google to sign up)
- Node.js installed
- Project built successfully

## Option 1: Deploy via Vercel CLI (Recommended)

### Step 1: Install Vercel CLI globally
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
This will open your browser - select **"Continue with Google"** to log in.

### Step 3: Deploy from project root
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (first time)
- **Project name?** → cursor-2025-prediction-market (or your choice)
- **Directory?** → ./ (current directory)
- **Override settings?** → No

### Step 4: Add Environment Variables
After first deployment, add your API keys:

```bash
vercel env add VITE_APIFY_API_KEY
vercel env add VITE_ETHERSCAN_API_KEY
vercel env add VITE_LINDY_API_KEY
```

For each variable:
- **Value?** → Paste the API key
- **Environment?** → Select "Production", "Preview", and "Development" (all)

### Step 5: Redeploy with environment variables
```bash
vercel --prod
```

## Option 2: Deploy via Vercel Dashboard (Web UI)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Continue with Google"**
3. Click **"Import Project"**
4. Select your GitHub repository
5. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Step 3: Add Environment Variables in Dashboard
1. Go to your project → **Settings** → **Environment Variables**
2. Add these variables:
   - `VITE_APIFY_API_KEY` = (your Apify API key)
   - `VITE_ETHERSCAN_API_KEY` = `X4BPCXS9KYCRECS5S34PEAUA6YXYGJ9727`
   - `VITE_LINDY_API_KEY` = `50AGENTS`
3. Select **Production**, **Preview**, and **Development** for all

### Step 4: Deploy
Click **"Deploy"** and wait for the build to complete.

## Environment Variables

Make sure to add these in Vercel dashboard or CLI:

```env
VITE_APIFY_API_KEY=your_apify_api_key_here
VITE_ETHERSCAN_API_KEY=X4BPCXS9KYCRECS5S34PEAUA6YXYGJ9727
VITE_LINDY_API_KEY=50AGENTS
```

## Deployment URL

After deployment, you'll get URLs like:
- **Production:** `https://cursor-2025-prediction-market.vercel.app`
- **Preview:** `https://cursor-2025-prediction-market-<hash>.vercel.app`

## Troubleshooting

### Build Fails
- Check that `npm run build` works locally
- Verify all dependencies are in `package.json`
- Check Node.js version compatibility

### Environment Variables Not Working
- Ensure variables start with `VITE_` prefix
- Redeploy after adding variables
- Check variable names match exactly

### Routing Issues (404 on refresh)
- The `vercel.json` file handles this with SPA rewrites
- All routes redirect to `/index.html`

## Custom Domain (Optional)

1. Go to Project → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

## Commands Quick Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (development)
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]
```

## Next Steps After Deployment

1. ✅ Test all routes work correctly
2. ✅ Verify API integrations (Etherscan, Lindy, Apify)
3. ✅ Check market predictions are updating
4. ✅ Test news aggregation from Twitter, YouTube, RedNote
5. ✅ Verify responsive design on mobile
6. ✅ Set up custom domain (optional)
7. ✅ Configure analytics (optional)

---

**Ready to deploy? Let me know if you want to use CLI or web dashboard!**

