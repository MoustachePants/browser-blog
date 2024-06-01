import "./RenderTree.css";
import TreeNodeType from "../../../types/TreeNodeType";
import TreeNode from "../TreeNode";
import getComputedStylesForElement from "../../../utils/getComputedStylesForElement";

type RenderTreeProps = {
  styleSheet: CSSStyleSheet;
  documentElement: HTMLElement;
};

const RenderTree = ({ styleSheet, documentElement }: RenderTreeProps) => {
  const NON_VISIBLE_TAGS = ["HEAD", "SCRIPT", "STYLE", "LINK", "META", "TITLE"];

  const shouldSkipElement = (
    element: Element,
    styles: Record<string, string>
  ): boolean => {
    // Skip non-visible tags
    if (NON_VISIBLE_TAGS.includes(element.tagName)) {
      return true;
    }

    // Skip elements with display: none
    if (styles["display"] === "none") {
      return true;
    }

    return false;
  };

  // const buildRenderTree = (
  //   element: Element,
  //   stylesheet: CSSStyleSheet
  // ): TreeNodeType | null => {
  //   const styles = getComputedStylesForElement(element, stylesheet);
  //
  //   if (shouldSkipElement(element, styles)) {
  //     return null;
  //   }
  //
  //   const node: TreeNodeType = {
  //     name: element.tagName,
  //     styles,
  //     children: [],
  //   };
  //
  //   // Recursively build the render tree for each child element
  //   Array.from(element.children).forEach((child) => {
  //     const childNode = buildRenderTree(child, stylesheet);
  //     if (childNode !== null) node.children!.push(childNode);
  //   });
  //
  //   return node;
  // };

  const buildRenderTree = (
    node: Node,
    stylesheet: CSSStyleSheet
  ): TreeNodeType | null => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const styles = getComputedStylesForElement(element, stylesheet);
      if (shouldSkipElement(element, styles)) return null;

      const children = Array.from(element.childNodes)
        .map((child) => buildRenderTree(child, stylesheet))
        .filter(Boolean) as TreeNodeType[];

      return { name: element.tagName, styles, children };
    } else if (node.nodeType === Node.TEXT_NODE) {
      const textContent = node.textContent?.trim();
      if (textContent)
        return { name: "TEXT", textContent, styles: {}, children: [] };
    }

    return null;
  };

  const renderTree = buildRenderTree(documentElement, styleSheet);

  return (
    <li className="render-tree-container" title="Document">
      <div className="node-container">
        <span>Document</span>
      </div>
      {renderTree?.children && renderTree.children.length > 0 && (
        <ul>
          {renderTree.children.map((child, index) => (
            <TreeNode treeNode={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default RenderTree;
