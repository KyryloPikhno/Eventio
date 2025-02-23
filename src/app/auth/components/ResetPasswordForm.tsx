"use client"

import resetPassword from "@/app/auth/mutations/resetPassword"
import { FORM_ERROR } from "@/app/components/Form"
import { useMutation } from "@blitzjs/rpc"
import { Button, PasswordInput, Stack, Text, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams?.get("token")?.toString()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },

    // validate: {},
  })

  const handleSubmit = async (values: any) => {
    try {
      console.log("values", values)

      await resetPasswordMutation({ ...values, token })
    } catch (error: any) {
      if (error.name === "ResetPasswordError") {
        return {
          [FORM_ERROR]: error.message,
        }
      } else {
        return {
          [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
        }
      }
    }
  }

  return (
    <Stack>
      <Title>Set a New Password</Title>

      {isSuccess ? (
        <Stack>
          <Title>Password Reset Successfully</Title>
          <Text>
            Go to the <Link href="/">homepage</Link>
          </Text>
        </Stack>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <PasswordInput
            withAsterisk
            label="Password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            withAsterisk
            label="Confirm New Password"
            key={form.key("passwordConfirmation")}
            {...form.getInputProps("passwordConfirmation")}
          />

          <Button type="submit">Reset Password</Button>
        </form>
      )}
    </Stack>
  )
}
