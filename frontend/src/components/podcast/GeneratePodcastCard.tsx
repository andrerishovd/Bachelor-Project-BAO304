import { useTranslation } from "react-i18next";
import { Microphone } from "tabler-icons-react";

import { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";

const GeneratePodcastCard = () => {
  const { t } = useTranslation("podcast");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="card bg-base-100 w-64 shadow-sm border border-base-300">
      <div className="card-body p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <SparklesIcon className="size-4 text-primary" aria-hidden="true" />
          <h3 className="font-semibold text-sm">{t("generatePodcast")}</h3>
        </div>

        {/* Mikrofon med hover-effekt */}
        <div
          className="relative flex items-center justify-center py-6 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Regnbue-gradient bakgrunn (vises ved hover) */}
          <div
            className={`
              absolute inset-0 rounded-full blur-xl transition-opacity duration-500
              bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500
              ${isHovered ? "opacity-60 animate-pulse" : "opacity-0"}
            `}
          />

          {/* Mikrofon-ikon */}
          <Microphone
            className={`
              size-16 relative z-10 transition-all duration-300
              ${isHovered ? "text-primary scale-110" : "text-base-content"}
            `}
            aria-hidden="true"
          />
        </div>

        {/* Beskrivelse */}
        <p className="text-xs text-base-content/70 text-center">
          {t("generateDescription")}
        </p>

        {/* Generer-knapp */}
        <button className="btn btn-primary btn-sm mt-2">{t("generate")}</button>
      </div>
    </div>
  );
};

export default GeneratePodcastCard;
