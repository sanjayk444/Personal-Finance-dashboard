export function ExpenseFilters({ categories, expenses, filters, onChangeFilters }) {
  const monthOptions = Array.from(
    new Set(
      expenses.map((e) => {
        const d = new Date(e.date)
        return `${d.getFullYear()}-${d.getMonth() + 1}`
      }),
    ),
  ).sort()

  const formatMonth = (key) => {
    const [year, month] = key.split('-').map(Number)
    const date = new Date(year, month - 1, 1)
    return date.toLocaleDateString(undefined, {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Filters</h2>
          <p className="card-subtitle">Narrow down your view.</p>
        </div>
      </div>

      <div className="filters-row">
        <div className="input-field">
          <label className="input-label" htmlFor="filter-category">
            Category
          </label>
          <select
            id="filter-category"
            className="input-control"
            value={filters.category}
            onChange={(e) =>
              onChangeFilters({ category: e.target.value })
            }
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="input-field">
          <label className="input-label" htmlFor="filter-month">
            Month
          </label>
          <select
            id="filter-month"
            className="input-control"
            value={filters.month}
            onChange={(e) =>
              onChangeFilters({ month: e.target.value })
            }
          >
            <option value="All">All</option>
            {monthOptions.map((key) => (
              <option key={key} value={key}>
                {formatMonth(key)}
              </option>
            ))}
          </select>
        </div>

        <div className="input-field">
          <label className="input-label" htmlFor="filter-search">
            Search
          </label>
          <input
            id="filter-search"
            className="input-control"
            type="text"
            placeholder="Search by title..."
            value={filters.search}
            onChange={(e) =>
              onChangeFilters({ search: e.target.value })
            }
          />
        </div>
      </div>

      <div className="filters-footer">
        <span className="filters-count">
          {expenses.length} total expenses stored
        </span>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            onChangeFilters({ category: 'All', month: 'All', search: '' })
          }
        >
          Clear filters
        </button>
      </div>
    </section>
  )
}

