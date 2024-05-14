import TreeNode from "../types/TreeNode";

const getDomTree = (node: Element): TreeNode => {
  const tag = node.tagName.toLowerCase();
  const tagName = node.id || node.className;
  const children: TreeNode[] = Array.from(node.children).map((child) =>
    getDomTree(child as Element)
  );

  // console.log({ tag, tagName, children });
  if (tagName) return { tag, tagName, children };
  return { tag, children };
};

export default getDomTree;
