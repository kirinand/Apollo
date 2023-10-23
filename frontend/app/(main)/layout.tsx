import MainNav from "@/components/main-nav"

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