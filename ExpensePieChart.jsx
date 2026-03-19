import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#6366f1', '#f97316', '#22c55e', '#e11d48']

export function ExpensePieChart({ categories, expenses }) {
  const totalsByCategory = categories.map((cat) => {
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + Number(e.amount || 0), 0)
    return { name: cat, value: total }
  })

  const data = totalsByCategory.filter((d) => d.value > 0)

  return (
    <div style={{ width: '100%', height: 340 }}>
      <h2 className="card-title" style={{ marginBottom: 4 }}>
        Spending by category
      </h2>
      <p className="card-subtitle" style={{ marginBottom: 8 }}>
        Updates automatically as you change filters.
      </p>

      {data.length === 0 ? (
        <p className="expense-empty">
          Add some expenses to see the breakdown.
        </p>
      ) : (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

