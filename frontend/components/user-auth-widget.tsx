import Link from "next/link"
import { signIn } from "next-auth/react"
import Image from "next/image"

import SignupForm from "./forms/signup-form"
import LoginForm from "./forms/login-form"
import { Button } from "@/components/ui/button"

type UserAuthWidgetProps = {
  header: string;
  mode: string
}

const UserAuthWidget = (props: UserAuthWidgetProps) => {
  return (
    <div>
      <h1>{props.header}</h1>
      {props.mode == "signup" ? <SignupForm /> : <LoginForm />}
      <div>
        <span>Or continue with</span>
      </div>
      {/* <Button
        onClick={() => {
          signIn("google")
        }}
      >
        <Image 
          priority
          src="@/public/icons/google.svg"
          height={32}
          width={32}
          alt=""
        />
        Google
      </Button> */}
      <p>
        {props.mode == "signup" ? (
            <Link href='/login'>Already have an account? Login</Link>
          ) : (
            <Link href='/signup'>Do not have an account? Signup</Link>
          )
        }
      </p>
    </div>
  )
}

export default UserAuthWidget