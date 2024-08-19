import React from "react";

type TreeNodeType = {
  name: string;
  styles?: Record<string, string>;
  textContent?: string;
  children?: TreeNodeType[];
};

type RenderTreeNodeProps = {
  treeNode: TreeNodeType;
};

const RenderTreeNode: React.FC<RenderTreeNodeProps> = ({ treeNode }) => {
  return (
    <li title={treeNode.name}>
      <div className="node-container">
        <span>{treeNode.name}</span>
        {treeNode.textContent && <p>{treeNode.textContent}</p>}
        {treeNode.styles && Object.keys(treeNode.styles).length > 0 && (
          <li className="node-style-properties">
            <div>
              {Object.entries(treeNode.styles).map(
                ([property, value], index) => (
                  <span>
                    {property}: {value}
                    <br />
                  </span>
                )
              )}
            </div>
          </li>
        )}
      </div>
      {treeNode.children && treeNode.children.length > 0 && (
        <ul>
          {treeNode.children.map((child, index) => (
            <RenderTreeNode treeNode={child} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default RenderTreeNode;
