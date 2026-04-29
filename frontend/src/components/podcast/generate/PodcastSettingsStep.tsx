// src/pages/podcast/PodcastSettingsStep.tsx
import { useTranslation } from "react-i18next";

export type PodcastLength = "short" | "medium" | "long";
export type PodcastTone = "formal" | "casual";
export type PodcastSpeakers = 1 | 2;

export interface PodcastSettings {
  length: PodcastLength;
  tone: PodcastTone;
  speakers: PodcastSpeakers;
  language: string;
}

interface PodcastSettingsStepProps {
  settings: PodcastSettings;
  onChange: (settings: PodcastSettings) => void;
}

/**
 * PodcastSettingsStep
 *
 * Right panel of the podcast generator.
 * Handles settings: length, tone, speakers, and language.
 */
const PodcastSettingsStep = ({
  settings,
  onChange,
}: PodcastSettingsStepProps) => {
  const { t } = useTranslation("podcast");

  const update = <K extends keyof PodcastSettings>(
    key: K,
    value: PodcastSettings[K],
  ) => onChange({ ...settings, [key]: value });

  return (
    <div className="p-6 flex flex-col gap-6 overflow-y-auto">
      <h2 className="font-semibold">{t("stepSettings")}</h2>

      <section className="flex flex-col gap-2">
        <label className="font-medium text-sm">{t("length")}</label>
        <div className="flex gap-2">
          {(["short", "medium", "long"] as const).map((option) => (
            <button
              key={option}
              onClick={() => update("length", option)}
              className={`btn flex-1 btn-sm ${settings.length === option ? "btn-primary" : "btn-outline"}`}
            >
              {t(`length_${option}`)}
            </button>
          ))}
        </div>
        <p className="text-xs text-base-content/50">
          {t(`length_${settings.length}_description`)}
        </p>
      </section>

      <div className="divider my-0" />

      <section className="flex flex-col gap-2">
        <label className="font-medium text-sm">{t("tone")}</label>
        <div className="flex gap-2">
          {(["formal", "casual"] as const).map((option) => (
            <button
              key={option}
              onClick={() => update("tone", option)}
              className={`btn flex-1 btn-sm ${settings.tone === option ? "btn-primary" : "btn-outline"}`}
            >
              {t(`tone_${option}`)}
            </button>
          ))}
        </div>
      </section>

      <div className="divider my-0" />

      <section className="flex flex-col gap-2">
        <label className="font-medium text-sm">{t("speakers")}</label>
        <div className="flex gap-2">
          {([1, 2] as const).map((option) => (
            <button
              key={option}
              onClick={() => update("speakers", option)}
              className={`btn flex-1 btn-sm ${settings.speakers === option ? "btn-primary" : "btn-outline"}`}
            >
              {t(`speakers_${option}`)}
            </button>
          ))}
        </div>
      </section>

      <div className="divider my-0" />

      <section className="flex flex-col gap-2">
        <label className="font-medium text-sm">{t("language")}</label>
        <select
          className="select select-bordered w-full"
          value={settings.language}
          onChange={(e) => update("language", e.target.value)}
        >
          <option value="no">Norsk</option>
          <option value="en">English</option>
        </select>
      </section>
    </div>
  );
};

export default PodcastSettingsStep;
