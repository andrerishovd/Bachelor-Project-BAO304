import { useTranslation } from "react-i18next";
import {
  formatCalendarDate,
  formatCalendarTime,
  formatDaysUntil,
  getDaysUntil,
} from "../../utils/formatTime";

interface IEvent {
  id: number;
  title: string;
  date: Date;
}

/**
 * Returns a Tailwind color class based on urgency.
 * - Red: today or tomorrow
 * - Yellow: within 3 days
 * - Green: more than 3 days away
 *
 * @param daysUntil - Number of days until the event
 */
const getUrgencyStyle = (daysUntil: number): string => {
  if (daysUntil <= 1) return "text-error";
  if (daysUntil <= 3) return "text-warning";
  return "text-success";
};

/**
 * TODO: Replace with real data from the Canvas API when integration is ready.
 * @see https://canvas.instructure.com/doc/api/
 */
const mockEvents: IEvent[] = [
  {
    id: 1,
    title: "Forelesning PS300",
    date: new Date(Date.now() + 1000 * 60 * 60 * 2),
  },
  {
    id: 2,
    title: "Innlevering BAO304",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
  {
    id: 3,
    title: "Gruppearbeid",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: 4,
    title: "Eksamen PG5602",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
  },
];

/**
 * EventsListCard
 *
 * Displays a list of upcoming events with color-coded urgency indicators.
 * Events are color-coded based on how soon they occur:
 * - Red: today or tomorrow
 * - Yellow: within 3 days
 * - Green: more than 3 days away
 *
 * Shows a warning badge when one or more events are happening soon.
 *
 * TODO: Replace mock data with real events from the Canvas API.
 *
 * @example
 * <EventsListCard />
 *
 * @deprecated Was deemed unesessary for the intended userbase (web based student),
 * but has been kept if it the solution is to be further developed and opened for a wider userbase
 * Would also need further integration with TimeEdit or Canvas Calendar to be of any use.
 *
 */

const EventsListCard = () => {
  const { t } = useTranslation(["common", "dashboard"]);

  const urgentCount = mockEvents.filter(
    (e) => getDaysUntil(e.date) <= 3,
  ).length;

  return (
    <div className="card card-border w-96 bg-base-100 shadow-sm">
      <div className="card-body">
        {/* Badge showing number of urgent upcoming events */}
        {urgentCount > 0 && (
          <span className="badge badge-xs badge-warning">
            {t("dashboard:urgentEvents", { count: urgentCount })}
          </span>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">
            {t("dashboard:upcomingEvents")}
          </h2>
        </div>

        <ul className="mt-6 flex flex-col gap-3 text-xs">
          {mockEvents.map((event) => {
            const daysUntil = getDaysUntil(event.date);
            const urgencyStyle = getUrgencyStyle(daysUntil);

            return (
              <li
                key={event.id}
                className="flex items-center justify-between gap-2"
              >
                {/* Calendar icon color-coded by urgency */}
                <div className="flex items-center gap-2 flex-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`size-4 shrink-0 ${urgencyStyle}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">{event.title}</span>
                </div>

                {/* Date, time and relative urgency label */}
                <div className="flex flex-col items-end gap-0.5 shrink-0">
                  <span className="text-base-content/70">
                    {formatCalendarDate(event.date)}{" "}
                    {formatCalendarTime(event.date)}
                  </span>
                  <span className={`font-semibold ${urgencyStyle}`}>
                    {formatDaysUntil(daysUntil, t)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          <button className="btn btn-primary btn-block">
            {t("common:seeAll")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsListCard;
