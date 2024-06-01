type NodeTreeNode = {
  type: string;
  content?: string;
  tag?: string;
  attributes?: { [key: string]: string };
  children?: NodeTreeNode[];
};

export default NodeTreeNode;
