import React from 'react';
import { 
  Target, 
  PlusCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck,
  Plane,
  Car,
  Building
} from 'lucide-react';

export default function BudgetsView({ 
  budgets, 
  transactions, 
  goals, 
  onAddGoalDeposit,
  onOpenGoalModal
}) {

  // Calculate actual spending per category from transactions
  const categorySpending = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
    });

  const getIconForGoal = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Plane': return Plane;
      case 'Car': return Car;
      case 'Building': return Building;
      default: return Target;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* SECTION 1: MONTHLY CATEGORY BUDGETS */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Monthly Category Budgets</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Track spending velocity and prevent overspending
            </p>
          </div>
          <span className="badge badge-emerald">{budgets.length} Monitored Categories</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {budgets.map(b => {
            const spent = categorySpending[b.category] || 0;
            const percent = Math.min(100, Math.round((spent / b.limit) * 100));
            const isOver = spent > b.limit;
            const isNear = percent >= 80 && !isOver;

            return (
              <div 
                key={b.id} 
                className="glass-card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  borderColor: isOver ? 'rgba(244, 63, 94, 0.4)' : isNear ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: b.color }} />
                    <h3 style={{ fontSize: '0.975rem', fontWeight: 700 }}>{b.category}</h3>
                  </div>

                  {isOver ? (
                    <span className="badge badge-rose">
                      <AlertTriangle size={12} /> Over Limit
                    </span>
                  ) : isNear ? (
                    <span className="badge badge-amber">
                      <AlertTriangle size={12} /> {percent}% Used
                    </span>
                  ) : (
                    <span className="badge badge-emerald">
                      <CheckCircle2 size={12} /> On Track
                    </span>
                  )}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                      ${spent.toFixed(2)}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Limit: ${b.limit.toFixed(2)}
                    </span>
                  </div>

                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill"
                      style={{ 
                        width: `${percent}%`,
                        background: isOver 
                          ? 'linear-gradient(90deg, #f43f5e, #e11d48)' 
                          : isNear 
                          ? 'linear-gradient(90deg, #f59e0b, #d97706)' 
                          : `linear-gradient(90deg, ${b.color}, #10b981)`
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>{isOver ? `Over by $${(spent - b.limit).toFixed(2)}` : `$${(b.limit - spent).toFixed(2)} remaining`}</span>
                  <span>{percent}% allocated</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: SAVINGS & WEALTH TARGETS */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Savings & Wealth Goals</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Dedicated savings funds and long-term financial targets
            </p>
          </div>

          <button className="btn btn-primary" onClick={onOpenGoalModal}>
            <PlusCircle size={16} />
            <span>New Savings Goal</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {goals.map(goal => {
            const GoalIcon = getIconForGoal(goal.icon);
            const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
            const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

            return (
              <div key={goal.id} className="glass-card glass-card-interactive" style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '14px',
                      background: `${goal.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: goal.color
                    }}>
                      <GoalIcon size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{goal.name}</h3>
                      <span className="badge badge-violet" style={{ marginTop: '3px' }}>
                        {goal.category}
                      </span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: goal.color }}>
                      {percent}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                      ${goal.currentAmount.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Target: ${goal.targetAmount.toLocaleString()} (${remaining.toLocaleString()} left)
                    </span>
                  </div>

                  <div className="progress-bar-container" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${percent}%`,
                        background: `linear-gradient(90deg, ${goal.color}, #34d399)`
                      }}
                    />
                  </div>
                </div>

                {/* Footer details + quick deposit trigger */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Calendar size={14} />
                    <span>Target: {goal.targetDate}</span>
                  </div>

                  <button 
                    className="btn btn-secondary" 
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                    onClick={() => onAddGoalDeposit(goal.id, 250)}
                  >
                    <PlusCircle size={13} />
                    <span>+$250 Deposit</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
