import "./Tree.css";
import { ReactElement } from "react";

type TreeProps = {
  children: ReactElement;
};

const Tree = ({ children }: TreeProps) => {
  return (
    <div className="tree-container">
      <div className="row">
        <div className="tree">
          <ul>{children}</ul>
        </div>
      </div>
    </div>
  );
};

export default Tree;
