import React, { useState } from 'react';
import { 
  Repeat, 
  Tv, 
  Music, 
  Cloud, 
  Activity, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  PauseCircle, 
  Calendar,
  Trash2
} from 'lucide-react';

export default function SubscriptionsView({ 
  subscriptions, 
  onToggleSubscriptionStatus,
  onDeleteSubscription
}) {
  const [filterStatus, setFilterStatus] = useState('All');

  const getSubIcon = (iconName) => {
    switch (iconName) {
      case 'Tv': return Tv;
      case 'Music': return Music;
      case 'Cloud': return Cloud;
      case 'Activity': return Activity;
      case 'Cpu': return Cpu;
      case 'Layers': return Layers;
      default: return Repeat;
    }
  };

  const activeSubs = subscriptions.filter(s => s.status === 'Active');
  const totalMonthlyBurn = activeSubs.reduce((sum, s) => sum + s.amount, 0);

  const filteredSubs = subscriptions.filter(s => {
    if (filterStatus === 'Active') return s.status === 'Active';
    if (filterStatus === 'Paused') return s.status === 'Paused';
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Banner Stat Card */}
      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(15, 23, 42, 0.8) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '16px',
            background: 'rgba(139, 92, 246, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#c084fc'
          }}>
            <Repeat size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Recurring Subscriptions & Bills</h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Managing {activeSubs.length} active recurring automated payment services
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Monthly Outflow</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#c084fc' }}>
              ${totalMonthlyBurn.toFixed(2)}<span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/mo</span>
            </div>
          </div>
          
          <div style={{ height: 40, width: 1, background: 'var(--border-subtle)' }} />

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Annualized Burn</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              ${(totalMonthlyBurn * 12).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'Active', 'Paused'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className="btn btn-secondary"
              style={{
                padding: '0.45rem 0.9rem',
                fontSize: '0.8rem',
                background: filterStatus === status ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.03)',
                borderColor: filterStatus === status ? '#8b5cf6' : 'var(--border-subtle)',
                color: filterStatus === status ? '#c084fc' : 'var(--text-secondary)'
              }}
            >
              {status}
            </button>
          ))}
        </div>

        <span className="badge badge-violet">
          Next Renewal: Sep 14 (ChatGPT)
        </span>
      </div>

      {/* Subscriptions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredSubs.map(sub => {
          const SubIcon = getSubIcon(sub.icon);
          const isActive = sub.status === 'Active';

          return (
            <div 
              key={sub.id} 
              className="glass-card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                opacity: isActive ? 1 : 0.6
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: '12px',
                    background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? '#c084fc' : 'var(--text-muted)'
                  }}>
                    <SubIcon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.975rem', fontWeight: 700 }}>{sub.name}</h3>
                    <span className="badge badge-blue" style={{ marginTop: '2px', fontSize: '0.7rem' }}>
                      {sub.category}
                    </span>
                  </div>
                </div>

                <span className={isActive ? 'badge badge-emerald' : 'badge badge-amber'}>
                  {isActive ? <CheckCircle2 size={12} /> : <PauseCircle size={12} />}
                  {sub.status}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                  ${sub.amount.toFixed(2)}
                  <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontWeight: 500 }}> /{sub.billingCycle}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <Calendar size={13} />
                  <span>Renews: {sub.nextBilling}</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                  onClick={() => onToggleSubscriptionStatus(sub.id)}
                >
                  {isActive ? 'Pause Billing' : 'Resume Billing'}
                </button>

                <button
                  className="btn btn-danger btn-icon"
                  style={{ padding: '0.35rem' }}
                  onClick={() => onDeleteSubscription(sub.id)}
                  title="Remove subscription"
                >
                  <Trash2 size={14} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
