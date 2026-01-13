// StokMemo - Company Database & Investment Memos

// Comprehensive stock database with 80+ real companies
// Only 8 have full memos (marked with hasMemo: true)
const ALL_COMPANIES = [
  // Tech - With Full Memos
  { id: 'aapl', name: 'Apple Inc.', ticker: 'AAPL', exchange: 'NASDAQ', sector: 'Technology', logo: '🍎', hasMemo: true },
  { id: 'msft', name: 'Microsoft Corporation', ticker: 'MSFT', exchange: 'NASDAQ', sector: 'Technology', logo: '🪟', hasMemo: true },
  { id: 'googl', name: 'Alphabet Inc.', ticker: 'GOOGL', exchange: 'NASDAQ', sector: 'Technology', logo: '🔍', hasMemo: true },
  { id: 'tsla', name: 'Tesla Inc.', ticker: 'TSLA', exchange: 'NASDAQ', sector: 'Automotive', logo: '⚡', hasMemo: true },
  { id: 'nvda', name: 'NVIDIA Corporation', ticker: 'NVDA', exchange: 'NASDAQ', sector: 'Semiconductors', logo: '🎮', hasMemo: true },
  { id: 'amzn', name: 'Amazon.com Inc.', ticker: 'AMZN', exchange: 'NASDAQ', sector: 'E-commerce', logo: '📦', hasMemo: true },
  { id: 'meta', name: 'Meta Platforms Inc.', ticker: 'META', exchange: 'NASDAQ', sector: 'Social Media', logo: '👥', hasMemo: true },
  { id: 'nflx', name: 'Netflix Inc.', ticker: 'NFLX', exchange: 'NASDAQ', sector: 'Streaming', logo: '🎬', hasMemo: true },

  // Tech - No Memos
  { id: 'orcl', name: 'Oracle Corporation', ticker: 'ORCL', exchange: 'NYSE', sector: 'Software', logo: '🔴' },
  { id: 'adbe', name: 'Adobe Inc.', ticker: 'ADBE', exchange: 'NASDAQ', sector: 'Software', logo: '🎨' },
  { id: 'crm', name: 'Salesforce Inc.', ticker: 'CRM', exchange: 'NYSE', sector: 'Cloud', logo: '☁️' },
  { id: 'intc', name: 'Intel Corporation', ticker: 'INTC', exchange: 'NASDAQ', sector: 'Semiconductors', logo: '💻' },
  { id: 'amd', name: 'Advanced Micro Devices', ticker: 'AMD', exchange: 'NASDAQ', sector: 'Semiconductors', logo: '🔧' },
  { id: 'csco', name: 'Cisco Systems Inc.', ticker: 'CSCO', exchange: 'NASDAQ', sector: 'Networking', logo: '🌐' },
  { id: 'ibm', name: 'IBM Corporation', ticker: 'IBM', exchange: 'NYSE', sector: 'Technology', logo: '💼' },

  // Finance
  { id: 'jpm', name: 'JPMorgan Chase & Co.', ticker: 'JPM', exchange: 'NYSE', sector: 'Banking', logo: '🏦' },
  { id: 'bac', name: 'Bank of America Corp.', ticker: 'BAC', exchange: 'NYSE', sector: 'Banking', logo: '🏦' },
  { id: 'wfc', name: 'Wells Fargo & Company', ticker: 'WFC', exchange: 'NYSE', sector: 'Banking', logo: '🏦' },
  { id: 'gs', name: 'Goldman Sachs Group', ticker: 'GS', exchange: 'NYSE', sector: 'Banking', logo: '💰' },
  { id: 'ms', name: 'Morgan Stanley', ticker: 'MS', exchange: 'NYSE', sector: 'Banking', logo: '💰' },
  { id: 'v', name: 'Visa Inc.', ticker: 'V', exchange: 'NYSE', sector: 'Payments', logo: '💳' },
  { id: 'ma', name: 'Mastercard Inc.', ticker: 'MA', exchange: 'NYSE', sector: 'Payments', logo: '💳' },
  { id: 'pypl', name: 'PayPal Holdings Inc.', ticker: 'PYPL', exchange: 'NASDAQ', sector: 'Fintech', logo: '💸' },

  // Healthcare
  { id: 'jnj', name: 'Johnson & Johnson', ticker: 'JNJ', exchange: 'NYSE', sector: 'Pharma', logo: '💊' },
  { id: 'pfe', name: 'Pfizer Inc.', ticker: 'PFE', exchange: 'NYSE', sector: 'Pharma', logo: '💊' },
  { id: 'abbv', name: 'AbbVie Inc.', ticker: 'ABBV', exchange: 'NYSE', sector: 'Pharma', logo: '💊' },
  { id: 'mrk', name: 'Merck & Co. Inc.', ticker: 'MRK', exchange: 'NYSE', sector: 'Pharma', logo: '💊' },
  { id: 'unh', name: 'UnitedHealth Group', ticker: 'UNH', exchange: 'NYSE', sector: 'Healthcare', logo: '🏥' },

  // Consumer
  { id: 'wmt', name: 'Walmart Inc.', ticker: 'WMT', exchange: 'NYSE', sector: 'Retail', logo: '🛒' },
  { id: 'hd', name: 'Home Depot Inc.', ticker: 'HD', exchange: 'NYSE', sector: 'Retail', logo: '🔨' },
  { id: 'pg', name: 'Procter & Gamble Co.', ticker: 'PG', exchange: 'NYSE', sector: 'Consumer Goods', logo: '🧴' },
  { id: 'ko', name: 'Coca-Cola Company', ticker: 'KO', exchange: 'NYSE', sector: 'Beverages', logo: '🥤' },
  { id: 'pep', name: 'PepsiCo Inc.', ticker: 'PEP', exchange: 'NASDAQ', sector: 'Beverages', logo: '🥤' },
  { id: 'cost', name: 'Costco Wholesale', ticker: 'COST', exchange: 'NASDAQ', sector: 'Retail', logo: '🛒' },
  { id: 'nke', name: 'Nike Inc.', ticker: 'NKE', exchange: 'NYSE', sector: 'Apparel', logo: '👟' },
  { id: 'sbux', name: 'Starbucks Corporation', ticker: 'SBUX', exchange: 'NASDAQ', sector: 'Restaurants', logo: '☕' },
  { id: 'mcd', name: 'McDonald\'s Corporation', ticker: 'MCD', exchange: 'NYSE', sector: 'Restaurants', logo: '🍔' },

  // Energy
  { id: 'xom', name: 'Exxon Mobil Corporation', ticker: 'XOM', exchange: 'NYSE', sector: 'Energy', logo: '⛽' },
  { id: 'cvx', name: 'Chevron Corporation', ticker: 'CVX', exchange: 'NYSE', sector: 'Energy', logo: '⛽' },

  // Telecom & Media
  { id: 't', name: 'AT&T Inc.', ticker: 'T', exchange: 'NYSE', sector: 'Telecom', logo: '📱' },
  { id: 'vz', name: 'Verizon Communications', ticker: 'VZ', exchange: 'NYSE', sector: 'Telecom', logo: '📱' },
  { id: 'dis', name: 'Walt Disney Company', ticker: 'DIS', exchange: 'NYSE', sector: 'Media', logo: '🏰' },
  { id: 'cmcsa', name: 'Comcast Corporation', ticker: 'CMCSA', exchange: 'NASDAQ', sector: 'Media', logo: '📺' },

  // Indian Stocks (NSE)
  { id: 'reliance', name: 'Reliance Industries', ticker: 'RELIANCE', exchange: 'NSE', sector: 'Conglomerate', logo: '🏭' },
  { id: 'tcs', name: 'Tata Consultancy Services', ticker: 'TCS', exchange: 'NSE', sector: 'IT', logo: '💻' },
  { id: 'infy', name: 'Infosys Ltd.', ticker: 'INFY', exchange: 'NSE', sector: 'IT', logo: '💻' },
  { id: 'hdfc', name: 'HDFC Bank', ticker: 'HDFCBANK', exchange: 'NSE', sector: 'Banking', logo: '🏦' },
  { id: 'icici', name: 'ICICI Bank', ticker: 'ICICIBANK', exchange: 'NSE', sector: 'Banking', logo: '🏦' },
  { id: 'bharti', name: 'Bharti Airtel', ticker: 'BHARTIARTL', exchange: 'NSE', sector: 'Telecom', logo: '📱' },
  { id: 'itc', name: 'ITC Ltd.', ticker: 'ITC', exchange: 'NSE', sector: 'FMCG', logo: '🏪' },
  { id: 'wipro', name: 'Wipro Ltd.', ticker: 'WIPRO', exchange: 'NSE', sector: 'IT', logo: '💻' },
  { id: 'hcltech', name: 'HCL Technologies', ticker: 'HCLTECH', exchange: 'NSE', sector: 'IT', logo: '💻' },
  { id: 'sbin', name: 'State Bank of India', ticker: 'SBIN', exchange: 'NSE', sector: 'Banking', logo: '🏦' },
  { id: 'tatamotors', name: 'Tata Motors', ticker: 'TATAMOTORS', exchange: 'NSE', sector: 'Auto', logo: '🚗' },
  { id: 'maruti', name: 'Maruti Suzuki', ticker: 'MARUTI', exchange: 'NSE', sector: 'Auto', logo: '🚗' },

  // More US
  { id: 'ba', name: 'Boeing Company', ticker: 'BA', exchange: 'NYSE', sector: 'Aerospace', logo: '✈️' },
  { id: 'cat', name: 'Caterpillar Inc.', ticker: 'CAT', exchange: 'NYSE', sector: 'Machinery', logo: '🚜' },
  { id: 'ge', name: 'General Electric', ticker: 'GE', exchange: 'NYSE', sector: 'Conglomerate', logo: '⚡' },
  { id: 'f', name: 'Ford Motor Company', ticker: 'F', exchange: 'NYSE', sector: 'Auto', logo: '🚗' },
  { id: 'gm', name: 'General Motors', ticker: 'GM', exchange: 'NYSE', sector: 'Auto', logo: '🚗' },
  { id: 'uber', name: 'Uber Technologies', ticker: 'UBER', exchange: 'NYSE', sector: 'Ridesharing', logo: '🚕' },
  { id: 'abnb', name: 'Airbnb Inc.', ticker: 'ABNB', exchange: 'NASDAQ', sector: 'Travel', logo: '🏠' },
  { id: 'sq', name: 'Block Inc.', ticker: 'SQ', exchange: 'NYSE', sector: 'Fintech', logo: '💳' },
  { id: 'shop', name: 'Shopify Inc.', ticker: 'SHOP', exchange: 'NYSE', sector: 'E-commerce', logo: '🛍️' },
  { id: 'snap', name: 'Snap Inc.', ticker: 'SNAP', exchange: 'NYSE', sector: 'Social Media', logo: '👻' },
  { id: 'spot', name: 'Spotify Technology', ticker: 'SPOT', exchange: 'NYSE', sector: 'Music', logo: '🎵' },
  { id: 'zm', name: 'Zoom Video', ticker: 'ZM', exchange: 'NASDAQ', sector: 'Software', logo: '📹' },
];

const COMPANIES = ALL_COMPANIES;

// Search functionality
function searchCompanies(query) {
  if (!query) return COMPANIES;

  const lowerQuery = query.toLowerCase();
  return COMPANIES.filter(company =>
    company.name.toLowerCase().includes(lowerQuery) ||
    company.ticker.toLowerCase().includes(lowerQuery) ||
    company.sector.toLowerCase().includes(lowerQuery)
  );
}

// Get company by ID
function getCompany(id) {
  return COMPANIES.find(company => company.id === id);
}
