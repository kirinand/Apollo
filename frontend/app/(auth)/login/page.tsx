import UserAuthWidget from "@/components/user-auth-widget"
import constants from "@/constants"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <UserAuthWidget
        header={constants.title.welcomeBack}
        mode="login"
      />
    </div>
  )
}