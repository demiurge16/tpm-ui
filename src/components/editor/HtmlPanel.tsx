import sanitizeHtml from "sanitize-html";

interface HtmlPanelProps {
  html: string;
}

// TODO - add sanitization
export const HtmlPanel = ({ html }: HtmlPanelProps) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
