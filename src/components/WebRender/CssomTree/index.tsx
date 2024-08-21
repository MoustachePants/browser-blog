import "./CssomTree.css";
import React from "react";

type CSSOMNode = {
  selectorText: string;
  properties: { [key: string]: string };
  children: CSSOMNode[];
};

type CSSOMTreeProps = {
  stylesheet: CSSStyleSheet;
};

const buildCSSOMTree = (stylesheet: CSSStyleSheet): CSSOMNode[] => {
  const tree: CSSOMNode[] = [];
  const nodeMap: { [selector: string]: CSSOMNode } = {};

  const processRule = (rule: CSSStyleRule): CSSOMNode => {
    const properties: { [key: string]: string } = {};
    for (let i = 0; i < rule.style.length; i++) {
      const propertyName = rule.style[i];
      properties[propertyName] = rule.style.getPropertyValue(propertyName);
    }
    return {
      selectorText: rule.selectorText,
      properties,
      children: [],
    };
  };

  // Build initial node map
  Array.from(stylesheet.cssRules).forEach((rule) => {
    if (rule.type === CSSRule.STYLE_RULE) {
      const styleRule = rule as CSSStyleRule;
      nodeMap[styleRule.selectorText] = processRule(styleRule);
    }
  });

  // Ensure 'html' and 'body' nodes exist
  let htmlNode = nodeMap["html"] || {
    selectorText: "html",
    properties: {},
    children: [],
  };
  let bodyNode = nodeMap["body"] || {
    selectorText: "body",
    properties: {},
    children: [],
  };

  // Add 'html' node to the tree if it doesn't exist
  if (!tree.find((node) => node.selectorText === "html")) {
    tree.push(htmlNode);
  }

  // Add 'body' node to 'html' if it doesn't exist
  if (!htmlNode.children.find((node) => node.selectorText === "body")) {
    htmlNode.children.push(bodyNode);
  }

  // Apply styles and build children nodes
  Array.from(stylesheet.cssRules).forEach((rule) => {
    if (rule.type === CSSRule.STYLE_RULE) {
      const styleRule = rule as CSSStyleRule;
      const node = nodeMap[styleRule.selectorText];

      if (styleRule.selectorText === "html") {
        Object.assign(htmlNode.properties, node.properties);
      } else if (styleRule.selectorText === "body") {
        Object.assign(bodyNode.properties, node.properties);
      } else {
        // Add node as a child of 'body' if it's not already present
        if (
          !bodyNode.children.find(
            (n) => n.selectorText === styleRule.selectorText
          )
        ) {
          bodyNode.children.push(node);
        }
      }
    }
  });

  // Function to apply inherited styles to children
  const applyInheritedStyles = (
    node: CSSOMNode,
    inheritedProperties: { [key: string]: string }
  ) => {
    // Apply inherited styles to current node
    node.properties = { ...inheritedProperties, ...node.properties };

    // Recursively apply inherited styles to children
    node.children.forEach((child) =>
      applyInheritedStyles(child, node.properties)
    );
  };

  // Apply inherited styles starting from the root
  applyInheritedStyles(htmlNode, {});

  return tree;
};

const CSSOMTree: React.FC<CSSOMTreeProps> = ({ stylesheet }) => {
  const cssomTree = buildCSSOMTree(stylesheet);

  const renderTree = (nodes: CSSOMNode[]): JSX.Element[] => {
    return nodes.map((node, index) => (
      <li key={index} className="stylesheet">
        <div className="node-container">
          <h1>{node.selectorText}</h1>
        </div>
        {(Object.keys(node.properties).length > 0 ||
          node.children.length > 0) && (
          <ul>
            {Object.keys(node.properties).length > 0 && (
              <li className="node-style-properties">
                <div className="node-container">
                  {/*<strong>Style</strong>*/}
                  {/*<br />*/}
                  <div className="cssom-styles-container css-rule-node">
                    {Object.entries(node.properties).map(
                      ([property, value], propIndex) => (
                        <p key={propIndex}>
                          {property}: {value}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </li>
            )}
            {node.children.length > 0 && renderTree(node.children)}
          </ul>
        )}
      </li>
    ));
  };

  return <div>{renderTree(cssomTree)}</div>;
};

export default CSSOMTree;
