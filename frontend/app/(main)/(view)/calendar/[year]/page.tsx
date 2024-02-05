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
    <main>
      <div>{params.year}</div>
      <DateAdjuster mode="year" date={date}></DateAdjuster>
      <CalendarContainer mode="year" date={date}/>
    </main>
  )
}

export default YearPage