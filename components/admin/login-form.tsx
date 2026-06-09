'use client'

import { useRef, useState } from 'react'
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'

export function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null
      setError(data?.error || 'Login failed')
      setSaving(false)
      requestAnimationFrame(() => inputRef.current?.focus())
      return
    }

    window.location.reload()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-border/60 bg-card p-8 shadow-sm">
      <div className="mb-6">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <LockKeyhole className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Admin Login</h1>
        <p className="text-sm text-muted-foreground">
          Use your admin password to open the homepage editor.
        </p>
      </div>

      <label className="block mb-4">
        <span className="mb-2 block text-sm font-medium text-foreground">Password</span>
        <div className="flex overflow-hidden rounded-xl border border-border bg-background focus-within:border-primary">
          <input
            ref={inputRef}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full bg-transparent px-4 py-3 text-sm outline-none"
            placeholder="Enter admin password"
            autoComplete="current-password"
            autoFocus
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="px-4 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </label>

      {error ? (
        <p className="mb-4 text-sm text-red-600">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
      >
        {saving ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}
