// Stock2Memo - Memo Display Logic

document.addEventListener('DOMContentLoaded', () => {
  // Get memo data from session storage (populated by API call)
  const memoDataStr = sessionStorage.getItem('currentMemo');

  if (!memoDataStr) {
    // No memo data, redirect to search
    window.location.href = 'search.html';
    return;
  }

  try {
    const memoData = JSON.parse(memoDataStr);

    // Display loading state briefly
    showLoading();

    setTimeout(() => {
      displayMemo(memoData.company, memoData.memo, memoData.isDemo);
    }, 800);

  } catch (error) {
    console.error('Error loading memo:', error);
    window.location.href = 'search.html';
  }
});

// Show loading state
function showLoading() {
  const container = document.getElementById('memoContent');
  container.innerHTML = `
    <div class="loading-container">
      <div class="spinner"></div>
      <div class="loading-text">Analyzing company disclosures...</div>
      <div class="loading-subtext">Extracting insights from annual reports and earnings calls</div>
    </div>
  `;
}

// Display memo
function displayMemo(company, memo, isDemo) {
  const container = document.getElementById('memoContent');

  const demoWarning = isDemo ? `
    <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #000; padding: 1rem; border-radius: var(--radius-lg); margin-bottom: 2rem; text-align: center;">
      <strong>📋 DEMO MODE</strong> - This is a simulated memo. For real AI-generated analysis, follow setup in README.md
    </div>
  ` : '';

  container.innerHTML = `
    <div class="memo-container animate-fadeIn">
      ${demoWarning}
      <div class="memo-header" style="border-bottom: 1px solid var(--color-border); padding-bottom: 2rem; margin-bottom: 3rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 2rem;">
            <div>
                <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -1px;">${company.name}</h1>
                <div style="font-family: var(--font-mono); color: var(--color-text-secondary); font-size: 1rem;">
                    ${company.ticker} • ${company.sector} • ${new Date().toLocaleDateString()}
                </div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 0.875rem; color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Verdicts</div>
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                     <span class="citation" style="font-size: 1rem; padding: 0.25rem 0.75rem; ${getValuationColor(memo.valuation.score)}">
                        ${memo.valuation.assessment.toUpperCase()}
                     </span>
                     <span class="citation" style="font-size: 1rem; padding: 0.25rem 0.75rem; ${getBigVerdictColor(memo.decision.verdict)}">
                        ${memo.decision.verdict.toUpperCase()}
                     </span>
                </div>
            </div>
        </div>
      </div>
      
      <!-- Section 1: Business Model (Grid) -->
      <div class="memo-section">
        <h3 class="memo-section-title">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            Business Model & Economics
        </h3>
        <p style="color: var(--color-text-secondary); margin-bottom: 1.5rem; font-size: 1.1rem; line-height: 1.6;">${memo.businessModel.summary}</p>
        
        <div class="business-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            ${memo.businessModel.segments.map(seg => `
                <div style="background: var(--color-bg-tertiary); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
                    <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.5rem;">${seg.name}</div>
                    <div style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.5;">${seg.details}</div>
                </div>
            `).join('')}
        </div>
        <div style="background: rgba(56, 139, 253, 0.1); border: 1px solid rgba(56, 139, 253, 0.2); padding: 1rem; border-radius: var(--radius-md); font-size: 0.95rem; color: var(--color-text-primary);">
            <strong>Economics:</strong> ${memo.businessModel.economics}
        </div>
      </div>

      <!-- Section 2: Industry & Moat -->
      <div class="memo-section">
        <h3 class="memo-section-title">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Industry & Competitive Position
        </h3>
        <ul class="memo-list">
            <li class="memo-list-item"><strong>Structure:</strong> ${memo.industry.structure}</li>
            <li class="memo-list-item"><strong>Moat:</strong> ${memo.industry.moat}</li>
            <li class="memo-list-item"><strong>Pricing Power:</strong> ${memo.industry.pricingPower}</li>
        </ul>
      </div>

      <!-- Section 3: Performance & execution -->
      <div class="memo-section">
        <h3 class="memo-section-title">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            Performance Patterns
        </h3>
        <div style="display: grid; gap: 1rem;">
             <div class="memo-list-item">${memo.performance.trend}</div>
             <div class="memo-list-item"><strong>Execution:</strong> ${memo.performance.execution}</div>
        </div>
      </div>
      
       <!-- Section 4: Management -->
      <div class="memo-section">
        <h3 class="memo-section-title">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            Management & Allocation
        </h3>
        <div class="memo-list-item"><strong>Priorities:</strong> ${memo.management.priorities}</div>
        <div class="memo-list-item"><strong>Capital Allocation:</strong> ${memo.management.allocation}</div>
      </div>

      <!-- Section 5: Risks (Red Cards) -->
      <div class="memo-section">
        <h3 class="memo-section-title" style="color: var(--color-error);">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Key Risks & Fragilities
        </h3>
        <div style="display: grid; gap: 0.75rem;">
          ${memo.risks.map(r => `
            <div style="background: rgba(248,81,73,0.05); border-left: 3px solid var(--color-error); padding: 1rem; border-radius: 0 var(--radius-md) var(--radius-md) 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                    <strong style="color: var(--color-text-primary);">${r.type} Risk</strong>
                    <span style="font-size: 0.75rem; color: var(--color-error); border: 1px solid var(--color-error); padding: 0 4px; border-radius: 4px;">${r.severity}</span>
                </div>
                <div style="color: var(--color-text-secondary); font-size: 0.95rem;">${r.detail}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- Section 6: Valuation (Gauge) -->
      <div class="memo-section">
        <h3 class="memo-section-title">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Valuation Frame
        </h3>
        
        <div class="valuation-card" style="background: var(--color-bg-tertiary); border: 1px solid var(--color-border); padding: 2rem; border-radius: var(--radius-md); text-align: center;">
            <div style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: bold; color: var(--color-text-primary);">
                Assessment: <span style="${getValuationColor(memo.valuation.score)}">${memo.valuation.assessment}</span>
            </div>
            
            <!-- Simple CSS Gauge Bar -->
            <div style="height: 8px; width: 100%; background: #30363d; border-radius: 4px; margin-bottom: 1.5rem; position: relative; overflow: hidden;">
                <div style="
                    position: absolute; 
                    left: 0; 
                    top: 0; 
                    bottom: 0; 
                    width: ${memo.valuation.score}%; 
                    background: linear-gradient(90deg, #f85149 0%, #d29922 50%, #238636 100%);
                    transition: width 1s ease-out;
                "></div>
            </div>
            
            <p style="color: var(--color-text-secondary); line-height: 1.6;">${memo.valuation.reasoning}</p>
        </div>
      </div>
      
      <!-- Section 7: Missing Data -->
      <div class="memo-section" style="opacity: 0.8;">
        <h3 class="memo-section-title" style="font-size: 1rem; color: var(--color-text-tertiary);">
            Missing Data Points (Critical for Next Steps)
        </h3>
        <ul style="color: var(--color-text-secondary); font-size: 0.9rem; padding-left: 1.5rem;">
            ${memo.missingData.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>

       <!-- Section 8: Decision -->
      <div class="memo-section">
        <h3 class="memo-section-title">Investor Decision Check</h3>
        <div style="background: var(--color-bg-tertiary); border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden;">
            <div style="padding: 1.5rem; border-bottom: 1px solid var(--color-border);">
                <div style="font-weight: bold; margin-bottom: 1rem;">Verdict: ${memo.decision.verdict}</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <div style="color: var(--color-success); font-weight: 600; margin-bottom: 0.5rem;">The Good</div>
                        <ul style="padding-left: 1rem; color: var(--color-text-secondary);">
                             ${memo.decision.pros.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                         <div style="color: var(--color-error); font-weight: 600; margin-bottom: 0.5rem;">The Bad</div>
                         <ul style="padding-left: 1rem; color: var(--color-text-secondary);">
                             ${memo.decision.cons.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <!-- Actions -->
      <div style="margin-top: 3rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="window.print()">Print Report</button>
        <button class="btn btn-secondary" onclick="window.location.href='search.html'">Analyze Another</button>
      </div>
    </div>
  `;
}

function getValuationColor(score) {
  if (score >= 66) return "color: #238636;"; // Cheap
  if (score >= 33) return "color: #d29922;"; // Fair
  return "color: #f85149;"; // Expensive
}

function getBigVerdictColor(verdict) {
  if (verdict.toLowerCase().includes('yes')) return "background: rgba(35, 134, 54, 0.2); color: #238636; border: 1px solid #238636;";
  if (verdict.toLowerCase().includes('condition')) return "background: rgba(210, 153, 34, 0.2); color: #d29922; border: 1px solid #d29922;";
  return "background: rgba(248, 81, 73, 0.2); color: #f85149; border: 1px solid #f85149;";
}


// Print styles (injected dynamically)
const printStyles = `
  @media print {
    body {
      background: white;
      color: black;
    }
    
    body::before {
      display: none;
    }
    
    .nav, .btn {
      display: none !important;
    }
    
    .memo-container {
      box-shadow: none !important;
      border: none !important;
      background: white !important;
    }
    
    .citation {
      background: #f0f0f0 !important;
      color: #333 !important;
      border-color: #ccc !important;
    }
    
    .memo-section {
      page-break-inside: avoid;
    }
  }
`;

// Add print styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);
