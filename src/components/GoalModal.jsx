import React, { useState } from 'react';
import { X, Target, ShieldCheck, Plane, Car, Building } from 'lucide-react';

export default function GoalModal({ isOpen, onClose, onAddGoal }) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [category, setCategory] = useState('Savings');
  const [targetDate, setTargetDate] = useState('2027-12-31');
  const [icon, setIcon] = useState('ShieldCheck');
  const [color, setColor] = useState('#10b981');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !targetAmount) return;

    const newGoal = {
      id: `g-${Date.now()}`,
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(initialAmount || '0'),
      category,
      targetDate,
      color,
      icon
    };

    onAddGoal(newGoal);
    onClose();

    setName('');
    setTargetAmount('');
    setInitialAmount('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Create New Savings Goal</h3>
          <button 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          
          <div className="input-group">
            <label className="input-label">Goal Name</label>
            <input 
              type="text" 
              required
              className="form-input" 
              placeholder="e.g. Home Downpayment or Vacation Fund"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Target Amount ($)</label>
              <input 
                type="number" 
                required
                className="form-input" 
                placeholder="10000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Initial Seed Saved ($)</label>
              <input 
                type="number" 
                className="form-input" 
                placeholder="1000"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Category</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Emergency">Emergency</option>
                <option value="Travel">Travel</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Investment">Investment</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Target Date</label>
              <input 
                type="date" 
                required
                className="form-input" 
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>
          </div>

          {/* Icon Selector */}
          <div className="input-group">
            <label className="input-label">Goal Icon</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { name: 'ShieldCheck', icon: ShieldCheck },
                { name: 'Plane', icon: Plane },
                { name: 'Car', icon: Car },
                { name: 'Building', icon: Building },
                { name: 'Target', icon: Target }
              ].map(({ name: iconName, icon: IconComp }) => (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setIcon(iconName)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '8px',
                    background: icon === iconName ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    border: icon === iconName ? `2px solid ${color}` : '1px solid var(--border-subtle)',
                    color: icon === iconName ? color : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <IconComp size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Theme Color Picker */}
          <div className="input-group">
            <label className="input-label">Badge Color Accent</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'].map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: c,
                    border: color === c ? '3px solid #ffffff' : 'none',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Goal
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
