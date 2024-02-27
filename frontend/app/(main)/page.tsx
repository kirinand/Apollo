"use client"

import { getYear, getMonth, getDate } from "date-fns"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useGetRandomQuote } from "@/services/home"
import constants from "@/constants"

export default function Home() {
  const currentDate = new Date()

  const year = getYear(currentDate).toString()
  const month = (getMonth(currentDate) + 1).toString().padStart(2, '0')
  const day = getDate(currentDate).toString().padStart(2, '0')

  // const { data: [ { quote = "", author = "" } = {}] = [] } = useGetRandomQuote()

  console.log(year, month, day)

  return (
    <main className="container">
      <div className="flex flex-col mx-4 my-8 max-w-md w-full">
        <div className="flex flex-col pb-10 ps-1">
          {/* <h1 className="text-2xl pb-2">{quote}</h1>
          <p className="text-xl self-end">{`---- ${author}`}</p> */}
        </div>
        <div>
          <Link href={`/calendar/${year}/${month}/${day}`}>
            <Button variant="outline" size="lg" className="border-gray-500 text-lg">{constants.title.start}</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
