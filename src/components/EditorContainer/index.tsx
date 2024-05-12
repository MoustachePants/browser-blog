import "./Editor.css";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Dispatch, SetStateAction, useEffect } from "react";

type EditorProps = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  title: string;
};

const EditorContainer = ({ code, setCode, title }: EditorProps) => {
  const onChangeHandler = (value?: string) => {
    if (!value) return;
    setCode(value);
  };

  return (
    <div className="editor-container">
      <fieldset>
        <legend>{title}</legend>
        <Editor
          height="50vh"
          width="45vw"
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
      </fieldset>
    </div>
  );
};

export default EditorContainer;
