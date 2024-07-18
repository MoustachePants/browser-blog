import "./Main.css";
import { useState } from "react";
import IframePreview from "../../WebRender/IframePreview";
import Tree from "../../UI/Tree";
import DomTree from "../../WebRender/DomTree";
import CodeEditor from "../../WebRender/CodeEditor";
import CssTree from "../../WebRender/CssTree";
import RenderTree from "../../WebRender/RenderTree";
import BrowserWindow from "../BrowserWindow";
import DisplayWindow from "../DisplayWindow";
import removeHeadTag from "../../../utils/removeHeadTag";

const Main = () => {
  const defaultHtml = `<html>
    <head>
        <title>Page Title</title>
        <link rel="stylesheet" href="stylesheet.css">
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

  const resetHtmlHandler = () => {
    setHtmlCode(defaultHtml);
  };

  const resetCssHandler = () => {
    setCssCode(defaultCss);
  };

  return (
    <article className="blog-main-container">
      <p>
        Lately I decided to revive an old hobby of mine: web development. In the
        past, I created lightweight web applications and visual simulator
        interfaces, but life took me in different directions, and I had to focus
        on my job.
      </p>
      <p>
        A friend recommended I visit{" "}
        <a href="http://www.roadmap.sh">roadmap.sh</a> to gain more knowledge
        and experience. One of the first articles in the{" "}
        <a href="https://roadmap.sh/frontend">frontend skill tree</a> is about{" "}
        <strong>how the browser renders a web page</strong>, and it immediately
        fascinated me how complex this hidden process is.
      </p>
      <p>
        We often take for granted the transition from clicking a link to seeing
        a fully loaded webpage, ignoring the intricate mechanics behind the
        scenes (well, did you think about it after clicking the link that led
        you here?).
      </p>
      <h4>Render who?!</h4>
      <p>
        <cite>
          "Rendering engines (also known as layout engines or browser engines)
          are part of a web browser that transforms HTML, CSS, and other
          resources of a web page into a visual representation on a screen."
        </cite>{" "}
        mdn web docs
      </p>
      <p>
        [graphical image - HTML+CSS &gt; (render engine) &gt; displayed web
        page]
      </p>
      <p>
        The browser rendering engine is the one in charge of turning HTML and
        CSS to visual web pages like we know and love in a split of a second.
        There are several browser rendering engines (Blink for Chrome and Edge,
        WebKit for Safari, Gecko for Firefox, etc.). Lucky for us, all of them
        work similarly.
      </p>
      <h4>Our goal</h4>
      <p>
        In this article, I will explain and demonstrate the basics of browser
        rendering for fellow enthusiasts like myself. The goal is to make this
        topic as easy and understandable as possible while offering useful
        advice to improve our web development abilities. I will link to every
        resource I used, allowing you to explore further into this fascinating
        subject (it's a never-ending rabbit hole, trust me).
      </p>
      <p>
        you must be familiar with at least basic knowledge of HTML and CSS in
        order to understand this article 🙂
      </p>
      <h3>Step 0</h3>
      <h4>Getting the resources</h4>
      <p>At the beginning there is only a blank web page.</p>
      <BrowserWindow title={"example"}>
        <IframePreview
          html={removeHeadTag(htmlCode)}
          css={cssCode}
          setDocument={setIframeDocument}
          mode="empty"
        />
      </BrowserWindow>
      <p>Hover your mouse over it and you will reveal our rendered web page.</p>
      <p>
        The first step is the browser{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview">
          asking for the web page resources
        </a>{" "}
        over the internet connection. There has to be a HTML file, most likely
        with a CSS file which contains the styling of the page. Of course there
        could also be Javascript, images and every file the web page needs.
      </p>
      <p>
        Now that we have all of the resources, we will now follow each step the
        browser goes through in order to render its content.
      </p>
      <h3>Step 1a</h3>
      <h4>The HTML step</h4>
      <p>
        With the provided HTML file, the browser is using the Document Object
        Module (DOM) API to <strong>parse</strong> it, or simply, analyze and
        translate it into a format that can be understandable and manipulated -{" "}
        <strong>the DOM tree</strong>.
      </p>
      <p>
        In JavaScript, when we are using{" "}
        <code>
          document.querySelector(&ldquo;p&rdquo;).innerHTML = &ldquo;hello
          world&rdquo;
        </code>{" "}
        we are actually not changing the HTML source code, but a property of the
        paragraph element in the DOM tree created by the browser. We couldn't do
        that without the DOM tree and its API.
      </p>
      <p>
        This is our HTML code and the compatible DOM tree. You can edit the code
        to see the new DOM tree and also change the finished web page we will
        render eventually.
      </p>
      <DisplayWindow
        type={"code"}
        title="index.html"
        onReset={resetHtmlHandler}
      >
        <CodeEditor
          code={htmlCode}
          onCodeChange={changeHtmlHandler}
          title={"HTML"}
          type="html"
        />
      </DisplayWindow>
      <p>~Parsing using the DOM API~</p>
      {iframeDocument && (
        <DisplayWindow
          type={"tree"}
          title="Dom Tree"
          onReset={() => console.log("reset")}
        >
          <Tree>
            <DomTree documentElement={iframeDocument.documentElement} />
          </Tree>
        </DisplayWindow>
      )}
      <h3>Step 1b</h3>
      <h4>The CSS step</h4>
      <p>
        &gt; Note: This step begins after the browser reads the{" "}
        <code>&lt;link&gt;</code> tag (when parsing the HTML) and fetches the
        CSS file from the server. It can happen simultaneously with step 1a.
      </p>
      <p>
        This process is similar to the one in step 1a. Without diving into
        technical details, the browser also parses any provided CSS stylesheet
        files.This time, the browser uses the{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model">
          CSSOM API
        </a>
        , which is an interface that helps the browser understand and manipulate
        the styling of a page.
      </p>
      <DisplayWindow
        type={"code"}
        title="stylesheet.css"
        onReset={resetCssHandler}
      >
        <CodeEditor
          code={cssCode}
          onCodeChange={changeCssHandler}
          title={"CSS"}
          type="css"
        />
      </DisplayWindow>
      <p>
        The CSS rules object is initially created, and each rule has a selector
        and its declarations in it:
      </p>
      <DisplayWindow
        type={"tree"}
        title="Css Tree"
        onReset={() => console.log("reset")}
      >
        {iframeDocument && (
          <Tree>
            <CssTree styleSheet={iframeDocument.styleSheets[0]} />
          </Tree>
        )}
      </DisplayWindow>{" "}
      <p>
        Using the newly created rules object, the browser creates the
        <strong> CSSOM tree</strong> - a set of rules for the style and the
        layout of the page and all of its elements. Some of the style rules are
        inherited from the parent element (for example, when declaring
        <code>font-size: 10px</code> for the <code>&lt;body&gt;</code> element,
        all of the paragraph elements <code>&lt;p&gt;</code> inside it will also
        get this declaration).
      </p>
      <p>[CSSOM tree]</p>
      <h5>Things we can do now that we know the CSSOM tree</h5>
      <p>
        It is less common to be familiar with the CSSOM compared to the DOM, but
        it could be sometimes useful. For example, when we declare{" "}
        <code>document.querySelector("p").style.color = "red"</code> we may be
        thinking that we manipulate the CSS stylesheet file but it only adds
        inline style property like if we declared{" "}
        <code>&lt;p style=&rdquo;color: red&rdquo;&gt;example&lt;/p&gt;</code>
      </p>
      <p>
        Using the CSSOM API we could actually manipulate the rules specified in
        our stylesheet file. In this case, document.styleSheets is the way to
        access all the stylesheets of our web page and manipulate them.
      </p>
      <p>
        Did you ever want to create a different stylesheet for dark mode instead
        of changing classes for all the elements in your page? disable the light
        mode stylesheet by coding{" "}
        <code>document.styleSheets[0].disable = true</code> and enable the dark
        mode stylesheet by coding
        <code>document.styleSheets[1].disable = false</code>.
      </p>
      <p>
        Using the CSSOM you could add, remove and edit specific style rules at
        your will! Explore more at{" "}
        <a href="https://css-tricks.com/an-introduction-and-guide-to-the-css-object-model-cssom/">
          Louis Lazaris's great article
        </a>{" "}
        on this subject.
      </p>
      <h5>Note on performance</h5>
      <p>
        Creating the CSSOM tree can be time and resources consuming for the
        browser. The heavier the styles, the longer it takes to create the CSSOM
        tree and display the web page for the user. One solution is to use as
        few style rules as we can. Another solution is using atomic CSS. Google
        it, you will not regret this.
      </p>
      <p>
        &gt; Note: CSSOM is soon to be partially replaced by CSS Typed OM, which
        provides a more efficient and powerful way to interact with styles.
        However, it&rsquo;s currently only supported by chrome and only specific
        features are available.
      </p>
      <h3>Step 2</h3>
      <h4>JavaScript&nbsp;</h4>
      <p>
        Next, the browser executes the JavaScript code. Actually, code execution
        starts whenever the HTML parser gets to the <code>&lt;script&gt;</code>{" "}
        tag, unless the defer attribute is specified and then the execution
        starts after the HTML parsing is finished. Another option is the async
        attribute which then executes at the same time as the document parsing.
      </p>
      <p>Some of the code could manipulate the DOM tree or the CSSOM tree.</p>
      <h5>Performance note</h5>
      <p>
        In order to improve performance, always use <code>defer</code> or{" "}
        <code>async</code> attributes if possible. If not, the user will have to
        wait until the JavaScript execution ends for the content to render. Read
        on performance in this{" "}
        <a href="https://dev.to/fidalmathew/async-vs-defer-in-javascript-which-is-better-26gm">
          great article by Fidal Mathew
        </a>
        .
      </p>
      <h3>Step 3</h3>
      <h4>The render Tree</h4>
      <p>
        &gt; note: The browser will not get to this step until the DOM and CSSOM
        trees are created fully.
      </p>
      <p>
        The browser merges the DOM and CSSOM trees to create the render tree,
        which represents all visible elements and their calculated styles.
      </p>
      <p>The render tree is built by:</p>
      <ul>
        <li>
          Using the DOM tree to select only the visible elements - for example,
          the <code>&lt;head&gt;</code> element will not be rendered by default
          (unless its <code>display: none</code> property is changed, apparently
          you can do that&hellip;).
        </li>
        <li>
          Using the CSSOM tree to attach each element with its calculated
          styles.
        </li>
      </ul>
      <p>
        The renderer follows fixed guidelines to build the render tree. For
        example, if more than 20 of the same element are nested within one
        another, it doesn&rsquo;t render the 20th and subsequent elements. Read
        more on the render in this{" "}
        <a href="https://web.dev/articles/howbrowserswork">
          amazing article by Paul Irish and Tali Garsiel
        </a>
        .
      </p>
      {iframeDocument && (
        <DisplayWindow
          title={"Render Tree"}
          type={"tree"}
          onReset={() => console.log("reset")}
        >
          <Tree>
            <RenderTree
              styleSheet={iframeDocument.styleSheets[0]}
              documentElement={iframeDocument.documentElement}
            />
          </Tree>
        </DisplayWindow>
      )}
      <p>
        This representation of the render tree is only partial - for example, it
        doesn't represent css rules that are not the type of{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleRule">
          CssStyleRule
        </a>{" "}
        (like cssMediaRule, cssKeyframeRule&hellip;).
      </p>
      <p>
        Note on performance: If hiding an element is needed - use{" "}
        <code>display: none</code>
        instead of <code>opacity: 0</code> if possible. This way the browser
        will not render something the user can&rsquo;t see anyway.
      </p>
      <h3>Step 4</h3>
      <h4>Layout (also called &lsquo;reflow&rsquo;)</h4>
      <p>
        Using the newly created render tree, the browser calculates the size and
        position of every visible element on the page. The process applies the
        CSS rules from the render tree and the browser&rsquo;s default styles to
        calculate the exact placement and dimensions of each element.
      </p>
      <BrowserWindow title="example">
        <IframePreview
          html={removeHeadTag(htmlCode)}
          css={cssCode}
          setDocument={setIframeDocument}
          mode="layout"
        />
      </BrowserWindow>
      <h3>Step 5</h3>
      <h4>Painting</h4>
      <p>
        The browser fills in the pixels based on the layout and the styles from
        the render tree.
      </p>
      <BrowserWindow title="example">
        <IframePreview
          html={removeHeadTag(htmlCode)}
          css={cssCode}
          setDocument={setIframeDocument}
          mode="paint"
        />
      </BrowserWindow>
      <h3>Now what?</h3>
      <p>
        Understanding how the browser works is not trivial. A lot of good and
        experienced front-end developers are still not familiar with it.
        Although it's a highly theoretical subject, there are some practical use
        cases for this knowledge. If you have feedback or further insights, feel
        free to reach out.
      </p>
      <p>
        If you got interested, you can explore the following resources I used:
      </p>
      <ul>
        <li>
          <a href="https://web.dev/articles/howbrowserswork">
            &nbsp;How Browsers Work | Paul Irish and Tali Garsiel
          </a>
        </li>
        <li>
          <a href="https://dev.to/fidalmathew/async-vs-defer-in-javascript-which-is-better-26gm">
            Async vs Defer in JavaScript: Which is Better? | Fidal Mathew
          </a>
        </li>
        <li>
          <a href="https://css-tricks.com/an-introduction-and-guide-to-the-css-object-model-cssom/">
            An Introduction and Guide to the CSS Object Model (CSSOM) | Louis
            Lazaris
          </a>
        </li>
      </ul>
    </article>
  );
};

export default Main;
