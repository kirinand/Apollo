import UserAuthWidget from "@/components/user-auth-widget"

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center">
      <UserAuthWidget
        header="Create your account"
        mode="signup"
      />
    </div>
     
  )
}