import { redirect } from "next/navigation"

import CalendarContainer from "@/components/calendar/container"
import { checkPath } from "../utils"
import { DateAdjuster } from "@/components/calendar/date-adjuster"

const YearPage = ({ params }: { params: { year: string } }) => {
  
  if (!checkPath(params.year)) {
    return redirect("/404")
  }

  const date = new Date(parseInt(params.year), 0)

  return (
    <main className="container mt-4">
      <div className="text-lg border-b h-10">{params.year}</div>
      <div className="flex items-center h-16 justify-end">
        <DateAdjuster mode="year" date={date}></DateAdjuster>
      </div>
      <CalendarContainer mode="year" date={date}/>
    </main>
  )
}

export default YearPage