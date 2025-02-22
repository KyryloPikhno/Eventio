"use client"

import logout from "@/app/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Button } from "@mantine/core"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  return (
    <>
      <Button
        onClick={async () => {
          await logoutMutation()
          router.refresh()
        }}
      >
        Logout
      </Button>
    </>
  )
}
