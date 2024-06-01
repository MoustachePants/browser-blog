import "./App.css";

import CodeEditor from "./components/CodeEditor";
import React, { useEffect, useState } from "react";
import IframePreview from "./components/IframePreview";
import Tree from "./components/UI/Tree";
import NodeTreeNode from "./types/NodeTreeNode";
import getNodeTree from "./utils/getNodeTree";
import NodeTreeNodes from "./components/NodeTreeNodes";
import DevSection from "./components/UI/DevSection";
import CssTree from "./components/CssTree";
import DomTree from "./components/DomTree";
import RenderTree from "./components/RenderTree";

function App() {
  const defaultHtml = `
<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>This is a Heading</h1>
        <!--  html comment -->
        <p class="red-background">This is a paragraph.</p>
    </body>
</html>`;

  const defaultCss = `.red-background {
  background-color: red;
}

.box, .x {
  border: 0ch;
}
`;

  const [htmlCode, setHtmlCode] = useState<string>(defaultHtml);
  const [cssCode, setCssCode] = useState<string>(defaultCss);
  const [iframeDocument, setIframeDocument] = useState<Document>();
  const [nodeNode, setNodeNode] = useState<NodeTreeNode>();

  // BUG
  // shouldn't write here html and css code. not best practice.
  // this should trigger because the iframeDocument is changed
  useEffect(() => {
    if (!iframeDocument) return;
    const nodeNodes = getNodeTree(iframeDocument.documentElement);
    setNodeNode(nodeNodes);
  }, [iframeDocument, htmlCode, cssCode]);

  const changeHtmlHandler = (html: string) => {
    setHtmlCode(html);
  };

  const changeCssHandler = (css: string) => {
    setCssCode(css);
  };

  return (
    <div className="App">
      <DevSection name="Html Editor" display={true}>
        <CodeEditor
          code={htmlCode}
          onCodeChange={changeHtmlHandler}
          title={"HTML"}
          type="html"
        />
      </DevSection>
      <DevSection name={"Css Editor"} display={true}>
        <CodeEditor
          code={cssCode}
          onCodeChange={changeCssHandler}
          title={"CSS"}
          type="css"
        />
        {iframeDocument && (
          <>
            <DevSection name="DOM" display={true}>
              <Tree>
                {<DomTree documentElement={iframeDocument.documentElement} />}
              </Tree>
            </DevSection>
            <DevSection display={true}>
              <Tree>
                <CssTree styleSheet={iframeDocument.styleSheets[0]} />
              </Tree>
            </DevSection>
            <DevSection display={true}>
              <Tree>
                <RenderTree
                  styleSheet={iframeDocument.styleSheets[0]}
                  documentElement={iframeDocument.documentElement}
                />
              </Tree>
            </DevSection>
          </>
        )}
      </DevSection>
      <DevSection name="Iframe" display={true}>
        <IframePreview
          html={htmlCode}
          css={cssCode}
          setDocument={setIframeDocument}
        />
      </DevSection>
    </div>
  );
}

export default App;
