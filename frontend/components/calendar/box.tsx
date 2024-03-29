import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

const CalendarBox = (props: CalendarBoxProps) => {
  let headerColor = ""

  if (props.disabled) {
    headerColor = "text-gray-400"
  } else if (props.isCurrent) {
    headerColor = "text-yellow-500"
  }

  return (
    <Link className={cn(props.offset ? `col-start-${props.offset}` : undefined)} href={props.disabled ? '' : props.href}>
      <Card className={"py-2"}>
        <CardContent className={"text-center pb-0"}>
          <p>{props.content}</p>
        </CardContent>
        <CardHeader className={cn(headerColor)}>
          <CardTitle className={"text-center truncate py-0.5"}>{props.title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  )
}

type CalendarBoxProps = {
  title: string,
  content?: string,
  href: string,
  disabled?: boolean,
  score?: number,
  mode: string,
  isCurrent?: boolean,
  offset?: number,
}

export default CalendarBox