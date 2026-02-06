"use client"

import { useState, useEffect, useCallback } from "react"
import type { AdminUser } from "@/lib/site-data"

const AUTH_KEY = "boyaplus_admin_auth"

interface AuthState {
  isAuthenticated: boolean
  currentUser: AdminUser | null
}

export function useAdminAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    currentUser: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY)
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth) as AuthState
        if (parsed.isAuthenticated && parsed.currentUser) {
          setAuthState(parsed)
        }
      } catch {
        localStorage.removeItem(AUTH_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const [loginError, setLoginError] = useState("")

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      setLoginError("")
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      
      const data = await res.json()
      
      if (!res.ok || !data.success) {
        setLoginError(data.error || `HTTP ${res.status}`)
        return false
      }

      const newState: AuthState = {
        isAuthenticated: true,
        currentUser: data.user,
      }
      setAuthState(newState)
      localStorage.setItem(AUTH_KEY, JSON.stringify(newState))
      return true
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error"
      setLoginError(msg)
      return false
    }
  }, [])

  const logout = useCallback(() => {
    setAuthState({ isAuthenticated: false, currentUser: null })
    localStorage.removeItem(AUTH_KEY)
  }, [])

  return {
    isAuthenticated: authState.isAuthenticated,
    currentUser: authState.currentUser,
    isLoading,
    login,
    logout,
    loginError,
  }
}
