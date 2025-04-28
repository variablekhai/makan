import { useEffect, useState } from 'react'

interface CurrentUser {
  id: string
  name: string
  email: string
  role: string
}

export default function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/v1/me')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data) setUser(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { user, loading }
}
