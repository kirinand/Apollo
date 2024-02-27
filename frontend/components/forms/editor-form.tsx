"use client"

import { useRef, useEffect, useState } from "react"
import format from "date-fns/format"

import { Textarea } from "@/components/ui/textarea"
import { useUpsertEntry, useGetEntry, useAnalyseEntry } from "@/services/journal"
import { useToast } from "@/components/ui/use-toast"
import Spinner from "@/components/icons/spinner"
import constants from "@/constants"

const EditorForm = (props: EditorFormProps) => {
  const { year, month, day } = props
  const { toast } = useToast()

  const { data: { entry } = {}, isLoading, isSuccess, isError, error } = useGetEntry(year, month, day)
  const upsertEntry = useUpsertEntry()
  const analyseEntry = useAnalyseEntry()
  const [ content, setContent ] = useState("")
  const [ saveState, setSaveState ] = useState({
    status: 1,
    lastSaved: 0,
  })
  const timeoutId = useRef<any>(null)
  const isEntryLoaded = useRef(false)
  const isEdited = useRef(false)

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (isEdited.current) {
      analyseEntry.mutate({ year, month, day })
    }
  }

  // fill content on mount
  useEffect(() => {
    if (entry) {
      setContent(entry.content)
    }
  }, [entry])

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        isEntryLoaded.current = true
      })
    }
  }, [isSuccess, isError])

   // save content when user stops typing for 2 second
  useEffect(() => {
    if (isEntryLoaded.current) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
      if (!isEdited.current) {
        isEdited.current = true
      }
      if (saveState.status) {
        setSaveState(prev => ({ ...prev, status: 0 }))
      }

      const newTimeoutId = setTimeout(() => {
        setSaveState(prev => ({ ...prev, status: 2 }))
        upsertEntry.mutateAsync({ content, year, month, day })
          .then(() => {
            setSaveState({
              status: 1,
              lastSaved: Date.now(),
            })
          })
          .catch(() => {
            setSaveState(prev => ({ ...prev, status: 0 }))
          })
      }, 2000)

      timeoutId.current = newTimeoutId

      return () => {
        if (timeoutId.current) clearTimeout(timeoutId.current)
      }
    }
  }, [content])

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      analyseEntry.mutate({ year, month, day })
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (isError && (error as any)?.response?.status !== 404) {
    toast({ description: constants.err.getEntryFail })
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <div>{
        isEdited.current ? 
        (() => {
          switch (saveState.status) {
            case 0:
              return constants.msg.unsavedChanges
            case 1:
              return constants.msg.lastSaved.replace('{0}', format(saveState.lastSaved, 'HH:mm'))
            case 2:
              return constants.msg.saving
            default:
              return ''
          }
        })()
        : ''
      }</div>
      <Textarea 
        name='content' 
        placeholder={constants.msg.startWriting} 
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  )
}

type EditorFormProps = {
  year: string,
  month: string,
  day: string,
}

export default EditorForm