import React, { FC } from "react";
import "./CodeEditorContainer.css";

interface CodeEditorProps {
  language: string;
  children: React.ReactNode;
}

const CodeEditor: FC<CodeEditorProps> = ({ language, children }) => {
  return (
    <div className="code-editor">
      <div className="code-editor-header">
        <span className="language-tag">{language}</span>
      </div>
      <div className="code-editor-content">{children}</div>
    </div>
  );
};

export default CodeEditor;
