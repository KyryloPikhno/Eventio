"use client"

import login from "@/app/auth/mutations/login"
import { FORM_ERROR } from "@/app/components/Form"
import { useMutation } from "@blitzjs/rpc"
import { Button, Group, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { AuthenticationError, PromiseReturnType } from "blitz"
import type { Route } from "next"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = () => {
  const [loginMutation] = useMutation(login)
  const router = useRouter()
  const next = useSearchParams()?.get("next")

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  const handleSubmit = async (values: any) => {
    try {
      await loginMutation(values)
      router.refresh()
      if (next) {
        router.push(next as Route)
      } else {
        router.push("/")
      }
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  return (
    <Stack>
      <Title>Login</Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Button type="submit">Login</Button>
      </form>

      <Group>
        <Link href="/auth/forgot-password">Forgot your password?</Link>
        <Text>Or</Text>
        <Link href="/auth/signup">Sign Up</Link>
      </Group>
    </Stack>
  )
}
