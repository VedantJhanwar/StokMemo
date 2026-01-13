// Stock2Memo - Search Page Logic

// Initialize search page
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('companySearch');
    const resultsContainer = document.getElementById('searchResults');

    // Initial display: show all companies
    displayCompanies(COMPANIES);

    // Search input handler with debounce
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value.trim();
            const results = searchCompanies(query);
            displayCompanies(results);
        }, 300);
    });
});

// Display company cards
function displayCompanies(companies) {
    const resultsContainer = document.getElementById('searchResults');

    if (companies.length === 0) {
        const searchValue = document.getElementById('companySearch').value.trim();
        resultsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; background: var(--glass-bg); border-radius: var(--radius-xl); border: 1px solid var(--glass-border);">
        <div style="font-size: 48px; margin-bottom: 1rem;">🔍</div>
        <p style="font-size: var(--font-size-xl); color: var(--color-text-primary); margin-bottom: 1rem;">
          "${searchValue}" not available yet
        </p>
        <p style="font-size: var(--font-size-base); color: var(--color-text-secondary); max-width: 500px; margin: 0 auto;">
          We currently have <strong>8 companies</strong> available in this demo. Try searching for:
          <strong style="color: var(--color-accent-primary);">Apple, Microsoft, Google, Tesla, NVIDIA, Amazon, Meta, or Netflix</strong>
        </p>
        <p style="font-size: var(--font-size-sm); color: var(--color-text-tertiary); margin-top: 1.5rem;">
          In production, you'd be able to search any public company and get an instant memo generated.
        </p>
      </div>
    `;
        return;
    }


    resultsContainer.innerHTML = companies.map(company => `
    <div class="company-card" 
         data-company-id="${company.id}"
         onclick="window.location.href='company-preview.html?id=${company.id}'">
      <div class="company-logo">${company.logo}</div>
      <div class="company-name">${company.name}</div>
      <div class="company-ticker">${company.ticker}</div>
      <div class="company-sector">${company.sector}</div>
    </div>
  `).join('');
}

// Demo memo generator (fallback when API not available)
function generateDemoMemo(company) {
    return {
        businessSnapshot: [
            {
                text: `${company.name} operates in the ${company.sector} sector, listed on ${company.exchange}. This is a demo memo generated without AI backend.`,
                citation: 'Demo Mode - Company Overview'
            },
            {
                text: 'To get real AI-generated memos with current financial data, follow the setup instructions in README.md',
                citation: 'Demo Mode - Setup Required'
            },
            {
                text: 'Install Node.js, get a free Gemini API key, and run "vercel dev" to enable full functionality',
                citation: 'Demo Mode - Instructions'
            },
            {
                text: 'The real system uses Google Gemini AI to analyze company filings and generate professional investment memos',
                citation: 'Demo Mode - Feature Description'
            }
        ],
        coreThesis: [
            {
                text: 'Real memos will include detailed analysis of business model, competitive positioning, and growth opportunities',
                citation: 'Demo Mode - Thesis Example'
            },
            {
                text: 'AI analyzes management commentary, financial metrics, and strategic initiatives to identify investment rationale',
                citation: 'Demo Mode - AI Analysis'
            },
            {
                text: 'Each point will be backed by specific citations from annual reports, earnings calls, and company disclosures',
                citation: 'Demo Mode - Citation System'
            }
        ],
        keyRisks: [
            {
                text: 'Real memos identify specific risks disclosed by the company in regulatory filings',
                citation: 'Demo Mode - Risk Analysis'
            },
            {
                text: 'Competitive threats, regulatory challenges, and operational risks are extracted from company statements',
                citation: 'Demo Mode - Risk Categories'
            },
            {
                text: 'Market dynamics, technological disruption, and macroeconomic factors are evaluated',
                citation: 'Demo Mode - Market Risks'
            },
            {
                text: 'Financial risks including leverage, liquidity, and capital allocation concerns are assessed',
                citation: 'Demo Mode - Financial Risks'
            },
            {
                text: 'Management execution risk and strategic uncertainty are identified from company disclosures',
                citation: 'Demo Mode - Execution Risks'
            }
        ],
        valuationCheck: {
            text: 'Real memos provide relative valuation commentary comparing the company to peers and historical averages, using qualitative language without price targets. Assumptions and limitations are clearly stated.',
            citation: 'Demo Mode - Valuation Framework'
        },
        changeView: [
            {
                text: 'Real memos identify specific metrics or events that would alter the investment thesis positively or negatively',
                citation: 'Demo Mode - Trigger Events'
            },
            {
                text: 'Concrete business milestones, financial thresholds, and competitive dynamics shifts are specified',
                citation: 'Demo Mode - Measurable Indicators'
            },
            {
                text: 'Each trigger point is grounded in company disclosures and strategic priorities',
                citation: 'Demo Mode - Source-Based Triggers'
            }
        ]
    };
}
