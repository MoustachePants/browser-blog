// import "./App.css";

import EditorContainer from "./components/EditorContainer";
import WebPreview from "./components/WebPreview";
import { useState } from "react";
import IframePreview from "./components/iframePreview";

function App() {
  const defaultHtml = `
<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>This is a Heading</h1>
        <p>This is a paragraph.</p>
    </body>
</html>`;
  const [htmlCode, setHtmlCode] = useState<string>(defaultHtml);

  return (
    <div className="App">
      <EditorContainer code={htmlCode} setCode={setHtmlCode} />
      {/*<WebPreview code={htmlCode} />*/}
      <IframePreview code={htmlCode} />
    </div>
  );
}

export default App;
