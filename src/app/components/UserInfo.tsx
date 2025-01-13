import Link from "next/link"
import { invoke } from "@blitzjs/rpc"
import { useEffect, useState } from "react"
import { User } from "@prisma/client"
import getCurrentUser from "../users/queries/getCurrentUser"

export default function UserInfo() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    async function fetchUser() {
      const user = await invoke(getCurrentUser, null)
      setCurrentUser(user as User)
    }
    fetchUser()
  }, [])

  if (currentUser === null) {
    return <div>Loading...</div>
  }

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
