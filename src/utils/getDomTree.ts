import DomTreeNode from "../types/DomTreeNode";

const getDomTree = (node: Element): DomTreeNode => {
  const tag = node.tagName.toLowerCase();
  const content = node.textContent;
  const tagName = node.id || node.className;
  const children: DomTreeNode[] = Array.from(node.children).map((child) =>
    getDomTree(child as Element)
  );

  // console.log({ tag, tagName, children });

  const treeNode: DomTreeNode = { tag, children };

  // Add tagName if it exists
  if (tagName) {
    treeNode.tagName = tagName;
  }

  // Add content if it exists
  if (content) {
    treeNode.content = content;
  }

  return treeNode;
};

export default getDomTree;
