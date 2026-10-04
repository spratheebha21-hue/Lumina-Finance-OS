import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import DashboardView from './components/DashboardView';
import TransactionsView from './components/TransactionsView';
import BudgetsView from './components/BudgetsView';
import SubscriptionsView from './components/SubscriptionsView';
import AnalyticsView from './components/AnalyticsView';
import TransactionModal from './components/TransactionModal';
import GoalModal from './components/GoalModal';

import { 
  INITIAL_ACCOUNTS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_BUDGETS, 
  INITIAL_GOALS, 
  INITIAL_SUBSCRIPTIONS 
} from './data/initialData';

export default function App() {
  // Load state from LocalStorage or seed defaults
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('lumina_accounts');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('lumina_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('lumina_budgets');
    return saved ? JSON.parse(saved) : INITIAL_BUDGETS;
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('lumina_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('lumina_subscriptions');
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('lumina_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('lumina_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('lumina_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('lumina_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  // Notifications generator based on actual app data
  const notifications = [
    {
      id: 'n-1',
      type: 'warning',
      title: 'Subscription Renewal Alert',
      message: 'ChatGPT Plus ($20.00) renews on Sep 14.'
    },
    {
      id: 'n-2',
      type: 'success',
      title: 'Income Milestone',
      message: 'Monthly income payout of $6,500 deposited.'
    }
  ];

  // Calculate Net Worth
  const totalNetWorth = accounts.reduce((acc, item) => acc + item.balance, 0);

  // Add Transaction Handler
  const handleAddTransaction = (newTx) => {
    setTransactions(prev => [newTx, ...prev]);

    // Update account balance
    setAccounts(prev => prev.map(acc => {
      if (acc.name === newTx.account) {
        const delta = newTx.type === 'income' ? newTx.amount : -newTx.amount;
        return { ...acc, balance: acc.balance + delta };
      }
      return acc;
    }));
  };

  // Delete Transaction Handler
  const handleDeleteTransaction = (id) => {
    const target = transactions.find(t => t.id === id);
    if (!target) return;

    setTransactions(prev => prev.filter(t => t.id !== id));

    // Revert balance
    setAccounts(prev => prev.map(acc => {
      if (acc.name === target.account) {
        const delta = target.type === 'income' ? -target.amount : target.amount;
        return { ...acc, balance: acc.balance + delta };
      }
      return acc;
    }));
  };

  // Deposit into Goal Handler
  const handleAddGoalDeposit = (goalId, amount) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        return { ...g, currentAmount: g.currentAmount + amount };
      }
      return g;
    }));

    // Deduct from main checking account
    setAccounts(prev => prev.map(acc => {
      if (acc.name === 'Main Checking') {
        return { ...acc, balance: acc.balance - amount };
      }
      return acc;
    }));

    // Record as investment transaction
    const depositTx = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      description: `Savings Deposit to Goal`,
      vendor: 'Savings Fund',
      category: 'Investments',
      type: 'expense',
      amount: amount,
      account: 'Main Checking',
      note: 'Automated goal contribution'
    };
    setTransactions(prev => [depositTx, ...prev]);
  };

  // Add New Goal Handler
  const handleAddGoal = (newGoal) => {
    setGoals(prev => [...prev, newGoal]);
  };

  // Subscription status toggle
  const handleToggleSubscriptionStatus = (subId) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id === subId) {
        return { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' };
      }
      return s;
    }));
  };

  // Delete subscription
  const handleDeleteSubscription = (subId) => {
    setSubscriptions(prev => prev.filter(s => s.id !== subId));
  };

  // Reset to initial sample data
  const handleResetData = () => {
    if (window.confirm('Reset all transactions, goals, and accounts back to demo dataset?')) {
      localStorage.clear();
      setAccounts(INITIAL_ACCOUNTS);
      setTransactions(INITIAL_TRANSACTIONS);
      setBudgets(INITIAL_BUDGETS);
      setGoals(INITIAL_GOALS);
      setSubscriptions(INITIAL_SUBSCRIPTIONS);
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        
        {/* Top Header */}
        <Header 
          netWorth={totalNetWorth}
          onOpenAddModal={() => setIsTransactionModalOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          notifications={notifications}
        />

        {/* Tab Navigation Bar */}
        <Navigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={{
            transactions: transactions.length,
            goals: goals.length,
            subscriptions: subscriptions.length
          }}
        />

        {/* Main Tab Content Views */}
        <main>
          {activeTab === 'dashboard' && (
            <DashboardView 
              transactions={transactions}
              accounts={accounts}
              goals={goals}
              budgets={budgets}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'transactions' && (
            <TransactionsView 
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              onOpenAddModal={() => setIsTransactionModalOpen(true)}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          )}

          {activeTab === 'budgets' && (
            <BudgetsView 
              budgets={budgets}
              transactions={transactions}
              goals={goals}
              onAddGoalDeposit={handleAddGoalDeposit}
              onOpenGoalModal={() => setIsGoalModalOpen(true)}
            />
          )}

          {activeTab === 'subscriptions' && (
            <SubscriptionsView 
              subscriptions={subscriptions}
              onToggleSubscriptionStatus={handleToggleSubscriptionStatus}
              onDeleteSubscription={handleDeleteSubscription}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView 
              transactions={transactions}
              accounts={accounts}
              goals={goals}
            />
          )}
        </main>

        {/* Footer Reset Control */}
        <footer style={{ marginTop: '3rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
          <div>
            © 2026 Lumina Finance OS • Built with React & Vite
          </div>
          <button 
            onClick={handleResetData}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.775rem' }}
          >
            Reset Demo Data
          </button>
        </footer>

      </div>

      {/* Modals */}
      <TransactionModal 
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        accounts={accounts}
      />

      <GoalModal 
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onAddGoal={handleAddGoal}
      />

    </div>
  );
}
