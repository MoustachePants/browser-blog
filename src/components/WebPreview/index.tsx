import "./WebPreview.css";

import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

type WebPreviewProps = {
  code: string;
};

const WebPreview = ({ code }: WebPreviewProps) => {
  return (
    <section className="web-preview-container">
      <LiveProvider code={code}>
        {/*<LiveEditor />*/}
        {/*<LiveError />*/}
        <LivePreview />
      </LiveProvider>
    </section>
  );
};

export default WebPreview;
