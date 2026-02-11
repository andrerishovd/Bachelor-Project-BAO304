import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

const ChatInputField = () => {
  const { isLoading, setIsLoading } = useState<Boolean>(false);
  const { t, i18n } = useTranslation();

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder={t("enterPromt")}
        className="input flex-1"
      />

      {isLoading ? (
        <span className="loading loading-spinner loading-xs btn"></span>
      ) : (
        <button type="button" className="btn">
          <PaperAirplaneIcon/>
        </button>
      )}
    </div>
  );
};

export default ChatInputField;
