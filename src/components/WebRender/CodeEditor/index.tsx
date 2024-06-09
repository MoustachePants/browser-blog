import "./CodeEditor.css";
// import Editor, { useMonaco } from "@monaco-editor/react";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
// import "codemirror/mode/xml/xml";
// import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";

type EditorProps = {
  code: string;
  onCodeChange: (code: string) => void;
  title: string;
  type: string;
};

const CodeEditor = ({ code, onCodeChange, title, type }: EditorProps) => {
  const onChangeHandler = (value?: string) => {
    if (!value) return;
    onCodeChange(value);
  };

  return (
    <div className="editor-container">
      {/* <Editor
        height="20rem"
        defaultLanguage={type}
        defaultValue={code.trim()}
        theme={"vs-dark"}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        onChange={onChangeHandler}
      /> */}
      <ControlledEditor value={code.trim()} onBeforeChange={onChangeHandler} />
    </div>
  );
};

export default CodeEditor;
