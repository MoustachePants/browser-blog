import React, { FC } from "react";
import "./CodeEditorContainer.css";

interface CodeEditorProps {
  title: string;
  children: React.ReactNode;
}

const CodeEditor: FC<CodeEditorProps> = ({ title, children }) => {
  return (
    <div className="code-editor">
      <div className="code-editor-header">
        <span className="title-tag">{title}</span>
      </div>
      <div className="code-editor-content">{children}</div>
    </div>
  );
};

export default CodeEditor;
