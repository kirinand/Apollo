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
import constants from "@/constants"

const defaultPeriod = "week"
const defaultTab = "radar"

const InsightPage = () => {
  const [tab, setTab] = useState(defaultTab)
  const [period, setPeriod] = useState(defaultPeriod)

  return (
    <div className="container pt-4">
      <div className="flex w-full justify-between">
        <div>
          <Tabs defaultValue={defaultTab} className="w-[400px]" onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="radar">{constants.label.polarChart}</TabsTrigger>
              <TabsTrigger value="line">{constants.label.lineChart}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>
          <Select defaultValue={defaultPeriod} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">{constants.label.week}</SelectItem>
              <SelectItem value="month">{constants.label.month}</SelectItem>
              <SelectItem value="quarter">{constants.label.quarter}</SelectItem>
              <SelectItem value="year">{constants.label.year}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div style={{ height: 400 }}>
        {tab === "radar" && <Polar period={period}/>}
        {tab === "line" && <Line period={period}/>}
      </div>
    </div>
  )
}

export default InsightPage