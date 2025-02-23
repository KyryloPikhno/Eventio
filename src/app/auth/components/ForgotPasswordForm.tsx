"use client"

import forgotPassword from "@/app/auth/mutations/forgotPassword"
import { FORM_ERROR } from "@/app/components/Form"
import { useMutation } from "@blitzjs/rpc"
import { Button, Stack, Text, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"

export function ForgotPasswordForm() {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  const handleSubmit = async (values: any) => {
    try {
      await forgotPasswordMutation(values)
    } catch (error: any) {
      return {
        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
      }
    }
  }

  return (
    <Stack>
      <Title>Forgot your password?</Title>
      <>
        {isSuccess ? (
          <Stack>
            <Title>Request Submitted</Title>
            <Text>
              If your email is in our system, you will receive instructions to reset your password
              shortly.
            </Text>
          </Stack>
        ) : (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />

            <Button type="submit">Send Reset Password Instructions</Button>
          </form>
        )}
      </>
    </Stack>
  )
}
