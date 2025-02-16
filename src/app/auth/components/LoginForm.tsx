"use client"

import login from "@/app/auth/mutations/login"
import { Login } from "@/app/auth/validations"
import { Form, FORM_ERROR } from "@/app/components/Form"
import LabeledTextField from "@/app/components/LabeledTextField"
import { useMutation } from "@blitzjs/rpc"
import { AuthenticationError, PromiseReturnType } from "blitz"
import type { Route } from "next"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const router = useRouter()
  const next = useSearchParams()?.get("next")

  return (
    <>
      <h1>Login</h1>

      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
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
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div>
          <Link href="/auth/forgot-password">Forgot your password?</Link>
        </div>
      </Form>

      <div style={{ marginTop: "1rem" }}>
        Or <Link href="/auth/signup">Sign Up</Link>
      </div>
    </>
  )
}
