export const INITIAL_ACCOUNTS = [
  { id: 'acc-1', name: 'Main Checking', balance: 12480.50, type: 'Checking', bank: 'Apex Bank', color: '#10b981' },
  { id: 'acc-2', name: 'High-Yield Savings', balance: 34250.00, type: 'Savings', bank: 'Vanguard Yield', color: '#3b82f6' },
  { id: 'acc-3', name: 'Investment Portfolio', balance: 68900.75, type: 'Investment', bank: 'Fidelity Brokerage', color: '#8b5cf6' },
  { id: 'acc-4', name: 'Crypto Reserve', balance: 8420.30, type: 'Crypto', bank: 'Coinbase', color: '#f59e0b' },
  { id: 'acc-5', name: 'Rewards Credit Card', balance: -1240.20, type: 'Credit', bank: 'Sapphire Preferred', color: '#ef4444' }
];

export const INITIAL_TRANSACTIONS = [
  { id: 'tx-1', date: '2026-09-08', description: 'Tech Global Inc - Monthly Salary', category: 'Salary', type: 'income', amount: 6500.00, account: 'Main Checking', vendor: 'Tech Global', note: 'Direct deposit salary payout' },
  { id: 'tx-2', date: '2026-09-07', description: 'Whole Foods Organic Market', category: 'Food & Dining', type: 'expense', amount: 142.85, account: 'Rewards Credit Card', vendor: 'Whole Foods', note: 'Weekly groceries' },
  { id: 'tx-3', date: '2026-09-06', description: 'Apex Luxury Apartment Rent', category: 'Housing', type: 'expense', amount: 1450.00, account: 'Main Checking', vendor: 'Apex Properties', note: 'September rent auto-debit' },
  { id: 'tx-4', date: '2026-09-05', description: 'Freelance UX Design Client', category: 'Freelance', type: 'income', amount: 1250.00, account: 'Main Checking', vendor: 'Stripe Payout', note: 'Website redesign project milestone' },
  { id: 'tx-5', date: '2026-09-04', description: 'Chevron Station Gas & Fuel', category: 'Transportation', type: 'expense', amount: 58.40, account: 'Rewards Credit Card', vendor: 'Chevron', note: 'Full tank refill' },
  { id: 'tx-6', date: '2026-09-03', description: 'ChatGPT Plus & OpenAI API', category: 'Tech & Utilities', type: 'expense', amount: 20.00, account: 'Rewards Credit Card', vendor: 'OpenAI', note: 'AI tools monthly subscription' },
  { id: 'tx-7', date: '2026-09-02', description: 'Vanguard S&P 500 Index Fund', category: 'Investments', type: 'expense', amount: 800.00, account: 'High-Yield Savings', vendor: 'Vanguard', note: 'Automated monthly investment' },
  { id: 'tx-8', date: '2026-09-01', description: 'Equinox Fitness Club', category: 'Health & Wellness', type: 'expense', amount: 185.00, account: 'Rewards Credit Card', vendor: 'Equinox', note: 'Gym membership fee' },
  { id: 'tx-9', date: '2026-08-30', description: 'Starbucks Coffee & Snacks', category: 'Food & Dining', type: 'expense', amount: 18.75, account: 'Rewards Credit Card', vendor: 'Starbucks', note: 'Morning meeting coffee' },
  { id: 'tx-10', date: '2026-08-28', description: 'Amazon Electronics & Accessories', category: 'Shopping & Style', type: 'expense', amount: 245.99, account: 'Rewards Credit Card', vendor: 'Amazon', note: 'Ergonomic mouse & USB-C hub' },
  { id: 'tx-11', date: '2026-08-26', description: 'City Power & Electric Utility', category: 'Tech & Utilities', type: 'expense', amount: 112.30, account: 'Main Checking', vendor: 'City Electric', note: 'Electric utility bill' },
  { id: 'tx-12', date: '2026-08-25', description: 'Apple Services (iCloud + Music)', category: 'Tech & Utilities', type: 'expense', amount: 14.99, account: 'Rewards Credit Card', vendor: 'Apple', note: 'Cloud storage and music' },
  { id: 'tx-13', date: '2026-08-24', description: 'Stock Dividend Payout (AAPL)', category: 'Investments', type: 'income', amount: 320.50, account: 'Investment Portfolio', vendor: 'Apple Inc', note: 'Q3 Quarterly dividend' },
  { id: 'tx-14', date: '2026-08-22', description: 'Sushi Omakase Dinner', category: 'Food & Dining', type: 'expense', amount: 195.00, account: 'Rewards Credit Card', vendor: 'Nobu Dining', note: 'Weekend celebration dinner' },
  { id: 'tx-15', date: '2026-08-20', description: 'Geico Auto Insurance', category: 'Transportation', type: 'expense', amount: 135.00, account: 'Main Checking', vendor: 'Geico', note: 'Monthly car insurance' }
];

