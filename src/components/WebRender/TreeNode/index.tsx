import TreeNodeType from "../../../types/TreeNodeType";

type TreeNodeProps = {
  treeNode: TreeNodeType;
};

const TreeNode = ({ treeNode }: TreeNodeProps) => {
  return (
    <li title={treeNode.name}>
      <div className="node-container">
        <span>{treeNode.name}</span>
        {treeNode.textContent && <p>{treeNode.textContent}</p>}
        {Object.keys(treeNode.styles!).length !== 0 && (
          <p>{JSON.stringify(treeNode.styles)}</p>
        )}
      </div>
      {treeNode.children && treeNode.children.length > 0 && (
        <ul>
          {treeNode.children.map((child, index: number) => (
            <TreeNode treeNode={child} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
