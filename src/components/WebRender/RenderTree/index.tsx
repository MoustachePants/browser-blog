import React from "react";
import getComputedStylesForElement from "../../../utils/getComputedStylesForElement";
import TreeNodeType from "../../../types/TreeNodeType";
import Index from "./RenderTreeNode";

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
    if (NON_VISIBLE_TAGS.includes(element.tagName)) {
      return true;
    }
    if (styles["display"] === "none") {
      return true;
    }
    return false;
  };

  const buildRenderTree = (
    node: Node,
    parentStyles: Record<string, string>,
    stylesheet: CSSStyleSheet
  ): TreeNodeType | null => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const styles = getComputedStylesForElement(element, stylesheet);
      const inheritedStyles = { ...parentStyles, ...styles };

      if (shouldSkipElement(element, inheritedStyles)) return null;

      const children = Array.from(element.childNodes)
        .map((child) => buildRenderTree(child, inheritedStyles, stylesheet))
        .filter(Boolean) as TreeNodeType[];

      return { name: element.tagName, styles: inheritedStyles, children };
    } else if (node.nodeType === Node.TEXT_NODE) {
      const textContent = node.textContent?.trim();
      if (textContent) {
        return { name: "TEXT", textContent, styles: {}, children: [] };
      }
    }

    return null;
  };

  const initialStyles = getComputedStylesForElement(
    documentElement,
    styleSheet
  );
  const renderTree = buildRenderTree(
    documentElement,
    initialStyles,
    styleSheet
  );

  return (
    <li className="render-tree-container" title="Document">
      <div className="node-container">
        <h1>Document</h1>
      </div>
      {renderTree?.children && renderTree.children.length > 0 && (
        <ul>
          {renderTree.children.map((child, index) => (
            <Index treeNode={child} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default RenderTree;
