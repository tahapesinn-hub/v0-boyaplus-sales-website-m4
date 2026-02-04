"use client"

import { useState, useEffect, useCallback } from "react"
import { type AdminUser, defaultUsers } from "@/lib/site-data"

const AUTH_KEY = "boyaplus_admin_auth"
const STORAGE_KEY = "boyaplus_site_data"

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

  // Kullanıcı listesini al
  const getUsers = useCallback((): AdminUser[] => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return parsed.users || defaultUsers
      } catch {
        return defaultUsers
      }
    }
    return defaultUsers
  }, [])

  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY)
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth) as AuthState
        if (parsed.isAuthenticated && parsed.currentUser) {
          // Kullanıcının hala geçerli olduğunu kontrol et
          const users = getUsers()
          const userExists = users.find(u => u.id === parsed.currentUser?.id)
          if (userExists) {
            setAuthState(parsed)
          }
        }
      } catch {
        // Geçersiz veri, ignore
      }
    }
    setIsLoading(false)
  }, [getUsers])

  const login = useCallback((username: string, password: string): boolean => {
    const users = getUsers()
    const user = users.find(u => u.username === username && u.password === password)
    
    if (user) {
      const newAuthState: AuthState = {
        isAuthenticated: true,
        currentUser: user,
      }
      setAuthState(newAuthState)
      localStorage.setItem(AUTH_KEY, JSON.stringify(newAuthState))
      return true
    }
    return false
  }, [getUsers])

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
  }
}
