"use client"

import signup from "@/app/auth/mutations/signup"
import { Signup } from "@/app/auth/validations"
import { Form, FORM_ERROR } from "@/app/components/Form"
import { LabeledTextField } from "@/app/components/LabeledTextField"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const router = useRouter()

  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
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
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}
