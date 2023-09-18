import MainNav from "@/components/main-nav"
import { redirect } from 'next/navigation'

const MainLayout = ({ children }: {
  children: React.ReactNode
}) => {
  
 

  return (
    <div>
      <MainNav />
      { children }
    </div>
  )
}

export default MainLayout