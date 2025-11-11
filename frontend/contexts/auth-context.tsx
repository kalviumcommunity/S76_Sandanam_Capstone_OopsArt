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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("oopsart_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Mock login function - would connect to a real backend in production
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock users for demo purposes
    const mockUsers = [
      { id: "1", name: "Art Lover", email: "user@example.com", password: "password", role: "user" as const },
      { id: "2", name: "Elena Rivera", email: "artist@example.com", password: "password", role: "artist" as const },
      { id: "3", name: "Admin User", email: "admin@example.com", password: "password", role: "admin" as const },
    ]

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (!foundUser) {
      setIsLoading(false)
      throw new Error("Invalid email or password")
    }

    const { password: _, ...userWithoutPassword } = foundUser
    setUser(userWithoutPassword)
    localStorage.setItem("oopsart_user", JSON.stringify(userWithoutPassword))
    setIsLoading(false)
  }

  // Mock signup function
  const signup = async (name: string, email: string, password: string, role: "user" | "artist") => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, we would send this data to an API
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role,
    }

    setUser(newUser)
    localStorage.setItem("oopsart_user", JSON.stringify(newUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("oopsart_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
