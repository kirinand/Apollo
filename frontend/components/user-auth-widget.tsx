import Link from "next/link";

import SignupForm from "./forms/signup-form";
import LoginForm from "./forms/login-form";
import { OAuthButton } from "./buttons";
import constants from "@/constants";
import { oauthGoogle } from "@/config/utils";

type UserAuthWidgetProps = {
  header: string;
  mode: string;
};

const UserAuthWidget = (props: UserAuthWidgetProps) => {
  return (
    <div className="py-12">
      <h1 className="text-xl text-center h-12 border-b mb-4 font-bold tracking-wide">
        {props.header}
      </h1>
      {props.mode == "signup" ? <SignupForm /> : <LoginForm />}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wide">
          <span className="px-1 py-1 bg-white">{constants.prompt.orContinueWith}</span>
        </div>
      </div>
      <OAuthButton
        provider={oauthGoogle.provider}
        redirect={oauthGoogle.redirect}
      />
      <p>
        {props.mode == "signup" ? (
          <Link
            href="/login"
            className="text-center text-sm hover:underline"
          >
            {constants.prompt.alreadyHaveAcc}
          </Link>
        ) : (
          <Link
            href="/signup"
            className="text-center text-sm hover:underline"
          >
            {constants.prompt.doNotHaveAcc}
          </Link>
        )}
      </p>
    </div>
  );
};

export default UserAuthWidget;
