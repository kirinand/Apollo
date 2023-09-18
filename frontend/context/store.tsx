'use client'

import { 
  createContext, 
  useContext, 
  useState,
  Dispatch,
  SetStateAction
} from "react";

import { UserType } from "@/types";

type ContextPropsType = {
  user: UserType,
  setUser: Dispatch<SetStateAction<UserType>>
}

const defaultUser: UserType = {
  username: '',
  email: '',
  name: '',
  isLoggedIn: false,
}

const AppContext = createContext<ContextPropsType>({
  user: defaultUser,
  setUser: () => null,
})

export const AppContextProvider = ({ children } : { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(defaultUser)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)