export const INITIAL_BUDGETS = [
  { id: 'b-1', category: 'Housing', limit: 1500.00, color: '#6366f1' },
  { id: 'b-2', category: 'Food & Dining', limit: 600.00, color: '#10b981' },
  { id: 'b-3', category: 'Shopping & Style', limit: 400.00, color: '#f59e0b' },
  { id: 'b-4', category: 'Transportation', limit: 250.00, color: '#ec4899' },
  { id: 'b-5', category: 'Tech & Utilities', limit: 350.00, color: '#3b82f6' },
  { id: 'b-6', category: 'Health & Wellness', limit: 300.00, color: '#14b8a6' }
];

export const INITIAL_GOALS = [
  { id: 'g-1', name: '6-Month Emergency Reserve', targetAmount: 25000.00, currentAmount: 18500.00, category: 'Emergency', targetDate: '2026-12-31', color: '#10b981', icon: 'ShieldCheck' },
  { id: 'g-2', name: 'Japan Culture & Ski Trip', targetAmount: 6500.00, currentAmount: 4200.00, category: 'Travel', targetDate: '2027-02-15', color: '#ec4899', icon: 'Plane' },
  { id: 'g-3', name: 'Next-Gen EV Downpayment', targetAmount: 15000.00, currentAmount: 8900.00, category: 'Vehicle', targetDate: '2027-06-30', color: '#3b82f6', icon: 'Car' },
  { id: 'g-4', name: 'Real Estate Investment Fund', targetAmount: 50000.00, currentAmount: 22000.00, category: 'Investment', targetDate: '2028-01-01', color: '#8b5cf6', icon: 'Building' }
];

export const INITIAL_SUBSCRIPTIONS = [
  { id: 'sub-1', name: 'Netflix Premium 4K', amount: 22.99, billingCycle: 'Monthly', nextBilling: '2026-09-18', category: 'Entertainment', status: 'Active', icon: 'Tv' },
  { id: 'sub-2', name: 'Spotify Duo Family', amount: 14.99, billingCycle: 'Monthly', nextBilling: '2026-09-22', category: 'Entertainment', status: 'Active', icon: 'Music' },
  { id: 'sub-3', name: 'AWS Cloud Services', amount: 45.50, billingCycle: 'Monthly', nextBilling: '2026-09-30', category: 'Infrastructure', status: 'Active', icon: 'Cloud' },
  { id: 'sub-4', name: 'Equinox Gym Membership', amount: 185.00, billingCycle: 'Monthly', nextBilling: '2026-10-01', category: 'Fitness', status: 'Active', icon: 'Activity' },
  { id: 'sub-5', name: 'ChatGPT Plus Subscription', amount: 20.00, billingCycle: 'Monthly', nextBilling: '2026-09-14', category: 'Productivity', status: 'Active', icon: 'Cpu' },
  { id: 'sub-6', name: 'Figma Professional Plan', amount: 15.00, billingCycle: 'Monthly', nextBilling: '2026-09-25', category: 'Software', status: 'Active', icon: 'Layers' }
];
