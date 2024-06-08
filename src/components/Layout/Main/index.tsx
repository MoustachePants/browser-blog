import "./Main.css";
import Note from "../Note";
import { useState } from "react";
import IframePreview from "../../WebRender/IframePreview";
import Tree from "../../UI/Tree";
import DomTreeNodes from "../../WebRender/DomTree/DomTreeNodes";
import DomTree from "../../WebRender/DomTree";
import CodeEditor from "../../WebRender/CodeEditor";
import CssTree from "../../WebRender/CssTree";
import RenderTree from "../../WebRender/RenderTree";

// type MainProps = {
//   html: string;
//   css: string;
// };

const Main = () => {
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

  const changeHtmlHandler = (html: string) => {
    setHtmlCode(html);
  };

  const changeCssHandler = (css: string) => {
    setCssCode(css);
  };

  return (
    <article className="blog-main-container">
      <p>
        In February 2024, I decided to revive an old hobby of mine: web
        development. In the past, I created lightweight web applications and
        visual simulator interfaces, but life took me in different directions,
        and I had to focus on my job. Recently, a friend recommended I visit{" "}
        <a href="https://roadmap.sh" target="_blank">
          roadmap.sh
        </a>{" "}
        to gain more knowledge and experience. One of the first articles in the
        frontend skill tree is about how the browser renders a web page, and it
        immediately fascinated me how complex this hidden process is.
      </p>
      <p>
        We often take for granted the seamless transition from clicking a link
        to seeing a fully loaded webpage. It's easy to overlook the intricate
        mechanics behind the scenes (well, did you think about it after clicking
        the link that led you here?).
      </p>
      <p className="note">
        Note: you must be familiar with at least basic knowledge of HTML and CSS
        in order to understand this article 🙂
      </p>
      <p>
        In this article, I will explain and demonstrate the basics of browser
        rendering for fellow enthusiasts like myself. My goal is to make this
        topic as easy and understandable as possible while providing practical
        insights to enhance our web development skills. I will link to every
        resource I used, allowing you to explore further into this fascinating
        subject (it's a never-ending rabbit hole, trust me).
      </p>
      <p className="note">
        Note: There are several browser rendering engines (Blink for Chrome and
        Edge, WebKit for Safari, Gecko for Firefox, etc.). Lucky for us, all of
        them work in a similar way.
      </p>
      <div className="stage">
        <h2>Stage 0</h2>
        <h3>The Blank Web Page</h3>
        <p>
          This is a blank web page. We will now follow each step the browser
          goes through in order to render its content. For now we leave it be,
          don't miss it too much, we will get back at it.
        </p>
        <p>
          <em>
            Hover your mouse at it and you will reveal our rendered web page.
          </em>
        </p>
        <div className="placeholder">
          <IframePreview
            html={htmlCode}
            css={cssCode}
            setDocument={setIframeDocument}
          />
        </div>
      </div>

      <div className="stage">
        <h2>Stage 1a</h2>
        <h3>HTML</h3>
        <p>
          After the browser gets its HTML file from the network, it reads and
          processes the HTML in a process called parsing, i.e., analyzes and
          translates it to a format that the browser can understand and
          manipulate. It uses the DOM API to create the finished product of this
          stage - the DOM tree.
        </p>
        <pre>
          <CodeEditor
            code={htmlCode}
            onCodeChange={changeHtmlHandler}
            title={"HTML"}
            type="html"
          />
          ! You can edit the code to see the new DOM tree and also change the
          finished web page we will render eventually.
        </pre>
        <div className="placeholder">
          {iframeDocument && (
            <Tree>
              <DomTree documentElement={iframeDocument.documentElement} />
            </Tree>
          )}
        </div>
        <p>
          In JavaScript, when we are using{" "}
          <code>document.querySelector("p").innerHTML = "hello world"</code> we
          are actually not changing the HTML source code, but a property of the
          DOM tree created by the browser.
        </p>
      </div>

      <div className="stage">
        <h2>Stage 1b</h2>
        <h3>CSS</h3>
        <p className="note">
          Note: This stage begins after the browser fetches the CSS file. It can
          be at the same time as stage 1a.
        </p>
        <p>
          Without delving into sophisticated details, the main job of this stage
          is similar to Stage 1a. The browser parses the CSS file. Now, instead
          of using the DOM API, it uses another API set called CSSOM. Therefore,
          it creates the CSSOM tree - a set of rules for the style and the
          layout of the page and all of its components.
        </p>
        <pre>
          <CodeEditor
            code={cssCode}
            onCodeChange={changeCssHandler}
            title={"CSS"}
            type="css"
          />
        </pre>
        <div className="placeholder">
          {iframeDocument && (
            <Tree>
              <CssTree styleSheet={iframeDocument.styleSheets[0]} />
            </Tree>
          )}
        </div>
        <p>
          It is less common to be familiar with the CSSOM compared to the DOM,
          but some of us have used it without knowing. For example, when we code{" "}
          <code>document.querySelector("p").style.backgroundColor = "red"</code>
          , the DOM API calls all the paragraph elements on the page, but the
          CSSOM API does the work of changing the background color.
        </p>
      </div>

      <div className="stage">
        <h2>Stage 2</h2>
        <h3>JavaScript</h3>
        <p>
          Next, the browser executes the JS code. Actually, code execution
          starts whenever the HTML parser gets to the{" "}
          <code>&lt;script&gt;</code> tag, unless the <code>defer</code>{" "}
          attribute is specified and then the execution starts after the
          document parsing is finished. Another option is the <code>async</code>{" "}
          attribute which then executes at the same time as the document
          parsing.
        </p>
        <p>Some of the code manipulates the DOM tree or the CSSOM tree.</p>
        <p className="note">
          Tips: In order to improve performance, always use <code>defer</code>{" "}
          or <code>async</code> attributes if possible. Great article by Fidal
          Mathew
        </p>
      </div>

      <div className="stage">
        <h2>Stage 3</h2>
        <h3>The Render Tree</h3>
        <p>
          The browser merges the DOM and CSSOM trees in order to create the
          third and last tree - the Render Tree. This tree represents all the
          visible elements on the page and their corresponding styles calculated
          using the CSSOM tree.
        </p>
        <ul>
          <li>
            It uses the DOM tree to choose only the visible elements (for
            example, the <code>&lt;head&gt;</code> element will not pass its
            strainer).
          </li>
          <li>
            It uses the CSSOM tree to attach each element with its calculated
            styles.
          </li>
        </ul>
        <p>
          The renderer follows fixed guidelines for building the render tree.
          For example, if more than 20 of the same element are nested in one
          another - it doesn't render the 20th and so on.
        </p>
        <div className="placeholder">
          {iframeDocument && (
            <Tree>
              <RenderTree
                styleSheet={iframeDocument.styleSheets[0]}
                documentElement={iframeDocument.documentElement}
              />
            </Tree>
          )}
        </div>
        <p className="note">
          Note: This representation of the render tree is only partial - for
          example, it doesn't represent CSS rules that are not the type of{" "}
          <code>CssTypeRule</code> (like <code>cssMediaRule</code>,{" "}
          <code>cssKeyframeRule</code>…).
        </p>
        <p className="note">
          Tips: If hiding an element is needed - use <code>display: none</code>{" "}
          instead of <code>opacity: 0</code> if possible. This way the browser
          will not render something the user can’t see anyway.
        </p>
      </div>

      <div className="stage">
        <h2>Stage 4</h2>
        <h3>Layout</h3>
        <p>
          Using the newly created Render Tree, the browser calculates the size
          and position of every visible element.
        </p>
        <div className="placeholder">
          <IframePreview
            html={htmlCode}
            css={cssCode}
            setDocument={setIframeDocument}
          />
        </div>
      </div>

      <div className="stage">
        <h2>Stage 5</h2>
        <h3>Painting</h3>
        <p>
          The browser fills in the pixels based on the layout and the styles
          from the render tree.
        </p>
        <div className="placeholder">
          <IframePreview
            html={htmlCode}
            css={cssCode}
            setDocument={setIframeDocument}
          />
        </div>
      </div>

      <div className="stage">
        <h2>Stage 6</h2>
        <h3>Compositing</h3>
        <p>
          The final stage - the browser combines all of the layers in order to
          create the final visible image we see on the screen.
        </p>
        <div className="placeholder">
          <IframePreview
            html={htmlCode}
            css={cssCode}
            setDocument={setIframeDocument}
          />
        </div>
      </div>
    </article>
  );
};

export default Main;
