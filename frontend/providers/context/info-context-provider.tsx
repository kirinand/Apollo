'use client'

import { 
  createContext, 
  useContext, 
  useState,
  Dispatch,
  SetStateAction
} from "react";

type ContextPropsType = {
  info: String,
  setInfo: Dispatch<SetStateAction<String>>
}

const InfoContext = createContext<ContextPropsType>({
  info: '',
  setInfo: () => null,
})

export const InfoContextProvider = ({ children } : { children: React.ReactNode }) => {
  const [info, setInfo] = useState<String>('')

  return (
    <InfoContext.Provider value={{ info, setInfo }}>
      {children}
    </InfoContext.Provider>
  )
}

export const useInfoContext = () => useContext(InfoContext)
