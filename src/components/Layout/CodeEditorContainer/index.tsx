import React, { FC } from "react";
import "./CodeEditorContainer.css";

interface CodeEditorProps {
  title: string;
  children: React.ReactNode;
  onReset: () => void;
}

const CodeEditor: FC<CodeEditorProps> = ({ title, children, onReset }) => {
  return (
    <div className="code-editor">
      <div className="code-editor-header">
        <span className="title-tag">{title}</span>
        <button className="reset-code-btn" onClick={onReset}>
          Reset
        </button>
      </div>
      <div className="code-editor-content">{children}</div>
    </div>
  );
};

export default CodeEditor;
