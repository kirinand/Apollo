"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { addMonths, addDays, getMonth, getDate } from "date-fns"

export const DateAdjuster = (props: DateAdjusterProps) => {
    let prevLink = ''
    let nextLink = ''
    let disabled = false 

    const year = props.date.getFullYear()
    const current = new Date()
    const currentYear = current.getFullYear()

    if (props.mode === "year") {
      disabled = year >= currentYear
      prevLink = `/calendar/${year - 1}`
      nextLink = disabled ? '' : `/calendar/${year + 1}`
    } else if (props.mode === "month") {
      const prevDate = addMonths(props.date, -1)
      const nextDate = addMonths(props.date, 1)
      disabled = nextDate >= current
      prevLink = `/calendar/${prevDate.getFullYear().toString().padStart(2, '0')}/${(getMonth(prevDate) + 1).toString().padStart(2, '0')}`
      nextLink = disabled ? '' : `/calendar/${nextDate.getFullYear().toString().padStart(2, '0')}/${(getMonth(nextDate) + 1).toString().padStart(2, '0')}`
    } else {
      const prevDate = addDays(props.date, -1)
      const nextDate = addDays(props.date, 1)
      console.log(prevDate.toISOString())
      disabled = nextDate >= current
      prevLink = `/calendar/${prevDate.getFullYear().toString().padStart(2, '0')}/${(getMonth(prevDate) + 1).toString().padStart(2, '0')}/${getDate(prevDate).toString().padStart(2, '0')}`
      nextLink = disabled ? '' : `/calendar/${nextDate.getFullYear().toString().padStart(2, '0')}/${(getMonth(nextDate) + 1).toString().padStart(2, '0')}/${getDate(nextDate).toString().padStart(2, '0')}`
    }

    return (
      <div>
        <Link href={prevLink}>
          <Button>
            <ChevronLeft />
          </Button>
        </Link>

        <Link href={nextLink}>
          <Button>
            <ChevronRight />
          </Button>
        </Link>
      </div>
    )
  }

type DateAdjusterProps = {
  mode: string,
  date: Date
}
  