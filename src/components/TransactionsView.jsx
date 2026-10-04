import React, { useState } from 'react';
import { 
  PlusCircle, 
  Download, 
  Trash2, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  SlidersHorizontal,
  Calendar,
  Tag,
  CreditCard
} from 'lucide-react';

export default function TransactionsView({ 
  transactions, 
  onDeleteTransaction, 
  onOpenAddModal,
  searchTerm,
  onSearchChange
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  // Extract unique categories
  const categories = ['All', ...new Set(transactions.map(t => t.category))];

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = searchTerm === '' || 
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.note && tx.note.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
    const matchesType = selectedType === 'All' || tx.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'amount-high') return b.amount - a.amount;
    if (sortBy === 'amount-low') return a.amount - b.amount;
    return 0;
  });

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Description', 'Vendor', 'Category', 'Type', 'Amount', 'Account', 'Note'];
    const rows = sortedTransactions.map(t => [
      t.id, t.date, `"${t.description}"`, `"${t.vendor}"`, t.category, t.type, t.amount, `"${t.account}"`, `"${t.note || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lumina_transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Header Controls */}
      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Transactions Ledger</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Showing {sortedTransactions.length} of {transactions.length} record(s)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary" onClick={onOpenAddModal}>
            <PlusCircle size={16} />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        
        {/* Search */}
        <div className="search-wrapper" style={{ flex: 1, minWidth: '220px' }}>
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            className="form-input search-input"
            placeholder="Search description, vendor, note..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Tag size={15} color="var(--text-muted)" />
          <select 
            className="form-select" 
            style={{ width: '160px' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SlidersHorizontal size={15} color="var(--text-muted)" />
          <select 
            className="form-select" 
            style={{ width: '130px' }}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
          </select>
        </div>

        {/* Sort By */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={15} color="var(--text-muted)" />
          <select 
            className="form-select" 
            style={{ width: '160px' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-high">Amount: High to Low</option>
            <option value="amount-low">Amount: Low to High</option>
          </select>
        </div>

      </div>

      {/* Transactions Table */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.9rem 1.25rem' }}>Date</th>
                <th style={{ padding: '0.9rem 1.25rem' }}>Description & Vendor</th>
                <th style={{ padding: '0.9rem 1.25rem' }}>Category</th>
                <th style={{ padding: '0.9rem 1.25rem' }}>Account</th>
                <th style={{ padding: '0.9rem 1.25rem' }}>Type</th>
                <th style={{ padding: '0.9rem 1.25rem', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '0.9rem 1.25rem', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((tx) => (
                  <tr 
                    key={tx.id}
                    style={{ 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Date */}
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {tx.date}
                    </td>

                    {/* Description */}
                    <td style={{ padding: '0.9rem 1.25rem' }}>
                      <div style={{ fontWeight: 600 }}>{tx.description}</div>
                      {tx.note && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{tx.note}</div>}
                    </td>

                    {/* Category Badge */}
                    <td style={{ padding: '0.9rem 1.25rem' }}>
                      <span className="badge badge-blue">
                        {tx.category}
                      </span>
                    </td>

                    {/* Account */}
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CreditCard size={14} color="var(--text-muted)" />
                        <span>{tx.account}</span>
                      </div>
                    </td>

                    {/* Type Badge */}
                    <td style={{ padding: '0.9rem 1.25rem' }}>
                      {tx.type === 'income' ? (
                        <span className="badge badge-emerald">
                          <ArrowUpRight size={12} /> Income
                        </span>
                      ) : (
                        <span className="badge badge-rose">
                          <ArrowDownRight size={12} /> Expense
                        </span>
                      )}
                    </td>

                    {/* Amount */}
                    <td style={{ 
                      padding: '0.9rem 1.25rem', 
                      textAlign: 'right', 
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: tx.type === 'income' ? '#34d399' : '#f8fafc'
                    }}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '0.9rem 1.25rem', textAlign: 'center' }}>
                      <button 
                        className="btn btn-danger btn-icon"
                        onClick={() => onDeleteTransaction(tx.id)}
                        title="Delete transaction"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No transactions match your current search/filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
