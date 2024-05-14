import { ReactElement } from "react";
import DomTreeNode from "../../types/DomTreeNode";

type DomTreeNodesProps = {
  node: DomTreeNode;
};

const DomTreeNodes = ({ node }: DomTreeNodesProps): ReactElement => {
  return (
    <li key={Math.random()}>
      <a href="#">
        <span>{node.tagName || node.tag}</span>
        {(node.children.length === 0 && node.content) || ``}
      </a>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <DomTreeNodes node={child} key={Math.random()} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default DomTreeNodes;
