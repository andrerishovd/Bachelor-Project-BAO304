import { useState } from "react";
import { DayPicker, type Locale } from "react-day-picker";
import { nb, enGB } from "date-fns/locale";
import { useTranslation } from "react-i18next";
// https://wicky.nillia.ms/cally/

const CalendarCard = () => {
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState<Date | undefined>();

  const calendarLocale = i18n.language === "no" ? nb : enGB;

  return (
    <div className="card card-border bg-base-100 w-fit shadow-sm">
      <div className="card-body">
        <DayPicker
          className="react-day-picker"
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={calendarLocale}
        />
      </div>
    </div>
  );
};

export default CalendarCard;
