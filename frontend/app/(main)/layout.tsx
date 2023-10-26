import MainNav from "@/components/main-nav"
import LoginCheck from "@/components/utils/login-check"

const MainLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <LoginCheck>
      <MainNav />
      { children }
    </LoginCheck>
  )
}

export default MainLayout