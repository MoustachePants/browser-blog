import DomTreeNode from "../types/NodeTreeNode";
import NodeTreeNode from "../types/NodeTreeNode";

const getNodeTree = (node: Node): DomTreeNode => {
  if (node.nodeType === Node.TEXT_NODE) {
    // Text node
    return {
      type: "text",
      content: node.textContent || "",
    };
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Element node
    const element = node as Element;
    const tag = element.tagName.toLowerCase();
    const attributes: { [key: string]: string } = {};
    element.getAttributeNames().forEach((attrName) => {
      attributes[attrName] = element.getAttribute(attrName) || "";
    });
    const children: NodeTreeNode[] = Array.from(element.childNodes).map(
      (child) => getNodeTree(child)
    );
    return {
      type: "element",
      tag,
      attributes,
      children,
    };
  } else {
    // Other types of nodes (e.g., comments)
    return {
      type: "other",
      content: node.textContent || "",
    };
  }
};

export default getNodeTree;
