import "./Editor.css";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Dispatch, SetStateAction, useEffect } from "react";

type EditorProps = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
};

const EditorContainer = ({ code, setCode }: EditorProps) => {
  const onChangeHandler = (value?: string) => {
    if (!value) return;
    setCode(value);
  };

  return (
    <div className="editor-container">
      <Editor
        height="50vh"
        defaultLanguage="html"
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

export default EditorContainer;
