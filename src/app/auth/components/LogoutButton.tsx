"use client"
import { useMutation } from "@blitzjs/rpc"
import { Button } from "@mantine/core"
import { useRouter } from "next/navigation"
import logout from "../mutations/logout"

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
