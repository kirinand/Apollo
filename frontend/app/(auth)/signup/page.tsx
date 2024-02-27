import UserAuthWidget from "@/components/user-auth-widget"
import constants from "@/constants"

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <UserAuthWidget
        header={constants.title.createAcc}
        mode="signup"
      />
    </div>
     
  )
}