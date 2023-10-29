import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const CalendarBox = (props: CalendarBoxProps) => {
  return (
    <Link href={props.disabled ? '' : props.href}>
      <Card>
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </Link>
  )
}

type CalendarBoxProps = {
  title: string,
  href: string,
  disabled?: boolean,
  score?: number,
}

export default CalendarBox