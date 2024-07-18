import "./App.css";

import BlogHeader from "./components/Layout/Header";
import Main from "./components/Layout/Main";
import useCodeMirror from "./hooks/useCodeMirror";
import { useCodeEditor } from "./hooks/useCodeEditor";
import { html } from "@codemirror/lang-html";

function App() {
  return (
    <div className="App">
      {/*<BlogHeader />*/}
      <Main />
    </div>
  );
}

export default App;
