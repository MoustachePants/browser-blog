import "./App.css";

import React, { useEffect, useState } from "react";
import DevSection from "./components/UI/DevSection";
import CodeEditor from "./components/WebRender/CodeEditor";
import Tree from "./components/UI/Tree";
import CssTree from "./components/WebRender/CssTree";
import RenderTree from "./components/WebRender/RenderTree";
import IframePreview from "./components/WebRender/IframePreview";
import DomTree from "./components/WebRender/DomTree";
import BlogHeader from "./components/Layout/Header";
import Main from "./components/Layout/Main";

function App() {
  return (
    <div className="App">
      <>
        {/*<DevSection name="Html Editor" display={true}>*/}
        {/*  <CodeEditor*/}
        {/*    code={htmlCode}*/}
        {/*    onCodeChange={changeHtmlHandler}*/}
        {/*    title={"HTML"}*/}
        {/*    type="html"*/}
        {/*  />*/}
        {/*</DevSection>*/}
        {/*<DevSection name={"Css Editor"} display={true}>*/}
        {/*  <CodeEditor*/}
        {/*    code={cssCode}*/}
        {/*    onCodeChange={changeCssHandler}*/}
        {/*    title={"CSS"}*/}
        {/*    type="css"*/}
        {/*  />*/}
        {/*  {iframeDocument && (*/}
        {/*    <>*/}
        {/*      <DevSection name="DOM" display={true}>*/}
        {/*        <Tree>*/}
        {/*          {<DomTree documentElement={iframeDocument.documentElement} />}*/}
        {/*        </Tree>*/}
        {/*      </DevSection>*/}
        {/*      <DevSection display={true}>*/}
        {/*        <Tree>*/}
        {/*          <CssTree styleSheet={iframeDocument.styleSheets[0]} />*/}
        {/*        </Tree>*/}
        {/*      </DevSection>*/}
        {/*      <DevSection display={true}>*/}
        {/*        <Tree>*/}
        {/*          <RenderTree*/}
        {/*            styleSheet={iframeDocument.styleSheets[0]}*/}
        {/*            documentElement={iframeDocument.documentElement}*/}
        {/*          />*/}
        {/*        </Tree>*/}
        {/*      </DevSection>*/}
        {/*    </>*/}
        {/*  )}*/}
        {/*</DevSection>*/}
        {/*<DevSection name="Iframe" display={true}>*/}
        {/*  <IframePreview*/}
        {/*    html={htmlCode}*/}
        {/*    css={cssCode}*/}
        {/*    setDocument={setIframeDocument}*/}
        {/*  />*/}
        {/*</DevSection>*/}
      </>
      <BlogHeader />
      <Main />
    </div>
  );
}

export default App;
