const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value || 0)

export function SummaryCards({ expenses, allExpenses }) {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0)

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0)
    return acc
  }, {})

  const topCategory =
    Object.keys(byCategory).length === 0
      ? '—'
      : Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0][0]

  const avg =
    expenses.length === 0 ? 0 : total / expenses.length

  const allTimeTotal = allExpenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0,
  )

  return (
    <section className="summary-grid">
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Total spent</h2>
            <p className="card-subtitle">For the current filters</p>
          </div>
        </div>
        <div className="summary-value">{formatCurrency(total)}</div>
        <p className="summary-label">{expenses.length} expenses</p>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Top category</h2>
            <p className="card-subtitle">Where most of your money goes</p>
          </div>
        </div>
        <div className="summary-value">{topCategory}</div>
        {topCategory !== '—' && (
          <span className="summary-chip">
            {formatCurrency(byCategory[topCategory] || 0)} spent
          </span>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Average expense</h2>
            <p className="card-subtitle">Across all filtered items</p>
          </div>
        </div>
        <div className="summary-value">{formatCurrency(avg)}</div>
        <p className="summary-label">
          {formatCurrency(allTimeTotal)} total recorded
        </p>
      </div>
    </section>
  )
}

