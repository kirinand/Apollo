import UserAuthWidget from "@/components/user-auth-widget"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center">
      <UserAuthWidget
        header="Welcome back"
        mode="login"
      />
    </div>
  )
}