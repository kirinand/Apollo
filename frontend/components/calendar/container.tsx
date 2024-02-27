import { getDaysInMonth, format, startOfMonth } from "date-fns"

import CalendarBox from "./box"
import { monthConfig } from "@/config/calendar"
import { cn } from "@/lib/utils"

const Calendar = (props: CalendarProps) => {
  const today = new Date()
  const year = props.date.getFullYear()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1

  if (props.mode === "year") {
    return (
      <div className={cn("grid", "grid-cols-4")}>
        {monthConfig.map((month, idx) => {
          return (
            <CalendarBox
              key={month}
              title={month}
              href={`/calendar/${year}/${(idx+1).toString().padStart(2, '0')}`}
              disabled={year === currentYear && (idx+1) > currentMonth}
              mode={props.mode}
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
    const offset = startOfMonth(props.date).getDay() + 1

    return (
      <div className={cn("grid", "grid-cols-7")}>
        {Array.from(Array(daysInMonth).keys()).map((day) => {
          const dayStr = (day+1).toString().padStart(2, '0')
          const date = new Date(year, month-1, day+1)
          const dayInweekStr = format(date, 'EEE')

          return (
            <CalendarBox
              key={dayStr}
              title={dayStr}
              content={dayInweekStr}
              href={`/calendar/${year}/${month.toString().padStart(2, '0')}/${dayStr}`}
              disabled={year === currentYear && month === currentMonth && (day+1) > currentDate}
              mode={props.mode}
              isCurrent={year === currentYear && month === currentMonth && (day+1) === currentDate}
              {...(day === 0 ? { offset: offset } : {})}
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
