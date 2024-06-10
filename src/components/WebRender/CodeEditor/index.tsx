import "./CodeEditor.css";
import { useCodeEditor } from "../../../hooks/useCodeEditor";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { basicSetup } from "codemirror";

type EditorProps = {
  code: string;
  onCodeChange: (code: string) => void;
  title: string;
  type: string;
};

const CodeEditor = ({ code, onCodeChange, title, type }: EditorProps) => {
  const extensions = [basicSetup];
  if (type === "html") extensions.push(html());
  else if (type === "css") extensions.push(css());

  const onChangeHandler = (value?: string) => {
    if (!value) return;
    onCodeChange(value);
  };

  const ref = useCodeEditor({
    value: code,
    onChange: onChangeHandler,
    extensions,
  });

  return <div className="editor-container" ref={ref}></div>;
};

export default CodeEditor;
