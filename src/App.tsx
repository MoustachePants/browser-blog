import "./App.css";

import CodeEditor from "./components/CodeEditor";
import { useState } from "react";
import IframePreview from "./components/IframePreview";
import Section from "./components/UI/Section";

function App() {
  const defaultHtml = `
<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>This is a Heading</h1>
        <p class="red-background">This is a paragraph.</p>
    </body>
</html>`;

  const defaultCss = `.red-background {
  background-color: red;
}
`;

  const [htmlCode, setHtmlCode] = useState<string>(defaultHtml);
  const [cssCode, setCssCode] = useState<string>(defaultCss);

  return (
    <div className="App">
      <Section>
        <CodeEditor
          code={htmlCode}
          setCode={setHtmlCode}
          title={"HTML"}
          type="html"
        />
        <CodeEditor
          code={cssCode}
          setCode={setCssCode}
          title={"CSS"}
          type="css"
        />
      </Section>
      <Section>
        <IframePreview html={htmlCode} css={cssCode} />
      </Section>
    </div>
  );
}

export default App;
