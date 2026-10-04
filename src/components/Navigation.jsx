import React from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  Target, 
  Repeat, 
  BarChart3 
} from 'lucide-react';

export default function Navigation({ activeTab, onTabChange, counts = {} }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt, count: counts.transactions },
    { id: 'budgets', label: 'Budgets & Goals', icon: Target, count: counts.goals },
    { id: 'subscriptions', label: 'Subscriptions', icon: Repeat, count: counts.subscriptions },
    { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 }
  ];

  return (
    <nav style={{ marginBottom: '1.75rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.25rem'
      }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.15rem',
                borderRadius: '12px',
                border: isActive ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)' 
                  : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#34d399' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={18} color={isActive ? '#34d399' : 'var(--text-muted)'} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span style={{
                  fontSize: '0.725rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '9999px',
                  background: isActive ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: 600
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
