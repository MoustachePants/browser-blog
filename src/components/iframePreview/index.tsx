import { useEffect, useRef } from "react";

type IframePreviewProps = {
  code: string;
};

const IframePreview = ({ code }: IframePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument!;
      iframeDocument.open();
      iframeDocument.write(code);
      iframeDocument.close();
    }
  }, [code]);

  return <iframe ref={iframeRef} />;
};

export default IframePreview;
