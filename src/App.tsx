import "./App.css";

import CodeEditor from "./components/CodeEditor";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import IframePreview from "./components/IframePreview";
import Section from "./components/UI/Section";
import Tree from "./components/UI/Tree";
import getDomTree from "./utils/getDomTree";
import TreeNode from "./types/TreeNode";
import renderDomNode from "./utils/renderDomNode";

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

  const [domNodes, setDomNodes] = useState<TreeNode>();
  useEffect(() => {
    setDomNodes(getDomTree(document.documentElement));
  }, []);

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
      {domNodes && (
        <Section>
          <Tree>{renderDomNode(domNodes)}</Tree>
          {/*<ul>{renderDomNode(domNodes)}</ul>*/}
        </Section>
      )}
    </div>
  );
}

export default App;
