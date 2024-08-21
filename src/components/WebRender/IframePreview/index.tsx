import "./IframePreview.css";
import { useEffect, useRef } from "react";
import compressCode from "../../../utils/compressCode";

type IframePreviewProps = {
  html: string;
  css: string;
  setDocument: (documentObj: Document) => void;
  mode: "empty" | "layout" | "paint";
};

const layoutCssStylesheet = `body:not(:hover), body:not(:hover) * {
    outline: 1px dashed #000 !important;
    background-color: transparent !important;
    background: transparent !important;
    color: transparent !important;
    transition: all 0.2s ease-in-out !important;
    user-select: none !important; /* Make text unselectable */
    box-shadow: none !important;
    text-shadow: none !important;
    filter: none !important;
    transform: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    position: static !important;
    border-radius: 0 !important;
    border: none !important;
}`;

const IframePreview = ({
  html,
  css,
  setDocument,
  mode,
}: IframePreviewProps) => {
  const compressedHtml = compressCode(html); // to not include line breaks in html as nodes in node tree
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Single effect to update the iframe content
  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument!;

      // Reset iframe content
      iframeDocument.open();
      iframeDocument.write(compressedHtml);
      iframeDocument.close();

      // remove last style if exists
      iframeDocument.querySelector("style")?.remove();

      // insert new style element
      const styleElement = iframeDocument.createElement("style");
      styleElement.innerHTML = css;
      iframeDocument.head.appendChild(styleElement);

      //if mode layout
      if (mode === "layout") {
        const layoutStyleElement = iframeDocument.createElement("style");
        layoutStyleElement.innerHTML = layoutCssStylesheet;
        iframeDocument.head.appendChild(layoutStyleElement);
      }

      // Set the document object for the parent component
      setDocument(iframeDocument);
    }
  }, [compressedHtml, css, mode]);

  let className: string;
  switch (mode) {
    case "empty": {
      className = "iframe-preview iframe-empty";
      break;
    }
    case "layout": {
      className = "iframe-preview iframe-layout";
      break;
    }
    case "paint": {
      className = "iframe-preview iframe-paint";
      break;
    }
  }

  return (
    <div className="iframe-container">
      <iframe ref={iframeRef} className={className} />
    </div>
  );
};

export default IframePreview;
