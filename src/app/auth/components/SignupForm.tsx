"use client"

import signup from "@/app/auth/mutations/signup"
import { FORM_ERROR } from "@/app/components/Form"
import { useMutation } from "@blitzjs/rpc"
import { Button, PasswordInput, Stack, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useRouter } from "next/navigation"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const router = useRouter()

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

  const handelSubmit = async (values: any) => {
    try {
      await signupMutation(values)
      router.refresh()
      router.push("/")
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  return (
    <Stack>
      <Title>Create an Account</Title>

      <form onSubmit={form.onSubmit(handelSubmit)}>
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

        <Button type="submit">Create an Account</Button>
      </form>
    </Stack>
  )
}
