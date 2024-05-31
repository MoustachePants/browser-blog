type DomTreeNode = {
  elementType: string;
  tag: string;
  tagName?: string;
  children: DomTreeNode[];
  content?: string;
};

export default DomTreeNode;
