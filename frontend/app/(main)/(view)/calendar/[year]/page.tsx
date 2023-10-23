import { redirect } from "next/navigation"

import CalendarContainer from "@/components/calendar/container"
import { checkPath } from "../utils"

const YearView = ({ params }: { params: { year: string } }) => {
  
  if (!checkPath(params.year)) {
    return redirect("/404")
  }

  const year = parseInt(params.year)
  const date = new Date(parseInt(params.year), 0)

  return (
    <main>
      <CalendarContainer mode="year" date={date}/>
    </main>
  )
}

export default YearView