import "./DomTreeNodes.css";
import { ReactElement } from "react";
import DomTreeNode from "../../../../types/DomTreeNode";

type DomTreeNodesProps = {
  node: DomTreeNode;
};

const DomTreeNodes = ({ node }: DomTreeNodesProps): ReactElement => {
  console.log(node.tag, node.tagName);

  return (
    <li key={Math.random()} title={node.tagName || node.tag}>
      <div className="node-container">
        <h1>{node.elementType}</h1>
        {node.tag && <strong>{"<" + node.tag + ">"}</strong>}
        {node.tagName && <strong>{node.tagName}</strong>}
        {(node.children.length === 0 && (
          <>
            <br />
            <br />
            <p>{node.content}</p>
          </>
        )) ||
          ``}
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
