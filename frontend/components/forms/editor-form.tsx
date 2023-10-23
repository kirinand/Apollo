import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const EditorForm = (props: EditorFormProps) => {

  

  return (
    <div className="flex flex-col w-full gap-2">
      <form>
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