import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const NewEntry = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <Textarea placeholder="Start writing..." />
      <Button>Save</Button>
    </div>
  )
}

export default NewEntry