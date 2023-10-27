import { PiSpinnerThin } from "react-icons/pi";
import { cn } from "@/lib/utils";

const Spinner = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <PiSpinnerThin
        className={cn("animate-spin w-16 h-16")}
      />
    </div>
  );
};

export default Spinner;
