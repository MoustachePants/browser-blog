import React, { FC } from "react";
import "./BrowserWindow.css";

interface BrowserWindowProps {
  title: string;
  children: React.ReactNode;
}

const BrowserWindow: FC<BrowserWindowProps> = ({ title, children }) => {
  return (
    <div className="browser-window">
      <div className="browser-header">
        <div className="browser-buttons">
          <span className="browser-button red"></span>
          <span className="browser-button yellow"></span>
          <span className="browser-button green"></span>
        </div>
        <input
          disabled
          className="browser-url"
          type="text"
          value={`https://www.${title}.com`}
          readOnly
        />
        <span className="browser-refresh">⟳</span>
      </div>
      <div className="browser-content">{children}</div>
    </div>
  );
};

export default BrowserWindow;
