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

const AppContext = createContext<ContextPropsType>({
  user: null,
  setUser: () => null,
})

export const AppContextProvider = ({ children } : { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(null)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)