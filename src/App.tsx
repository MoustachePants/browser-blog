import "./App.css";

import CodeEditor from "./components/CodeEditor";
import { useEffect, useState } from "react";
import IframePreview from "./components/IframePreview";
import Section from "./components/UI/Section";
import Tree from "./components/UI/Tree";
import getDomTree from "./utils/getDomTree";
import DomTreeNode from "./types/DomTreeNode";
import DomTreeNodes from "./components/DomTreeNodes";
import NodeTreeNode from "./types/NodeTreeNode";
import getNodeTree from "./utils/getNodeTree";
import NodeTreeNodes from "./components/NodeTreeNodes";

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
`;

  const [htmlCode, setHtmlCode] = useState<string>(defaultHtml);
  const [cssCode, setCssCode] = useState<string>(defaultCss);
  const [iframeDocument, setIframeDocument] = useState<Document>();
  const [domNode, setDomNode] = useState<DomTreeNode>();
  const [nodeNode, setNodeNode] = useState<NodeTreeNode>();

  // BUG
  // shouldn't write here html and css code. not best practice.
  // this should trigger because the iframeDocument is changed
  useEffect(() => {
    if (!iframeDocument) return;
    const domNodes = getDomTree(iframeDocument.documentElement);
    const nodeNodes = getNodeTree(iframeDocument.documentElement);
    setDomNode(domNodes);
    setNodeNode(nodeNodes);
  }, [iframeDocument, setDomNode, getDomTree, htmlCode, cssCode]);

  const changeHtmlHandler = (html: string) => {
    setHtmlCode(html);
  };

  const changeCssHandler = (css: string) => {
    setCssCode(css);
  };

  return (
    <div className="App">
      <Section>
        <CodeEditor
          code={htmlCode}
          onCodeChange={changeHtmlHandler}
          title={"HTML"}
          type="html"
        />
        <CodeEditor
          code={cssCode}
          onCodeChange={changeCssHandler}
          title={"CSS"}
          type="css"
        />
      </Section>
      <Section>
        <IframePreview
          html={htmlCode}
          css={cssCode}
          setDocument={setIframeDocument}
        />
      </Section>
      {domNode && (
        <Section>
          <Tree>{<DomTreeNodes node={domNode} />}</Tree>
        </Section>
      )}
      {nodeNode && (
        <Section>
          <Tree>{<NodeTreeNodes node={nodeNode} />}</Tree>
        </Section>
      )}
    </div>
  );
}

export default App;
