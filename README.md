# StokMemo - Complete Setup & Deployment Guide

## What We Built

✅ **Real-time AI memo generation** for ALL 80+ companies  
✅ **Gemini AI integration** for intelligent analysis  
✅ **Kite-style stock search** with real tickers  
✅ **Citation-backed memos** following exact specification  

---

## STEP 1: Install Node.js

**You need Node.js installed first!**

### Download & Install:
1. Go to: https://nodejs.org/
2. Download LTS version (recommended)
3. Run installer, click "Next" through all steps
4. Restart your computer

### Verify Installation:
```bash
node --version
npm --version
```
Should show version numbers.

---

## STEP 2: Get Gemini API Key (FREE)

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. **Copy the key** (save it somewhere safe)

---

## STEP 3: Install Dependencies

```bash
cd d:\Downloads\Projects\Stock2Memo
npm install
```

This installs the Gemini AI SDK.

---

## STEP 4: Set Up Environment Variable

Create `.env.local` file:

```bash
# In PowerShell:
cp .env.example .env.local
notepad .env.local
```

Paste your Gemini API key:
```
GEMINI_API_KEY=your_actual_key_here
```

Save and close.

---

## STEP 5: Test Locally

```bash
# Install Vercel CLI
npm install -g vercel

# Start local development server
vercel dev
```

Visit: http://localhost:3000

Try searching for:
- Apple (AAPL)
- Coca-Cola (KO)
- Reliance (RELIANCE)
- Any company!

Click "Generate Memo" - it should take 5-10 seconds to generate with AI.

---

## STEP 6: Deploy to Vercel (Optional - Makes it Live)

```bash
# Login
vercel login

# Deploy
vercel

# Add API key to production
vercel env add GEMINI_API_KEY production
# (Paste your API key when prompted)

# Deploy to production
vercel --prod
```

You'll get a live URL like: `https://stokmemo.vercel.app`

---

## How It Works

1. **User searches** → Finds company from 80+ stocks
2. **Clicks "Generate Memo"** → Frontend calls `/api/generate-memo`
3. **Vercel serverless function** → Uses Gemini AI to analyze
4. **AI generates memo** → Following exact 5-section spec
5. **Displays on screen** → With citations and professional formatting

---

## Costs

- ✅ **Gemini AI**: FREE (60 requests/min)
- ✅ **Vercel Hosting**: FREE (100GB bandwidth/month)
- ✅ **TOTAL**: $0/month

---

## Troubleshooting

### "npm not found"
→ Install Node.js from nodejs.org

### "API key invalid" 
→ Double-check your key from makersuite.google.com

### "Memo generation fails"
→ Check internet connection
→ Verify `.env.local` has correct API key
→ Try again (sometimes Gemini has temporary issues)

### "Generation takes too long"
→ Normal: 5-10 seconds
→ If >30 seconds: Gemini API might be slow, try again

---

## What You Can Do Now

✅ Generate memos for ANY of the 80+ companies  
✅ Search by name or ticker (like Kite app)  
✅ Get real-time AI analysis  
✅ Export/print memos  
✅ Share with investors  

---

## Next Steps (Optional Enhancements)

1. **Add more companies** → Edit `js/data.js`
2. **Add caching** → Store generated memos in database
3. **Add analytics** → Track which companies get analyzed
4. **Add user accounts** → Save favorite memos
5. **Connect financial APIs** → Get real-time stock data

---

## Support

If you get stuck:
1. Check this guide again
2. Verify Node.js is installed
3. Verify Gemini API key is correct
4. Try `vercel dev` to test locally first

The system is ready to go! Just need Node.js + Gemini API key.
