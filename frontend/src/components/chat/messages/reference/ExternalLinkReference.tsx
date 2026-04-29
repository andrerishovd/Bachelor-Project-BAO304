import {
  ArrowTopRightOnSquareIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

interface ExternalLinkReferenceProps {
  url: string;
}

/**
 * ExternalLinkReference
 *
 * Displays an external link as a reference card at the bottom of a message.
 * Similar to BookReference but for general URLs.
 */
const ExternalLinkReference = ({ url }: ExternalLinkReferenceProps) => {
  const domain = new URL(url).hostname.replace("www.", "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors group"
    >
      <div className="w-10 h-10 bg-base-300 rounded-lg flex items-center justify-center shrink-0">
        <LinkIcon className="w-5 h-5 text-base-content/40" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{domain}</p>
        <p className="text-xs text-base-content/50 truncate">{url}</p>
      </div>
      <ArrowTopRightOnSquareIcon className="w-4 h-4 shrink-0 text-base-content/30 group-hover:text-primary transition-colors" />
    </a>
  );
};

export default ExternalLinkReference;
