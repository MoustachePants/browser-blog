import "./CodeEditor.css";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Dispatch, SetStateAction, useEffect } from "react";

type EditorProps = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  title: string;
  type: string;
};

const CodeEditor = ({ code, setCode, title, type }: EditorProps) => {
  const onChangeHandler = (value?: string) => {
    if (!value) return;
    setCode(value);
  };

  return (
    <div className="editor-container">
      <fieldset>
        <legend>{title}</legend>
        <Editor
          // height="50vh"
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
      </fieldset>
    </div>
  );
};

export default CodeEditor;
