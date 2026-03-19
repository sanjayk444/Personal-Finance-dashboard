import { useState } from 'react'

export function ExpenseList({ expenses, categories, onUpdateExpense, onDeleteExpense }) {
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState({})

  const startEdit = (expense) => {
    setEditingId(expense.id)
    setDraft({
      title: expense.title,
      amount: String(expense.amount),
      category: expense.category,
      date: expense.date,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDraft({})
  }

  const saveEdit = (id) => {
    if (!draft.title.trim() || !draft.amount || !draft.date) return
    onUpdateExpense({
      id,
      title: draft.title.trim(),
      amount: Number(draft.amount),
      category: draft.category,
      date: draft.date,
    })
    cancelEdit()
  }

  const handleDraftChange = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }))
  }

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount)

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Expenses</h2>
          <p className="card-subtitle">
            Edit, delete, and review your transactions.
          </p>
        </div>
        <span className="card-subtitle">{expenses.length} items</span>
      </div>

      {expenses.length === 0 ? (
        <p className="expense-empty">No expenses match the current filters yet.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => {
            const isEditing = editingId === expense.id

            return (
              <li key={expense.id} className="expense-item">
                <div className="expense-main">
                  {isEditing ? (
                    <input
                      className="input-control"
                      value={draft.title}
                      onChange={(e) => handleDraftChange('title', e.target.value)}
                    />
                  ) : (
                    <span className="expense-title">{expense.title}</span>
                  )}
                  <span className="expense-meta">
                    {isEditing ? (
                      <input
                        type="date"
                        className="input-control"
                        value={draft.date}
                        onChange={(e) =>
                          handleDraftChange('date', e.target.value)
                        }
                      />
                    ) : (
                      formatDate(expense.date)
                    )}
                  </span>
                </div>

                <div>
                  {isEditing ? (
                    <select
                      className="input-control"
                      value={draft.category}
                      onChange={(e) =>
                        handleDraftChange('category', e.target.value)
                      }
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="expense-category">{expense.category}</span>
                  )}
                </div>

                <div className="expense-actions">
                  {isEditing ? (
                    <>
                      <input
                        className="input-control"
                        style={{ width: 90 }}
                        type="number"
                        min="0"
                        step="0.01"
                        value={draft.amount}
                        onChange={(e) =>
                          handleDraftChange('amount', e.target.value)
                        }
                      />
                      <button
                        className="btn btn-outline btn-icon"
                        type="button"
                        onClick={() => saveEdit(expense.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-icon"
                        type="button"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="expense-amount">
                        {formatAmount(expense.amount)}
                      </span>
                      <button
                        className="btn btn-outline btn-icon"
                        type="button"
                        onClick={() => startEdit(expense)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-secondary btn-icon"
                        type="button"
                        onClick={() => onDeleteExpense(expense.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

