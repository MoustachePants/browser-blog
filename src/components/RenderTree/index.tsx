import "./RenderTree.css";
import getDomTree from "../../utils/getDomTree";
import RenderTreeNode from "../../types/RenderTreeNode";

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
      tagName: element.tagName,
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
  console.log(renderTree);

  return <div className="render-tree-container"></div>;
};

export default RenderTree;

//    <li key={Math.random()} title={node.tagName || node.tag}>
//       <div className="node-container">
//         <span>{node.elementType}</span>
//         <span>{node.tagName || node.tag}</span>
//         {(node.children.length === 0 && node.content) || ``}
//       </div>
//       {node.children.length > 0 && (
//         <ul>
//           {node.children.map((child) => (
//             <DomTreeNodes node={child} key={Math.random()} />
//           ))}
//         </ul>
//       )}
//     </li>
