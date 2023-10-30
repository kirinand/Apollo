import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import RadarChart from "@/components/nivo/radar-chart"

const dummy = 
  [
    {
        "id": 0,
        "name": "admiration",
        "count": 1
    },
    {
        "id": 13,
        "name": "excitement",
        "count": 1
    },
    {
        "id": 14,
        "name": "fear",
        "count": 1
    },
    {
        "id": 17,
        "name": "joy",
        "count": 1
    },
    {
        "id": 26,
        "name": "surprise",
        "count": 2
    },
    {
        "id": 27,
        "name": "neutral",
        "count": 1
    }
  ]


const InsightPage = () => {
  return (
    <div>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Week</SelectItem>
            <SelectItem value="dark">Month</SelectItem>
            <SelectItem value="system">Quarter</SelectItem>
            <SelectItem value="system">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div style={{ height: 400 }}>
        <RadarChart data={dummy} />
      </div>
    </div>
  )
}

export default InsightPage