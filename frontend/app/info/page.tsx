"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { useInfoContext } from "@/providers/context/info-context-provider"

const InfoPage = () => {
  const { info, setInfo } = useInfoContext()

  if (info === '') return notFound()

  useEffect(() => {
    return () => {
      setInfo('')
    }
  })

  return (
    <div>
      <h1>{info}</h1>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </div>
  )
}

export default InfoPage