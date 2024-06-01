import "./IframePreview.css";
import { useEffect, useRef } from "react";
import compressCode from "../../../utils/compressCode";

type IframePreviewProps = {
  html: string;
  css: string;
  setDocument: (documentObj: Document) => void;
};

const IframePreview = ({ html, css, setDocument }: IframePreviewProps) => {
  const compressedHtml = compressCode(html); // to not include line breaks in html as nodes in node tree
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // // oninput="i.srcdoc=h.value+'<style>'+c.value+
  // // '</style><script>'+j.value+'<\/script>'">
  //
  // // update iframe
  // useEffect(() => {
  //   if (!iframeRef.current) return;
  //   iframeRef.current.srcdoc = compressedHtml + `<style>` + css + `</style>`;
  // }, [compressedHtml, css]);

  // update html
  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument!;
      iframeDocument.open();
      iframeDocument.write(compressedHtml);
      iframeDocument.close();
    }
  }, [compressedHtml]);

  // update css
  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument!;

      // remove last style if exists
      iframeDocument.querySelector("style")?.remove();

      // insert new style element
      const styleElement = iframeDocument.createElement("style");
      styleElement.innerHTML = css;
      iframeDocument.head.appendChild(styleElement);
    }
  }, [css, html]);

  useEffect(() => {
    if (!iframeRef.current) return;
    const iframeDocument = iframeRef.current.contentDocument!;
    // console.log(iframeDocument);
    setDocument(iframeDocument);
  }, [html, css, iframeRef, setDocument]);

  return <iframe ref={iframeRef} className="iframe-preview" />;
};

export default IframePreview;
