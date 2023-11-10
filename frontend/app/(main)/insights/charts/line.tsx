import { format, subDays } from "date-fns"

import LineChart from "@/components/nivo/line-chart"
import { useGetDailyScores } from "@/services/sentiments"
import Spinner from "@/components/icons/spinner"
import { DataType } from "@/components/nivo/line-chart"

const dateFormat = "yyyy-MM-dd"

const Line = ({ period }: Props) => {
  const today = new Date()
  const end = format(today, dateFormat)
  let start = ""

  switch (period) {
    case "week":
      start = format(subDays(today, 6), dateFormat)
      break
    case "month":
      start = format(subDays(today, 29), dateFormat)
      break
    case "quarter":
      start = format(subDays(today, 89), dateFormat)
      break
    case "year":
      start = format(subDays(today, 364), dateFormat)
      break
    default:
      // do nothing
  }
  
  const { data: { data } = {}, isLoading } = useGetDailyScores(start, end)

  if (isLoading || data === undefined) {
    return <Spinner />
  }

  const chartData = data.reduce((acc: Array<DataType>, obj: {date: string, score: number }) => {
    acc[0].data.push({
      x: new Date(obj.date),
      y: obj.score
    })

    return acc
  }, [{
    id: "score",
    data: []
  }])

  return (
    <LineChart data={chartData} />
  )
}

type Props = {
  period: string 
}

export default Line