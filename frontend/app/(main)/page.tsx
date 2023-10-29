import { getYear, getMonth, getDay } from "date-fns"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import constants from "@/constants"

export default function Home() {
  const currentDate = new Date()

  const year = getYear(currentDate).toString()
  const month = getMonth(currentDate).toString().padStart(2, '0')
  const day = getDay(currentDate).toString().padStart(2, '0')

  return (
    <main>
      <h1>Home</h1>
      <Link href={`/calendar/${year}/${month}/${day}`}>
        <Button>{constants.title.start}</Button>
      </Link>
    </main>
  )
}
