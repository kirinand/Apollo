"use client"

import { useEffect } from "react"

import { useActivate } from "@/services/auth"

const ActivatePage = ({ params }: { params: { uid: string, token: string } }) => {
  const activate = useActivate()

  useEffect(() => {
    activate.mutate(params)
  }, [])

  return (
    <h1>Activating your account</h1>
  )
}

export default ActivatePage