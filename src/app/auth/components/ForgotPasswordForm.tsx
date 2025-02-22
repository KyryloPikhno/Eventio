"use client"

import forgotPassword from "@/app/auth/mutations/forgotPassword"
import { ForgotPassword } from "@/app/auth/validations"
import { Form, FORM_ERROR } from "@/app/components/Form"
import LabeledTextField from "@/app/components/LabeledTextField"
import { useMutation } from "@blitzjs/rpc"

export function ForgotPasswordForm() {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <>
      <h1>Forgot your password?</h1>
      <>
        {isSuccess ? (
          <div>
            <h2>Request Submitted</h2>
            <p>
              If your email is in our system, you will receive instructions to reset your password
              shortly.
            </p>
          </div>
        ) : (
          <Form
            submitText="Send Reset Password Instructions"
            schema={ForgotPassword}
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              try {
                await forgotPasswordMutation(values)
              } catch (error: any) {
                return {
                  [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                }
              }
            }}
          >
            <LabeledTextField name="email" label="Email" placeholder="Email" />
          </Form>
        )}
      </>
    </>
  )
}
