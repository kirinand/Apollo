import { redirect } from "next/navigation"
import { format } from "date-fns"

import EditorForm from "@/components/forms/editor-form"
import { checkPath } from "../../../utils"

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
      <EditorForm year={year} month={month} day={day}/>
    </main>

  )
}

export default EditorPage