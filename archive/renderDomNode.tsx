import TreeNode from "../types/DomTreeNode";
import { ReactElement } from "react";

const DomTreeNodes = (node: TreeNode): ReactElement => {
  return (
    <li key={Math.random()}>
      <a href="#">
        <span>{node.tagName || node.tag}</span>
      </a>
      {node.children.length > 0 && (
        <ul>{node.children.map((child) => DomTreeNodes(child))}</ul>
      )}
    </li>
  );
};

export default DomTreeNodes;
