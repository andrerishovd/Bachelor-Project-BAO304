import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

interface HyperlinkItem {
  label: string;
  url: string;
}

const LINKS: HyperlinkItem[] = [
  {
    label: "Kristiania - Retningslinjer for bruk av KI i oppgaver",
    url: "https://egms.service-now.com/csp?id=kb_article_view&sysparm_article=KB0010368",
  },
  {
    label: "Kristiania - Kunstig intelligens og kildebruk",
    url: "https://www.kristiania.no/om-kristiania/biblioteket/skrive-og-henvise/kunstig-intelligens/",
  },
];

/**
 * HyperlinkCard
 *
 * Displays a list of external links with an icon indicating
 * that the user will be redirected to another page.
 * Links are defined in the LINKS array for easier maintenance.
 */
const HyperlinkCard = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body gap-3">
        <h2 className="card-title text-sm">{t("usefulLinks")}</h2>
        <ul className="flex flex-col gap-2">
          {LINKS.map(({ label, url }) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors group"
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4 shrink-0 text-base-content/40 group-hover:text-primary transition-colors" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HyperlinkCard;
