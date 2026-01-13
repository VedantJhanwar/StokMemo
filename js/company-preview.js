// StokMemo - Company Preview Page
import { GoogleGenerativeAI } from '@google/generative-ai';

document.addEventListener('DOMContentLoaded', () => {
  // Get company ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const companyId = urlParams.get('id');

  if (!companyId) {
    window.location.href = 'search.html';
    return;
  }

  // Get company data (from data.js global)
  if (typeof getCompany !== 'function') {
    console.error('getCompany not found. Ensure data.js is loaded.');
    return;
  }
  const company = getCompany(companyId);

  if (!company) {
    window.location.href = 'search.html';
    return;
  }

  displayCompanyPreview(company);
});

function displayCompanyPreview(company) {
  const container = document.getElementById('companyPreview');

  container.innerHTML = `
    <div class="animate-fadeIn">
      <!-- Company Header Card -->
      <div style="background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); padding: 3rem; margin-bottom: 2rem; backdrop-filter: blur(10px);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="font-size: 72px; margin-bottom: 1rem;">${company.logo}</div>
          <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-secondary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            ${company.name}
          </h1>
          <div style="display: flex; gap: 1.5rem; justify-content: center; align-items: center; margin-top: 1rem; flex-wrap: wrap;">
            <span style="display: inline-flex; align-items: center; gap: 0.5rem; color: var(--color-text-secondary); font-size: var(--font-size-lg);">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
              </svg>
              ${company.ticker}
            </span>
            <span style="color: var(--color-text-tertiary);">•</span>
            <span style="display: inline-flex; align-items: center; gap: 0.5rem; color: var(--color-text-secondary); font-size: var(--font-size-lg);">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              ${company.sector}
            </span>
            <span style="color: var(--color-text-tertiary);">•</span>
            <span style="display: inline-flex; align-items: center; gap: 0.5rem; color: var(--color-text-secondary); font-size: var(--font-size-lg);">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              ${company.exchange || 'Stock Exchange'}
            </span>
          </div>
        </div>
      </div>

      <!-- What You'll Get Section -->
      <div style="background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); padding: 2.5rem; margin-bottom: 2rem; backdrop-filter: blur(10px);">
        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; color: var(--color-text-primary);">
          📋 What You'll Get
        </h2>
        <div style="display: grid; gap: 1rem;">
          <div style="display: flex; gap: 1rem; align-items: start;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: 600; font-size: 0.875rem;">1</div>
            <div>
              <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">Business Snapshot</div>
              <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">Key facts about operations, revenue, and market position</div>
            </div>
          </div>
          <div style="display: flex; gap: 1rem; align-items: start;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: 600; font-size: 0.875rem;">2</div>
            <div>
              <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">Core Investment Thesis</div>
              <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">Why this investment could work - key opportunities</div>
            </div>
          </div>
          <div style="display: flex; gap: 1rem; align-items: start;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: 600; font-size: 0.875rem;">3</div>
            <div>
              <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">Key Risks</div>
              <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">Material risks and challenges facing the business</div>
            </div>
          </div>
          <div style="display: flex; gap: 1rem; align-items: start;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: 600; font-size: 0.875rem;">4</div>
            <div>
              <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">Valuation Sanity Check</div>
              <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">High-level valuation perspective vs peers</div>
            </div>
          </div>
          <div style="display: flex; gap: 1rem; align-items: start;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: 600; font-size: 0.875rem;">5</div>
            <div>
              <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">What Would Change the View</div>
              <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">Specific triggers that would alter the investment case</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Generate Button -->
      <div style="text-align: center; margin-top: 3rem;">
        <button id="generateBtn" class="btn btn-primary btn-large" style="font-size: 1.125rem; padding: 1rem 3rem;">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Generate Investment Memo
        </button>
        <div style="margin-top: 1rem;">
          <a href="search.html" style="color: var(--color-text-secondary); font-size: var(--font-size-sm); text-decoration: none; opacity: 0.7; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">
            ← Back to search
          </a>
        </div>
      </div>
      
      <!-- Easy Mode Settings -->
      <div id="easyModeSettings" style="margin-top: 4rem; padding: 2rem; background: rgba(255,255,255,0.03); border: 1px dashed var(--glass-border); border-radius: var(--radius-lg); text-align: center;">
        <h3 style="font-size: 1rem; color: var(--color-text-secondary); margin-bottom: 0.5rem;">✨ Easy Mode (No Server Needed)</h3>
        <p style="font-size: 0.875rem; color: var(--color-text-tertiary); margin-bottom: 1.5rem;">Running directly from your browser. No black windows required.</p>
        <div id="apiKeySection">
            <button id="setupKeyBtn" class="btn btn-secondary btn-sm" style="font-size: 0.75rem;">Change API Key</button>
        </div>
      </div>
    </div>
  `;

  // Re-attach event listeners after direct HTML injection
  document.getElementById('generateBtn').onclick = () => generateMemo(company);
  document.getElementById('setupKeyBtn').onclick = () => setupApiKey();
}

