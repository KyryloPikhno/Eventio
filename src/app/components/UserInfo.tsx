"use client"

import { LogoutButton } from "@/app/auth/components/LogoutButton"
import getCurrentUser from "@/app/users/queries/getCurrentUser"
import { invoke } from "@blitzjs/rpc"
import { User } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function UserInfo() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      const user = await invoke(getCurrentUser, null)
      setCurrentUser(user as User)
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {currentUser ? (
        <>
          <LogoutButton />
          <div>
            User id: <code>{currentUser.id}</code>
            User role: <code>{currentUser.role}</code>
            User role: <code>{currentUser.email}</code>
          </div>
        </>
      ) : (
        <>
          <Link href="/auth/signup">
            <strong>Sign Up</strong>
          </Link>
          <Link href="/auth/login">
            <strong>Login</strong>
          </Link>
        </>
      )}
    </div>
  )
}
