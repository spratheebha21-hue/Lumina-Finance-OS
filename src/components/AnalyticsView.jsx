import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Calculator
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

export default function AnalyticsView({ _transactions = [], accounts = [], goals = [] }) {
  // Compute total liquid capital from accounts
  const liquidCapital = accounts.reduce((sum, a) => sum + Math.max(0, a.balance), 0);
  const totalSavedGoals = goals.reduce((sum, g) => sum + (g.currentAmount || 0), 0);

  // Wealth Simulator State initialized dynamically or with defaults
  const [initialCapital, setInitialCapital] = useState(liquidCapital || 50000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(10);

  // Calculate compound interest projection
  const generateProjection = () => {
    const data = [];
    let balance = initialCapital;
    const r = annualReturn / 100 / 12;

    for (let yr = 0; yr <= years; yr++) {
      data.push({
        year: `Year ${yr}`,
        Balance: Math.round(balance),
        Contributions: Math.round(initialCapital + (monthlyContribution * 12 * yr))
      });

      for (let m = 0; m < 12; m++) {
        balance = (balance + monthlyContribution) * (1 + r);
      }
    }
    return data;
  };

  const projectionData = generateProjection();
  const finalBalance = projectionData[projectionData.length - 1].Balance;
  const totalContributed = projectionData[projectionData.length - 1].Contributions;
  const totalInterestEarned = finalBalance - totalContributed;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Financial Health Score & Badges Banner */}
      <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)' }}>
        
        {/* Score Radial indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 24px rgba(16, 185, 129, 0.4)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.5rem'
          }}>
            88
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Financial Health Index</h2>
              <span className="badge badge-emerald">Excellent</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Top 8% compared to peers with similar income profile
            </p>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.825rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Emergency Runway Buffer</span>
            <span style={{ fontWeight: 700, color: '#34d399' }}>6.4 Months</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.825rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Debt-to-Income Ratio</span>
            <span style={{ fontWeight: 700, color: '#60a5fa' }}>12.5% (Very Low)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.825rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Total Goals Funded</span>
            <span style={{ fontWeight: 700, color: '#c084fc' }}>${totalSavedGoals.toLocaleString()}</span>
          </div>
        </div>

      </div>

      {/* Interactive Wealth Growth & Compound Simulator */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calculator size={20} color="#10b981" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Compound Wealth Growth Simulator</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Project long-term asset accumulation with monthly contributions & reinvested returns
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Projected Wealth</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#34d399' }}>
                ${finalBalance.toLocaleString()}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Interest Growth</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#c084fc' }}>
                +${totalInterestEarned.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Sliders Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '12px' }}>
          
          <div className="input-group">
            <label className="input-label">Initial Capital (${initialCapital.toLocaleString()})</label>
            <input 
              type="range" 
              min="0" 
              max="200000" 
              step="5000" 
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              style={{ accentColor: '#10b981', cursor: 'pointer' }}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Monthly Investment (${monthlyContribution.toLocaleString()})</label>
            <input 
              type="range" 
              min="100" 
              max="5000" 
              step="100" 
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              style={{ accentColor: '#3b82f6', cursor: 'pointer' }}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Expected Return Rate ({annualReturn}%)</label>
            <input 
              type="range" 
              min="2" 
              max="15" 
              step="0.5" 
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              style={{ accentColor: '#8b5cf6', cursor: 'pointer' }}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Time Horizon ({years} Years)</label>
            <input 
              type="range" 
              min="1" 
              max="35" 
              step="1" 
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              style={{ accentColor: '#f59e0b', cursor: 'pointer' }}
            />
          </div>

        </div>

        {/* Projection Area Chart */}
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="contribGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
              <Tooltip 
                contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                formatter={(val) => [`$${val.toLocaleString()}`, '']}
              />
              <Area type="monotone" dataKey="Balance" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#balanceGrad)" name="Total Portfolio" />
              <Area type="monotone" dataKey="Contributions" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#contribGrad)" name="Principal Contributed" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Smart Insights */}
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="#8b5cf6" />
          <span>Automated Financial Recommendations</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          
          <div className="glass-card" style={{ display: 'flex', gap: '0.85rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <TrendingUp size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700 }}>High Savings Rate Optimization</h4>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                Your current monthly savings rate is 71.3%. Consider allocating an additional $400/mo into low-cost index funds to accelerate retirement timeline.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ display: 'flex', gap: '0.85rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700 }}>Subscription Audit Suggestion</h4>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                You have 6 active recurring subscriptions totaling $302.97/mo. Audit unused streaming or cloud services to save up to $600 annually.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ display: 'flex', gap: '0.85rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700 }}>Emergency Reserve Target</h4>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                Your emergency fund is 74% fulfilled ($18,500 / $25,000). At your current auto-deposit rate, you will hit 100% security by November 2026.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
