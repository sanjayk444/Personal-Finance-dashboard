import { useMemo, useState } from 'react'
import './App.css'
import { useLocalStorage } from './hooks/useLocalStorage'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'
import { ExpenseFilters } from './components/ExpenseFilters'
import { SummaryCards } from './components/SummaryCards'
import { ExpensePieChart } from './components/ExpensePieChart'
import { DarkModeToggle } from './components/DarkModeToggle'
import { ExportCsvButton } from './components/ExportCsvButton'

const CATEGORIES = ['Food', 'Rent', 'Fun', 'Travel']

function App() {
  const [expenses, setExpenses] = useLocalStorage('pf-expenses', [])
  const [filters, setFilters] = useState({
    category: 'All',
    month: 'All',
    search: '',
  })

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [
      ...prev,
      { ...expense, id: crypto.randomUUID() },
    ])
  }

  const handleUpdateExpense = (updated) => {
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
  }

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }

  const handleChangeFilters = (partial) => {
    setFilters((prev) => ({ ...prev, ...partial }))
  }

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesCategory =
        filters.category === 'All' || expense.category === filters.category

      const expenseDate = new Date(expense.date)
      const monthKey = `${expenseDate.getFullYear()}-${
        expenseDate.getMonth() + 1
      }`
      const matchesMonth =
        filters.month === 'All' || monthKey === filters.month

      const matchesSearch =
        !filters.search ||
        expense.title.toLowerCase().includes(filters.search.toLowerCase())

      return matchesCategory && matchesMonth && matchesSearch
    })
  }, [expenses, filters])

  return (
    <div className="app-root">
      <header className="app-header">
        <div>
          <h1>Personal Finance Dashboard</h1>
          <p className="app-subtitle">
            Track your spending, understand your habits, and stay on budget.
          </p>
        </div>
        <div className="app-header-actions">
          <ExportCsvButton expenses={filteredExpenses} />
          <DarkModeToggle />
        </div>
      </header>

      <main className="app-main">
        <SummaryCards expenses={filteredExpenses} allExpenses={expenses} />

        <section className="app-grid">
          <div className="app-grid-left">
            <ExpenseForm
              categories={CATEGORIES}
              onAddExpense={handleAddExpense}
            />

            <ExpenseFilters
              categories={CATEGORIES}
              expenses={expenses}
              filters={filters}
              onChangeFilters={handleChangeFilters}
            />

            <ExpenseList
              expenses={filteredExpenses}
              categories={CATEGORIES}
              onUpdateExpense={handleUpdateExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>

          <div className="app-grid-right">
            <ExpensePieChart categories={CATEGORIES} expenses={filteredExpenses} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
