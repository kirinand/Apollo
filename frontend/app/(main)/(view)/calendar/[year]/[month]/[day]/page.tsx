import { redirect } from "next/navigation";

import EditorForm from "@/components/forms/editor-form"
import { checkPath } from "../../../utils"

const EditorPage = ({ params }: { params: { year: string, month: string, day: string } }) => {

  const { year, month, day } = params

  if (!checkPath(year, month, day)) {
    return redirect("/404")
  }

  return (
    <EditorForm year={year} month={month} day={day}/>
  )
}

export default EditorPage