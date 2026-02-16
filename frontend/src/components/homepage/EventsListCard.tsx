import { useTranslation } from "react-i18next";

interface IEvent {
  id: number;
  title: string;
  date: Date;
}

// ✅ Hjelpefunksjon for å beregne dager til hendelse
const getDaysUntil = (date: Date): number => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// ✅ Fargekoding basert på dager til hendelse
const getUrgencyStyle = (daysUntil: number) => {
  if (daysUntil <= 1) return "text-error"; // I dag / i morgen
  if (daysUntil <= 3) return "text-warning"; // Innen 3 dager
  return "text-success"; // God tid
};

// ✅ Formatert dato og tid
const formatDate = (date: Date): string => {
  return date.toLocaleDateString("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("nb-NO", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDaysUntil = (daysUntil: number): string => {
  if (daysUntil < 0) return "Passert";
  if (daysUntil === 0) return "I dag";
  if (daysUntil === 1) return "I morgen";
  return `Om ${daysUntil} dager`;
};

// Mock data - bytt ut med Canvas API senere
const mockEvents: IEvent[] = [
  {
    id: 1,
    title: "Forelesning PS300",
    date: new Date(Date.now() + 1000 * 60 * 60 * 2), // Om 2 timer
  },
  {
    id: 2,
    title: "Innlevering BAO304",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24), // I morgen
  },
  {
    id: 3,
    title: "Gruppearbeid",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // Om 3 dager
  },
  {
    id: 4,
    title: "Eksamen PG5602",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // Om 14 dager
  },
];

const EventsListCard = () => {
  const { t } = useTranslation("common");

  // ✅ Tell hendelser som skjer snart (innen 3 dager)
  const urgentCount = mockEvents.filter(
    (e) => getDaysUntil(e.date) <= 3,
  ).length;

  return (
    <div className="card card-border w-96 bg-base-100 shadow-sm">
      <div className="card-body">
        {/* Badge showing urgent tasks. */}
        {urgentCount > 0 && (
          <span className="badge badge-xs badge-warning">
            {urgentCount} hendelse{urgentCount > 1 ? "r" : ""} snart
          </span>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">{t("upcomingEvents")}</h2>
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
                {/* ✅ Farget ikon basert på haster */}
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

                {/* Date and time */}
                <div className="flex flex-col items-end gap-0.5 shrink-0">
                  <span className="text-base-content/70">
                    {formatDate(event.date)} {formatTime(event.date)}
                  </span>
                  <span className={`font-semibold ${urgencyStyle}`}>
                    {formatDaysUntil(daysUntil)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          <button className="btn btn-primary btn-block">{t("seeAll")}</button>
        </div>
      </div>
    </div>
  );
};

export default EventsListCard;
