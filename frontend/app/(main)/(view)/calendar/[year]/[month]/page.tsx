import { redirect } from "next/navigation";
import { format } from "date-fns";
import { ChevronLeftCircle } from "lucide-react";
import Link from "next/link"

import CalendarContainer from "@/components/calendar/container";
import { checkPath } from "../../utils";
import { DateAdjuster } from "@/components/calendar/date-adjuster";
import { Button } from "@/components/ui/button";

const MonthPage = ({ params }: { params: { year: string; month: string } }) => {

  if (!checkPath(params.year, params.month)) {
    return redirect("/404")
  }

  const date = new Date(parseInt(params.year), parseInt(params.month) - 1)
  const dateDisplay = format(date, "MMMM yyyy")

  return (
    <main className="container mt-4">
      <div className="text-lg border-b h-10">{dateDisplay}</div>
      <div className="flex items-center h-16 justify-between">
        <Link href={`/calendar/${params.year}`}>
          <Button variant="outline" size="icon">
            <ChevronLeftCircle />
          </Button>
        </Link>
        <DateAdjuster mode="month" date={date}></DateAdjuster>
      </div>
      <CalendarContainer mode="month" date={date} />
    </main>
  );
};

export default MonthPage
