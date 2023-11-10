import { format, subDays } from "date-fns"

import RadarChart from "@/components/nivo/radar-chart"
import { useGetSentiments } from "@/services/sentiments"
import Spinner from "@/components/icons/spinner"

const dateFormat = "yyyy-MM-dd"

const Polar = ({ period }: Props) => {
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
  
  const { data: { data } = {}, isLoading } = useGetSentiments(start, end)

  if (isLoading || data === undefined) {
    return <Spinner />
  }

  return (
    <RadarChart data={data} />
    
  )
}

type Props = {
  period: string 
}

export default Polar