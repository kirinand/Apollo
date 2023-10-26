import Link from "next/link"

import SignupForm from "./forms/signup-form"
import LoginForm from "./forms/login-form"
import { OAuthButton } from "./buttons"
import constants from "@/constants"
import { oauthGoogle } from "@/config/utils"

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
        <span>{constants.prompt.orContinueWith}</span>
      </div>
      <OAuthButton 
        provider={oauthGoogle.provider} 
        redirect={oauthGoogle.redirect}
      />
      <p>
        {props.mode == "signup" ? (
            <Link href='/login'>{constants.prompt.alreadyHaveAcc}</Link>
          ) : (
            <Link href='/signup'>{constants.prompt.doNotHaveAcc}</Link>
          )
        }
      </p>
    </div>
  )
}

export default UserAuthWidget