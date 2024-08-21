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

const Index: React.FC<RenderTreeNodeProps> = ({ treeNode }) => {
  return (
    <li title={treeNode.name}>
      <div className="node-container">
        <h1>{treeNode.name}</h1>
        {treeNode.textContent && <p>{treeNode.textContent}</p>}
        {treeNode.styles && Object.keys(treeNode.styles).length > 0 && (
          <main className="css-rule-node">
            <div>
              {Object.entries(treeNode.styles).map(
                ([property, value], index) => (
                  <p key={Math.random()}>
                    {property}: {value}
                  </p>
                )
              )}
            </div>
          </main>
        )}
      </div>
      {treeNode.children && treeNode.children.length > 0 && (
        <ul>
          {treeNode.children.map((child, index) => (
            <Index treeNode={child} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Index;
