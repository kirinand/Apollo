import { getDaysInMonth, getDate, getMonth } from "date-fns"

import CalendarBox from "./box"
import { monthConfig } from "@/config/calendar"

const Calendar = (props: CalendarProps) => {
  const today = new Date()
  const year = props.date.getFullYear()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1

  if (props.mode === "year") {
    return (
      <div className="flex flex-row">
        {monthConfig.map((month, idx) => {
          return (
            <CalendarBox
              key={month}
              title={month}
              href={`/calendar/${year}/${(idx+1).toString().padStart(2, '0')}`}
              disabled={year === currentYear && (idx+1) > currentMonth}
            />
          )
        })}
      </div>
    )
  } else if (props.mode === "month") {
    const daysInMonth = getDaysInMonth(props.date)
    const year = props.date.getFullYear()
    const month = props.date.getMonth() + 1
    const currentDate = today.getDate()

    return (
      <div className="flex flex-row">
        {Array.from(Array(daysInMonth).keys()).map((day) => {
          const dayStr = (day+1).toString().padStart(2, '0')
          return (
            <CalendarBox
              key={dayStr}
              title={dayStr}
              href={`/calendar/${year}/${month.toString().padStart(2, '0')}/${dayStr}`}
              disabled={year === currentYear && month === currentMonth && (day+1) > currentDate}
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
