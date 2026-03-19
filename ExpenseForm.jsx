import { useState } from 'react'

export function ExpenseForm({ categories, onAddExpense }) {
  const today = new Date().toISOString().slice(0, 10)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0] || 'Food')
  const [date, setDate] = useState(today)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !amount || !date) return

    onAddExpense({
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    })

    setTitle('')
    setAmount('')
    setCategory(categories[0] || 'Food')
    setDate(today)
  }

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Add expense</h2>
          <p className="card-subtitle">Quickly log a new spending item.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-field">
            <label className="input-label" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              className="input-control"
              type="text"
              placeholder="Groceries, Uber, Rent..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label className="input-label" htmlFor="amount">
              Amount
            </label>
            <input
              id="amount"
              className="input-control"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-field">
            <label className="input-label" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="input-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="input-field">
            <label className="input-label" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              className="input-control"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn" type="submit">
            Add expense
          </button>
        </div>
      </form>
    </section>
  )
}

