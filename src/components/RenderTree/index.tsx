import "./RenderTree.css";
import getDomTree from "../../utils/getDomTree";
import RenderTreeNode from "../../types/RenderTreeNode";
import TreeNode from "../TreeNode";

type RenderTreeType = {
  styleSheet: CSSStyleSheet;
  documentElement: HTMLElement;
};

const RenderTree = ({ styleSheet, documentElement }: RenderTreeType) => {
  const cssStyleRulesArr = Object.values(styleSheet.cssRules).filter(
    (cssRule) => cssRule.STYLE_RULE === 1
  ) as CSSStyleRule[];
  const documentNode = getDomTree(documentElement);

  // console.log(cssStyleRulesArr, documentNode);

  const getComputedStyles = (
    element: Element,
    stylesheet: CSSStyleSheet
  ): Record<string, string> => {
    const styles: Record<string, string> = {};

    // Iterate over all CSS rules in the stylesheet
    for (let i = 0; i < stylesheet.cssRules.length; i++) {
      const rule = stylesheet.cssRules[i] as CSSStyleRule;

      // Check if the rule applies to the element
      if (element.matches(rule.selectorText)) {
        // Parse the style declaration
        const style = rule.style;
        for (let j = 0; j < style.length; j++) {
          const prop = style[j];
          styles[prop] = style.getPropertyValue(prop);
        }
      }
    }

    return styles;
  };

  const buildRenderTree = (
    element: Element,
    stylesheet: CSSStyleSheet
  ): RenderTreeNode => {
    const node: RenderTreeNode = {
      name: element.tagName,
      styles: getComputedStyles(element, stylesheet),
      children: [],
    };

    // Recursively build the render tree for each child element
    Array.from(element.children).forEach((child) => {
      node.children.push(buildRenderTree(child, stylesheet));
    });

    return node;
  };

  const renderTree = buildRenderTree(documentElement, styleSheet);
  console.log(renderTree.children);

  return (
    <li className="render-tree-container" title="Document">
      <div className="node-container">
        <span>Document</span>
      </div>
      {renderTree.children.length > 0 && (
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
