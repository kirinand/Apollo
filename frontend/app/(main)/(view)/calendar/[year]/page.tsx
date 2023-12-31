import { redirect } from "next/navigation"

import CalendarContainer from "@/components/calendar/container"
import { checkPath } from "../utils"

const YearPage = ({ params }: { params: { year: string } }) => {
  
  if (!checkPath(params.year)) {
    return redirect("/404")
  }

  const date = new Date(parseInt(params.year), 0)

  return (
    <main>
      <div>{params.year}</div>
      <CalendarContainer mode="year" date={date}/>
    </main>
  )
}

export default YearPage