"use client"

import { LogoutButton } from "@/app/auth/components/LogoutButton"
import getCurrentUser from "@/app/users/queries/getCurrentUser"
import { invoke } from "@blitzjs/rpc"
import { Button, Stack } from "@mantine/core"
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
          <Stack gap="8">
            User id: <code>{currentUser.id}</code>
            User role: <code>{currentUser.role}</code>
            User role: <code>{currentUser.email}</code>
          </Stack>
        </>
      ) : (
        <Stack gap="8">
          <Button component={Link} href="/auth/signup">
            Sign Up
          </Button>
          <Button component={Link} href="/auth/login">
            Login
          </Button>
        </Stack>
      )}
    </div>
  )
}