// Global state for easy mode
let USER_API_KEY = localStorage.getItem('STOKMEMO_API_KEY') || '';

async function setupApiKey() {
  const newKey = prompt('Paste your Gemini API Key here (it will be saved only in your browser):', USER_API_KEY);
  if (newKey !== null) {
    USER_API_KEY = newKey.trim();
    localStorage.setItem('STOKMEMO_API_KEY', USER_API_KEY);
    alert('API Key saved! You can now generate memos without the server.');
  }
}

async function generateMemo(company) {
  const generateBtn = document.getElementById('generateBtn');
  const originalHTML = generateBtn.innerHTML;
  generateBtn.disabled = true;
  generateBtn.innerHTML = '<div class="spinner" style="width: 24px; height: 24px; border-width: 2px; margin: 0 auto;"></div>';

  // Step 1: Check if server is running
  let useServer = false;
  try {
    const checkServer = await fetch('/api/generate-memo', { method: 'OPTIONS' }).catch(() => null);
    if (checkServer && checkServer.ok) useServer = true;
  } catch (e) { }

  if (useServer) {
    // ... Original backend call logic ... (shortened for clarity but I should keep it robust)
    try {
      const response = await fetch('/api/generate-memo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: company.ticker,
          companyName: company.name,
          sector: company.sector
        })
      });

      if (response.ok) {
        const data = await response.json();
        processMemoResult(company, data.memo, false);
        return;
      }
    } catch (e) {
      console.log('Server failed, falling back to Easy Mode...');
    }
  }

  // Step 2: Easy Mode (Direct Browser Generation)
  if (!USER_API_KEY) {
    alert('⚠️ AI SETUP REQUIRED\n\nSince the server is not running, please click "Change API Key" at the bottom to paste your key directly. No black window needed!');
    generateBtn.innerHTML = originalHTML;
    generateBtn.disabled = false;
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(USER_API_KEY);
    const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash-exp'];
    let text = '';
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`🤖 Easy Mode: Trying model ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const prompt = getMemoPrompt(company);
        const result = await model.generateContent(prompt);
        text = result.response.text();
        break; // Success!
      } catch (err) {
        lastError = err;
        console.warn(`Model ${modelName} failed:`, err);
      }
    }

    if (!text && lastError) throw lastError;

    // Clean and parse JSON
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const memo = JSON.parse(text);

    processMemoResult(company, memo, false);

  } catch (error) {
    console.error('Easy Mode Error:', error);
    alert(`⚠️ AI GENERATION FAILED\n\nError: ${error.message}\n\nMake sure your API key is correct and you have internet access.`);
    generateBtn.innerHTML = originalHTML;
    generateBtn.disabled = false;
  }
}

function processMemoResult(company, memo, isDemo) {
  sessionStorage.setItem('currentMemo', JSON.stringify({
    company: {
      name: company.name,
      ticker: company.ticker,
      sector: company.sector,
      exchange: company.exchange,
      logo: company.logo
    },
    memo: memo,
    generated: new Date().toISOString(),
    isDemo: isDemo
  }));
  window.location.href = 'memo.html';
}

function getMemoPrompt(company) {
  return `Generate a professional, citation-backed investment memo for ${company.name} (${company.ticker}).

REQUIRED OUTPUT STRUCTURE (VALID JSON ONLY):
{
  "businessSnapshot": [
    {"text": "Fact about business...", "citation": "Source"},
    {"text": "Key segment info...", "citation": "Source"}
  ],
  "coreThesis": [
    {"text": "Thesis point 1...", "citation": "Source"},
    {"text": "Thesis point 2...", "citation": "Source"},
    {"text": "Thesis point 3...", "citation": "Source"}
  ],
  "keyRisks": [
    {"text": "Risk 1...", "citation": "Source"},
    {"text": "Risk 2...", "citation": "Source"},
    {"text": "Risk 3...", "citation": "Source"},
    {"text": "Risk 4...", "citation": "Source"},
    {"text": "Risk 5...", "citation": "Source"}
  ],
  "valuationCheck": {
    "text": "Qualitative valuation (expensive/cheap/fair) vs peers. No price targets.",
    "citation": "Source"
  },
  "changeView": [
    {"text": "Trigger 1...", "citation": "Source"},
    {"text": "Trigger 2...", "citation": "Source"},
    {"text": "Trigger 3...", "citation": "Source"}
  ]
}

- Professional tone.
- One bullet point per item.
- Every claim MUST have a citation.
- If data missing, write "Not disclosed".
- Output JSON ONLY.`;
}
