import TreeNode from "../types/TreeNode";
import { ReactElement } from "react";

const renderDomNode = (node: TreeNode): ReactElement => {
  return (
    <li key={Math.random()}>
      <a href="#">
        <span>{node.tagName || node.tag}</span>
      </a>
      {node.children.length > 0 && (
        <ul>{node.children.map((child) => renderDomNode(child))}</ul>
      )}
    </li>
  );
};

export default renderDomNode;
