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
  onBack: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

/**
 * PodcastSettingsStep
 *
 * Step 2 of podcast generation.
 * Allows users to configure length, tone, speakers and language.
 *
 * @property settings - Current settings state
 * @property onChange - Callback when settings change
 * @property onBack - Callback to go back to content step
 * @property onGenerate - Callback to start generation
 * @property isGenerating - Whether generation is in progress
 */
const PodcastSettingsStep = ({
  settings,
  onChange,
  onBack,
  onGenerate,
  isGenerating,
}: PodcastSettingsStepProps) => {
  const { t } = useTranslation("podcast");

  const update = <K extends keyof PodcastSettings>(
    key: K,
    value: PodcastSettings[K],
  ) => onChange({ ...settings, [key]: value });

  return (
    <div className="flex flex-col h-full overflow-hidden items-center">
      <div className="flex flex-col h-full overflow-hidden w-full max-w-2xl">
        {/* Header */}
        <div className="border-b border-base-300 p-4 shrink-0">
          <h1 className="text-2xl font-bold">{t("settings")}</h1>
          <p className="text-sm text-base-content/60 mt-1">
            {t("settingsDescription")}
          </p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6 flex flex-col gap-6">
          {/* Length */}
          <section className="flex flex-col gap-2">
            <label className="font-medium text-sm">{t("length")}</label>
            <div className="flex gap-2">
              {(["short", "medium", "long"] as PodcastLength[]).map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => update("length", option)}
                    className={`btn flex-1 ${
                      settings.length === option ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {t(`length_${option}`)}
                  </button>
                ),
              )}
            </div>
            <p className="text-xs text-base-content/50">
              {t(`length_${settings.length}_description`)}
            </p>
          </section>

          <div className="divider my-0" />

          {/* Tone */}
          <section className="flex flex-col gap-2">
            <label className="font-medium text-sm">{t("tone")}</label>
            <div className="flex gap-2">
              {(["formal", "casual"] as PodcastTone[]).map((option) => (
                <button
                  key={option}
                  onClick={() => update("tone", option)}
                  className={`btn flex-1 ${
                    settings.tone === option ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {t(`tone_${option}`)}
                </button>
              ))}
            </div>
          </section>

          <div className="divider my-0" />

          {/* Speakers */}
          <section className="flex flex-col gap-2">
            <label className="font-medium text-sm">{t("speakers")}</label>
            <div className="flex gap-2">
              {([1, 2] as PodcastSpeakers[]).map((option) => (
                <button
                  key={option}
                  onClick={() => update("speakers", option)}
                  className={`btn flex-1 ${
                    settings.speakers === option ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {t(`speakers_${option}`)}
                </button>
              ))}
            </div>
          </section>

          <div className="divider my-0" />

          {/* Language */}
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

        {/* Footer */}
        <div className="border-t border-base-300 p-4 shrink-0 flex justify-between">
          <button onClick={onBack} className="btn btn-ghost">
            {t("back")}
          </button>
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="btn btn-primary"
          >
            {isGenerating ? (
              <>
                <span className="loading loading-spinner loading-xs" />
                {t("generating")}
              </>
            ) : (
              t("generate")
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PodcastSettingsStep;
