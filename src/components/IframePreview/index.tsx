import "./IframePreview.css";
import { useEffect, useRef } from "react";

type IframePreviewProps = {
  html: string;
  css: string;
};

const IframePreview = ({ html, css }: IframePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument!;
      iframeDocument.open();
      iframeDocument.write(html);
      iframeDocument.close();
    }
  }, [html]);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument!;
      const styleElement = iframeDocument.createElement("style");
      styleElement.innerHTML = css;
      iframeDocument.head.appendChild(styleElement);
    }
  }, [css, html]);

  return <iframe ref={iframeRef} className="iframe-preview" />;
};

export default IframePreview;
