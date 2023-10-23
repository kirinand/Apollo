import { getDaysInMonth } from "date-fns"

import CalendarBox from "./box"
import { monthConfig } from "@/config/calendar"


const Calendar = (props: CalendarProps) => {
  if (props.mode === "year") {
    const year = props.date.getFullYear()
    return (
      <div className="flex flex-row">
        {monthConfig.map((month, idx) => {
          return (
            <CalendarBox
              title={month}
              href={`/calendar/${year}/${(idx+1).toString().padStart(2, '0')}`}
            />
          )
        })}
      </div>
    )
  } else if (props.mode === "month") {
    const daysInMonth = getDaysInMonth(props.date)
    const year = props.date.getFullYear()
    const month = props.date.getMonth() + 1

    return (
      <div className="flex flex-row">
        {Array.from(Array(daysInMonth).keys()).map((day) => {
          const dayStr = (day+1).toString().padStart(2, '0')
          return (
            <CalendarBox
              title={dayStr}
              href={`/calendar/${year}/${month.toString().padStart(2, '0')}/${dayStr}`}
            />
          )
        })}
      </div>
    )
  } else {
    return <></>
  }
}


type CalendarProps = {
  mode: string,
  date: Date,
}

export default Calendar
