import { useState } from "react";
import { DayPicker } from "react-day-picker";

// https://wicky.nillia.ms/cally/

const CalendarCard = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <div className="card bg-base-100 w-fit shadow-sm">
      <div className="card-body">
        <DayPicker
          className="react-day-picker"
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </div>
    </div>
  );
};

export default CalendarCard;
