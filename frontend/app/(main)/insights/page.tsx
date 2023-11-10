"use client"

import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Polar from "./charts/polar"
import Line from "./charts/line"

const defaultPeriod = "week"
const defaultTab = "radar"

const InsightPage = () => {
  const [tab, setTab] = useState(defaultTab)
  const [period, setPeriod] = useState(defaultPeriod)

  return (
    <div>
      <div>
      <Tabs defaultValue={defaultTab} className="w-[400px]" onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="radar">Polar Chart</TabsTrigger>
          <TabsTrigger value="line">Line Chart</TabsTrigger>
        </TabsList>
      </Tabs>
      </div>
      <div>
        <Select defaultValue={defaultPeriod} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="quarter">Quarter</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div style={{ height: 400 }}>
        {tab === "radar" && <Polar period={period}/>}
        {tab === "line" && <Line period={period}/>}
      </div>
    </div>
  )
}

export default InsightPage