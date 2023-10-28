import { redirect } from "next/navigation";

import EditorForm from "@/components/forms/editor-form"
import { checkPath } from "../../../utils"

const EditorPage = ({ params }: { params: { year: string, month: string, day: string } }) => {

  if (!checkPath(params.year, params.month, params.day)) {
    return redirect("/404")
  }

  const date = new Date(parseInt(params.year), parseInt(params.month) - 1, parseInt(params.day))

  return (
    <EditorForm date={date}/>
  )
}

export default EditorPage