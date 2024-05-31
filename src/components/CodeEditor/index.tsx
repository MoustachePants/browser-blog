import "./CodeEditor.css";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import compressedCode from "../../utils/compressCode";

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
      <Editor
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
      />
    </div>
  );
};

export default CodeEditor;
