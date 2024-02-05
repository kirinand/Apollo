import { redirect } from "next/navigation"
import { format } from "date-fns"
import Link from "next/link"
import { ChevronLeftCircle } from "lucide-react"

import EditorForm from "@/components/forms/editor-form"
import { checkPath } from "../../../utils"
import { DateAdjuster } from "@/components/calendar/date-adjuster"
import { Button } from "@/components/ui/button"

const EditorPage = ({ params }: { params: { year: string, month: string, day: string } }) => {

  const { year, month, day } = params

  if (!checkPath(year, month, day)) {
    return redirect("/404")
  }

  const date = new Date(parseInt(params.year), parseInt(params.month) - 1, parseInt(params.day))
  const dateDisplay = format(date, "d MMMM, yyyy")

  return (
    <main>
      <div>{dateDisplay}</div>
      <Link href={`/calendar/${year}/${month}`}>
        <Button>
          <ChevronLeftCircle />
        </Button>
      </Link>
      <DateAdjuster date={date} mode='day'></DateAdjuster>
      <EditorForm year={year} month={month} day={day}/>
    </main>

  )
}

export default EditorPage