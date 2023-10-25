"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useCreateEntry } from "@/services/journal"

const EditorForm = (props: EditorFormProps) => {
  const createEntry = useCreateEntry()
  
  const submitForm = async (data: FormData) => {
    const date = props.date
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate().toString()
    const content = data.get('content')?.valueOf().toString()
    // console.log(data.get('content')?.valueOf(),year, month, day)
    if (content) {
      const result = createEntry.mutate({ content, year, month, day })
    }
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <form action={submitForm}>
        <Textarea name='content' placeholder="Start writing..." />
        <Button type="submit">Save</Button>
      </form> 
  </div>
  )
}

type EditorFormProps = {
  date: Date,
}

export default EditorForm