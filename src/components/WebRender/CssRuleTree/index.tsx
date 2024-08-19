import React, { ReactElement } from "react";

type CssRuleTreeProps = {
  styleSheet: CSSStyleSheet;
};

const CssRuleTree = ({ styleSheet }: CssRuleTreeProps): ReactElement => {
  const cssStyleRulesArr = Object.values(styleSheet.cssRules).filter(
    (cssRule) => cssRule.STYLE_RULE === 1
  ) as CSSStyleRule[];

  return (
    <li className={"stylesheet"}>
      <div className="node-container">
        <span>{"CSSStyleSheet"}</span>
      </div>
      {cssStyleRulesArr.length > 0 && (
        <ul>
          {cssStyleRulesArr.map((rule, index) => (
            <li key={Math.random()} className="css-tree-rule">
              <div className="node-container">
                <span>CssStyleRule #{index + 1}</span>
              </div>
              <ul>
                <li>
                  <div className="node-container">
                    <span>{rule.selectorText}</span>
                  </div>
                </li>
                <li>
                  <div className="node-container">
                    <span>{rule.style.cssText}</span>
                  </div>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CssRuleTree;
