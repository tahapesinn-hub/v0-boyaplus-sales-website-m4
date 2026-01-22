"use client"

import { useState, useEffect, useCallback } from "react"

const ADMIN_PASSWORD = "boyaplusadmin"
const AUTH_KEY = "boyaplus_admin_auth"

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem(AUTH_KEY, "true")
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    localStorage.removeItem(AUTH_KEY)
  }, [])

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
}
