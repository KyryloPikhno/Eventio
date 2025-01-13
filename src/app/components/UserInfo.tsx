"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import getCurrentUser from "../users/queries/getCurrentUser"
import { invoke } from "@blitzjs/rpc"
import { LogoutButton } from "../(auth)/components/LogoutButton"

type User = {
  id: number
  name: string | null
  email: string
  role: string
}

export default function UserInfo() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    invoke(getCurrentUser, null).then(setCurrentUser)
  }, [])

  return (
    <div>
      {currentUser ? (
        <>
          <LogoutButton />
          <div>
            User id: <code>{currentUser.id}</code>
            <br />
            User role: <code>{currentUser.role}</code>
          </div>
        </>
      ) : (
        <>
          <Link href="/signup">
            <strong>Sign Up</strong>
          </Link>
          <Link href="/login">
            <strong>Login</strong>
          </Link>
        </>
      )}
    </div>
  )
}
