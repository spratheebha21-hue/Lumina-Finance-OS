import React, { useState } from 'react';
import { 
  Sparkles, 
  PlusCircle, 
  Search, 
  Bell, 
  X, 
  CheckCircle2, 
  AlertTriangle,
  Wallet
} from 'lucide-react';

export default function Header({ 
  netWorth, 
  onOpenAddModal, 
  searchTerm, 
  onSearchChange,
  notifications = []
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const formattedNetWorth = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(netWorth);

  return (
    <header className="glass-card" style={{ padding: '1rem 1.5rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
      
      {/* Brand & Net Worth Pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)'
          }}>
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.1 }}>
              Lumina<span className="gradient-emerald-text">.Finance</span>
            </h1>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Wealth & Budget Operating System
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          padding: '0.45rem 0.9rem',
          borderRadius: '9999px'
        }}>
          <Wallet size={16} color="#10b981" />
          <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Net Worth:</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34d399' }}>
            {formattedNetWorth}
          </span>
        </div>
      </div>

      {/* Right Controls: Search, Notifications, Quick Action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'flex-end', minWidth: '280px' }}>
        
        {/* Global Search Bar */}
        <div className="search-wrapper" style={{ width: '100%', maxWidth: '280px' }}>
          <Search size={16} className="search-icon" />
          <input 
            type="text"
            className="form-input search-input"
            placeholder="Search transactions, goals, tags..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Notifications Button */}
        <div style={{ position: 'relative' }}>
          <button 
            className="btn btn-secondary btn-icon"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications & Insights"
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#f43f5e',
                boxShadow: '0 0 8px #f43f5e'
              }} />
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {showNotifications && (
            <div className="glass-card" style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              right: 0,
              width: '320px',
              zIndex: 90,
              padding: '1rem',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700 }}>Financial Alerts</h4>
                <button 
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  onClick={() => setShowNotifications(false)}
                >
                  <X size={14} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {notifications.map(note => (
                  <div key={note.id} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    padding: '0.6rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    {note.type === 'warning' ? (
                      <AlertTriangle size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                    ) : (
                      <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                    )}
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{note.title}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{note.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Primary Modal Action */}
        <button 
          className="btn btn-primary"
          onClick={onOpenAddModal}
        >
          <PlusCircle size={18} />
          <span>New Transaction</span>
        </button>

      </div>
    </header>
  );
}
