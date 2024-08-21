import "./IframePreview.css";
import { useEffect, useRef, useState } from "react";
import compressCode from "../../../utils/compressCode";

type IframePreviewProps = {
  html: string;
  css: string;
  setDocument: (documentObj: Document) => void;
  mode: "empty" | "layout" | "paint";
};

const layoutCssStylesheet =
  "body:not(:hover), body:not(:hover) * {\n" +
  "    outline: 1px dashed #000 !important;\n" +
  "    display: block !important;\n" +
  "    background-color: transparent !important;\n" +
  "    color: transparent !important;\n" +
  "    box-sizing: border-box !important;\n" +
  "    transition: all 0.2s ease-in-out !important;\n" +
  "    user-select: none !important; /* Make text unselectable */\n" +
  "}\n" +
  "\n" +
  "/* Add transition effect */\n" +
  "body {\n" +
  "    transition: all 0.2s ease-in-out !important;\n" +
  "}";

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
