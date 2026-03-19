import { useEffect, useState } from 'react'

export function DarkModeToggle() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = window.localStorage.getItem('pf-theme')
    if (stored) return stored === 'dark'
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (enabled) {
      root.dataset.theme = 'dark'
      window.localStorage.setItem('pf-theme', 'dark')
    } else {
      root.dataset.theme = 'light'
      window.localStorage.setItem('pf-theme', 'light')
    }
  }, [enabled])

  return (
    <button
      type="button"
      className="dark-toggle"
      onClick={() => setEnabled((v) => !v)}
    >
      <input type="checkbox" readOnly checked={enabled} />
      <span>{enabled ? 'Dark' : 'Light'} mode</span>
    </button>
  )
}

