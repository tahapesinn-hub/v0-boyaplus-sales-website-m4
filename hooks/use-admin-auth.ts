"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
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
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    const checkAuth = async () => {
      const storedAuth = localStorage.getItem(AUTH_KEY)
      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth) as AuthState
          if (parsed.isAuthenticated && parsed.currentUser) {
            // Kullanicinin hala veritabaninda var olduğunu kontrol et
            const { data: user } = await supabase
              .from("admin_users")
              .select("*")
              .eq("id", parsed.currentUser.id)
              .single()
            
            if (user) {
              setAuthState(parsed)
            } else {
              localStorage.removeItem(AUTH_KEY)
            }
          }
        } catch {
          // Gecersiz veri, ignore
        }
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const { data: user, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single()
      
      if (error || !user) {
        return false
      }

      const adminUser: AdminUser = {
        id: user.id,
        username: user.username,
        password: user.password,
        name: user.name,
        role: user.role,
        createdAt: user.created_at,
      }
      
      const newAuthState: AuthState = {
        isAuthenticated: true,
        currentUser: adminUser,
      }
      setAuthState(newAuthState)
      localStorage.setItem(AUTH_KEY, JSON.stringify(newAuthState))
      return true
    } catch {
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
  }
}
