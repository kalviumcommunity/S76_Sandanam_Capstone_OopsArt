"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "artist" | "admin"
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, role: "user" | "artist") => Promise<void>
  logout: () => void
    refreshUser: () => Promise<void>
    updateProfile: (payload: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("oopsart_user")
    const token = localStorage.getItem('oopsart_token')
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Real login/signup using backend API
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await (await import('@/lib/api')).api.login(email, password)
      const { token, user: u } = res
      localStorage.setItem('oopsart_token', token)
      localStorage.setItem('oopsart_user', JSON.stringify(u))
      setUser(u)
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string, role: "user" | "artist") => {
    setIsLoading(true)
    try {
      const res = await (await import('@/lib/api')).api.register(name, email, password, role)
      const { token, user: u } = res
      localStorage.setItem('oopsart_token', token)
      localStorage.setItem('oopsart_user', JSON.stringify(u))
      setUser(u)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("oopsart_user")
    localStorage.removeItem('oopsart_token')
  }

  const refreshUser = async () => {
    try {
      const res = await (await import('@/lib/api')).api.getMe()
      const u = res.user
      localStorage.setItem('oopsart_user', JSON.stringify(u))
      setUser(u)
    } catch (err) {
      // ignore
    }
  }

  const updateProfile = async (payload: any) => {
    setIsLoading(true)
    try {
      const res = await (await import('@/lib/api')).api.updateMe(payload)
      const u = res.user
      localStorage.setItem('oopsart_user', JSON.stringify(u))
      setUser(u)
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout, refreshUser, updateProfile }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
