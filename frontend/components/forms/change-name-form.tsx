"use client"
import { useEffect, useRef, useState } from "react";
import z from "zod"

import { Button } from "@/components/ui/button"
import { nameSchema } from "@/lib/validation-schemas"
import { useUpdateName } from "@/services/auth"
import { Input } from "@/components/ui/input"
import constants from "@/constants";

const ChangeNameForm = (props: Props) => {
  const { name, isEditable, setEditable } = props
  const [nameVal, setNameVal] = useState(name)
  const [error, setError] = useState("")
  const updateName = useUpdateName()
  const inputRef = useRef<HTMLInputElement>(null)
  
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      nameSchema.parse({ name: nameVal })
    }
    catch (err) {
      console.log(err)
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      }
      return
    }
    
    updateName.mutateAsync({ name: nameVal })
      .catch(() => {
        setNameVal(props.name)
      })
    setError("")
    setEditable(false)
  }

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable, inputRef])

  return (
    <div>
      <form onSubmit={submitForm} className="flex flex-col space-y-4">
        <Input 
          ref={inputRef}
          value={nameVal} 
          onChange={(e) => {
            setNameVal(e.target.value)
          }}
          disabled={!isEditable} 
        />
        {error && <p>{error}</p>}
        {isEditable
          ? (<div className="flex space-x-4">
              <Button type="submit">Save</Button>
              <Button
                onClick={() => {
                  setEditable(false)
                  setNameVal(props.name)
                  setError("")
                }}
              >
                Cancel
              </Button>
            </div>
          )
          : null
        }
      </form> 
    </div>
  )
}

type Props = {
  name: string,
  isEditable: boolean,
  setEditable: (isEditable: boolean) => void,
}

export default ChangeNameForm