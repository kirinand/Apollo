import { redirect } from "next/navigation";
import { format } from "date-fns";

import CalendarContainer from "@/components/calendar/container";
import { checkPath } from "../../utils";

const MonthPage = ({ params }: { params: { year: string; month: string } }) => {

  if (!checkPath(params.year, params.month)) {
    return redirect("/404")
  }

  const date = new Date(parseInt(params.year), parseInt(params.month) - 1)
  const dateDisplay = format(date, "MMMM yyyy")

  return (
    <main>
      <div>{dateDisplay}</div>
      <CalendarContainer mode="month" date={date} />
    </main>
  );
};

export default MonthPage
