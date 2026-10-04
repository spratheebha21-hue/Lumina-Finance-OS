import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PiggyBank, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard,
  Target
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

export default function DashboardView({ 
  transactions, 
  accounts, 
  goals, 
  budgets, 
  onNavigate 
}) {

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : 0;

  const totalNetWorth = accounts.reduce((acc, a) => acc + a.balance, 0);

  // Group by category for Pie Chart
  const categoryExpensesMap = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryExpensesMap[t.category] = (categoryExpensesMap[t.category] || 0) + t.amount;
    });

  const pieColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#14b8a6', '#06b6d4'];
  const pieData = Object.keys(categoryExpensesMap).map((cat, idx) => ({
    name: cat,
    value: categoryExpensesMap[cat],
    color: pieColors[idx % pieColors.length]
  }));

  // Cash Flow Monthly Mock / Aggregated Trend
  const cashFlowData = [
    { month: 'Apr', Income: 5800, Expenses: 3200 },
    { month: 'May', Income: 6200, Expenses: 3400 },
    { month: 'Jun', Income: 5900, Expenses: 3100 },
    { month: 'Jul', Income: 7100, Expenses: 3800 },
    { month: 'Aug', Income: 6800, Expenses: 3550 },
    { month: 'Sep', Income: Math.round(totalIncome), Expenses: Math.round(totalExpense) }
  ];

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* 4 Top Summary Stat Cards */}
      <div className="stat-card-grid">
        
        {/* Net Worth */}
        <div className="glass-card stat-card" style={{ '--card-accent': '#10b981' }}>
          <div className="stat-header">
            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Total Net Worth
            </span>
            <div className="stat-icon-wrapper" style={{ '--icon-bg': 'rgba(16, 185, 129, 0.15)', '--icon-color': '#10b981' }}>
              <DollarSign size={20} />
            </div>
          </div>
          <div className="stat-value gradient-emerald-text">
            {formatCurrency(totalNetWorth)}
          </div>
          <div className="stat-footer">
            <span className="badge badge-emerald">
              <ArrowUpRight size={12} /> +4.2%
            </span>
            <span>vs previous month</span>
          </div>
        </div>

        {/* Monthly Income */}
        <div className="glass-card stat-card" style={{ '--card-accent': '#3b82f6' }}>
          <div className="stat-header">
            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Monthly Income
            </span>
            <div className="stat-icon-wrapper" style={{ '--icon-bg': 'rgba(59, 130, 246, 0.15)', '--icon-color': '#3b82f6' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#60a5fa' }}>
            {formatCurrency(totalIncome)}
          </div>
          <div className="stat-footer">
            <span className="badge badge-blue">
              {transactions.filter(t => t.type === 'income').length} payouts
            </span>
            <span>earned this period</span>
          </div>
        </div>

        {/* Monthly Expenses */}
        <div className="glass-card stat-card" style={{ '--card-accent': '#f43f5e' }}>
          <div className="stat-header">
            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Monthly Expenses
            </span>
            <div className="stat-icon-wrapper" style={{ '--icon-bg': 'rgba(244, 63, 94, 0.15)', '--icon-color': '#f43f5e' }}>
              <TrendingDown size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#fb7185' }}>
            {formatCurrency(totalExpense)}
          </div>
          <div className="stat-footer">
            <span className="badge badge-rose">
              <ArrowDownRight size={12} /> -2.1%
            </span>
            <span>spending controlled</span>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="glass-card stat-card" style={{ '--card-accent': '#8b5cf6' }}>
          <div className="stat-header">
            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Savings Rate
            </span>
            <div className="stat-icon-wrapper" style={{ '--icon-bg': 'rgba(139, 92, 246, 0.15)', '--icon-color': '#8b5cf6' }}>
              <PiggyBank size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#c084fc' }}>
            {savingsRate}%
          </div>
          <div className="stat-footer">
            <span className="badge badge-violet">
              Goal: &gt;25%
            </span>
            <span>{netSavings >= 0 ? `+$${netSavings.toFixed(0)} saved` : 'Over budget'}</span>
          </div>
        </div>

      </div>

      {/* Main Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        
        {/* Cash Flow Area Chart */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Income & Cash Flow Trend</h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Historical income vs expense momentum</p>
            </div>
            <span className="badge badge-emerald">6 Month Timeline</span>
          </div>

          <div style={{ width: '100%', height: 260, marginTop: '0.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  formatter={(val) => [`$${val}`, '']}
                />
                <Area type="monotone" dataKey="Income" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#incomeGrad)" />
                <Area type="monotone" dataKey="Expenses" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#expenseGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Category Breakdown Pie Chart */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Expense Distribution</h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Breakdown by category spending</p>
            </div>
            <button 
              className="btn btn-secondary" 
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              onClick={() => onNavigate('budgets')}
            >
              View Budgets
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260 }}>
            {pieData.length > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%', justifyContent: 'space-around' }}>
                <div style={{ width: 180, height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        formatter={(val) => [`$${val.toFixed(2)}`, 'Spend']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: 200, overflowY: 'auto' }}>
                  {pieData.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{item.name}</span>
                      <span style={{ fontWeight: 700 }}>${item.value.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No expense records found.</div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Grid: Recent Activity + Connected Accounts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        
        {/* Recent Transactions List */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Recent Transactions</h3>
            <button 
              className="btn btn-secondary" 
              style={{ fontSize: '0.775rem', padding: '0.35rem 0.75rem' }}
              onClick={() => onNavigate('transactions')}
            >
              See All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {transactions.slice(0, 5).map(tx => (
              <div key={tx.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'background 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    background: tx.type === 'income' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: tx.type === 'income' ? '#10b981' : '#f43f5e'
                  }}>
                    {tx.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{tx.description}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem', marginTop: '2px' }}>
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span>{tx.category}</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontSize: '0.925rem', 
                    fontWeight: 700, 
                    color: tx.type === 'income' ? '#34d399' : '#f8fafc' 
                  }}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{tx.account}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Accounts & Liquidity */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Connected Accounts</h3>
            <span className="badge badge-emerald">5 Active</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {accounts.map(acc => (
              <div key={acc.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: `${acc.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: acc.color
                  }}>
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{acc.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{acc.bank}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.925rem', fontWeight: 700, color: acc.balance < 0 ? '#fb7185' : 'var(--text-primary)' }}>
                    ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{acc.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Savings Goals Overview */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={18} color="#10b981" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Financial Savings Goals Overview</h3>
          </div>
          <button 
            className="btn btn-secondary" 
            style={{ fontSize: '0.775rem', padding: '0.35rem 0.75rem' }}
            onClick={() => onNavigate('budgets')}
          >
            Manage Goals ({goals?.length || 0})
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {goals?.slice(0, 4).map(g => {
            const pct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
            return (
              <div key={g.id} style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{g.name}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: g.color }}>{pct}%</span>
                </div>
                <div className="progress-bar-bg" style={{ height: 6 }}>
                  <div className="progress-bar-fill" style={{ width: `${pct}%`, background: g.color }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  <span>Saved ${g.currentAmount.toLocaleString()}</span>
                  <span>Target ${g.targetAmount.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
