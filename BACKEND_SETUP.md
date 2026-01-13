# Backend Setup - Step by Step Guide

## ⚠️ Node.js is NOT Installed

You need to install Node.js first before the backend can work.

---

## STEP 1: Install Node.js

### Download & Install:
1. **Download Link**: https://nodejs.org/
2. Click the **LTS version** button (recommended - e.g., v20.x.x)
3. Run the installer
4. Click "Next" through all steps (use default settings)
5. **IMPORTANT**: Restart your computer after installation

### Verify Installation:
After restarting, open PowerShell and run:
```powershell
node --version
npm --version
```

You should see version numbers (e.g., v20.11.0 and 10.2.4)

---

## STEP 2: Get Gemini API Key (FREE)

1. Go to: **https://makersuite.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. **Copy the entire key** (starts with "AIza...")
5. Save it somewhere safe (you'll need it in Step 4)

---

## STEP 3: Install Dependencies

Open PowerShell in the project folder and run:

```powershell
cd d:\Downloads\Projects\Stock2Memo
npm install
```

This installs the Gemini AI SDK (~30 seconds)

---

## STEP 4: Add Your API Key

Create a file called `.env.local` in the project folder:

```powershell
# Copy the template
cp .env.example .env.local

# Open in notepad
notepad .env.local
```

Replace `your_gemini_api_key_here` with your actual API key:
```
GEMINI_API_KEY=AIzaSyC-XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Save and close the file.

---

## STEP 5: Start the Server

```powershell
# Install Vercel CLI (one-time)
npm install -g vercel

# Start development server
vercel dev
```

When prompted:
- **Set up and deploy?** → Choose **N** (No)
- It will start the local server

You'll see:
```
Ready! Available at http://localhost:3000
```

---

## STEP 6: Test It!

1. Open browser → http://localhost:3000
2. Click "Search Companies"
3. Click on any company (e.g., Apple)
4. Click "Generate Investment Memo"
5. Wait 5-10 seconds
6. **Real AI-generated memo appears!** 🎉

---

## What's Happening

The backend is now:
- ✅ Running a local server on port 3000
- ✅ Calling Gemini AI when you generate a memo
- ✅ Analyzing the company using AI
- ✅ Generating professional investment memos
- ✅ **NO more demo mode!**

---

## Troubleshooting

### "vercel: command not found"
→ Run: `npm install -g vercel` first

### "Port 3000 already in use"
→ Kill the process using port 3000 or use: `vercel dev --listen 3001`

### "Invalid API key"
→ Double-check your key in `.env.local` matches exactly from Google AI Studio

### Generation fails
→ Check internet connection
→ Verify Gemini API key is correct
→ Try again (sometimes Gemini has temporary issues)

---

## Next Step

**👉 START HERE**: Install Node.js from https://nodejs.org/

Then come back and follow Steps 2-6!
