function toCsvValue(value) {
  if (value == null) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function ExportCsvButton({ expenses }) {
  const handleExport = () => {
    if (!expenses.length) return

    const header = ['Title', 'Amount', 'Category', 'Date']
    const rows = expenses.map((e) => [
      e.title,
      e.amount,
      e.category,
      e.date,
    ])

    const csvLines = [
      header.map(toCsvValue).join(','),
      ...rows.map((row) => row.map(toCsvValue).join(',')),
    ]

    const blob = new Blob([csvLines.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'expenses.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      type="button"
      className="btn btn-secondary csv-btn"
      onClick={handleExport}
      disabled={!expenses.length}
    >
      Export CSV
    </button>
  )
}