import { ReactElement } from "react";
import NodeTreeNode from "../../types/NodeTreeNode";

type NodeTreeNodesProps = {
  node: NodeTreeNode;
};

const NodeTreeNodes = ({ node }: NodeTreeNodesProps): ReactElement => {
  return (
    <li key={Math.random()}>
      <div className="node-container">
        <span>{node.type}</span>
        <h4>{node.tag || `text`}</h4>
        <p>{node.content || ``}</p>
      </div>
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <NodeTreeNodes node={child} key={Math.random()} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default NodeTreeNodes;
