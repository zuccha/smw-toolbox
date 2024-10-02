import { ExternalLinkIcon } from "lucide-preact";
import "./external-link.css";

type ExternalLinkProps = {
  href: string;
  label: string;
};

export default function ExternalLink({ href, label }: ExternalLinkProps) {
  return (
    <a className="ExternalLink" href={href} target="_blank">
      {label} <ExternalLinkIcon size="0.8em" />
    </a>
  );
}
