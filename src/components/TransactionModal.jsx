import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TransactionModal({ isOpen, onClose, onAddTransaction, accounts }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food & Dining');
  const [account, setAccount] = useState(accounts[0]?.name || 'Main Checking');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [vendor, setVendor] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTx = {
      id: `tx-${Date.now()}`,
      date,
      description,
      vendor: vendor || description,
      category,
      type,
      amount: parseFloat(amount),
      account,
      note
    };

    onAddTransaction(newTx);
    onClose();

    // Reset fields
    setDescription('');
    setAmount('');
    setVendor('');
    setNote('');
  };

  const categories = [
    'Food & Dining',
    'Housing',
    'Salary',
    'Freelance',
    'Transportation',
    'Shopping & Style',
    'Tech & Utilities',
    'Investments',
    'Health & Wellness',
    'Entertainment',
    'General'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Create New Transaction</h3>
          <button 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          
          {/* Income vs Expense Toggle */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '12px' }}>
            <button
              type="button"
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '8px',
                border: 'none',
                background: type === 'expense' ? '#f43f5e' : 'transparent',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
            <button
              type="button"
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '8px',
                border: 'none',
                background: type === 'income' ? '#10b981' : 'transparent',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setType('income')}
            >
              Income
            </button>
          </div>

          {/* Amount & Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Amount ($)</label>
              <input 
                type="number" 
                step="0.01"
                required
                className="form-input" 
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Date</label>
              <input 
                type="date" 
                required
                className="form-input" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="input-group">
            <label className="input-label">Description / Title</label>
            <input 
              type="text" 
              required
              className="form-input" 
              placeholder="e.g. Organic Groceries or Salary Direct Deposit"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Category & Account */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Category</label>
              <select 
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Account</label>
              <select 
                className="form-select"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              >
                {accounts.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
              </select>
            </div>
          </div>

          {/* Note */}
          <div className="input-group">
            <label className="input-label">Note / Reference (Optional)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Receipt #4029"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Transaction
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
