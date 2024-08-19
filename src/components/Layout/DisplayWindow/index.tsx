import React, { FC } from "react";
import "./DisplayWindow.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface DisplayWindowProps {
  title: string;
  children: React.ReactNode;
  onReset: () => void;
  type: "code" | "tree";
}

const DisplayWindow: FC<DisplayWindowProps> = ({
  title,
  children,
  onReset,
  type,
}) => {
  return (
    <div className="display-window">
      <div className="display-window-header">
        <span className="title-tag">{title}</span>
        <button className="reset-btn" onClick={onReset}>
          Reset
        </button>
      </div>
      {type === "tree" && (
        <TransformWrapper initialScale={0.4} minScale={0.6} centerOnInit={true}>
          <TransformComponent>{children}</TransformComponent>
        </TransformWrapper>
      )}
      {type === "code" && (
        <div className="display-window-content">{children}</div>
      )}
    </div>
  );
};

export default DisplayWindow;
