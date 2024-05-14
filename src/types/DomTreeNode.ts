type DomTreeNode = {
  tag: string;
  tagName?: string;
  children: DomTreeNode[];
  content?: string;
};

export default DomTreeNode;
