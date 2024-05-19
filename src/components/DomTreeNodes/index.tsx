import { ReactElement } from "react";
import DomTreeNode from "../../types/DomTreeNode";

type DomTreeNodesProps = {
  node: DomTreeNode;
};

const DomTreeNodes = ({ node }: DomTreeNodesProps): ReactElement => {
  return (
    <li key={Math.random()} title={node.tagName || node.tag}>
      <div className="node-container">
        <span>{node.tagName || node.tag}</span>
        {(node.children.length === 0 && node.content) || ``}
      </div>
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
