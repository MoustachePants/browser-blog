import "./CssRuleTree.css";
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
        <h1>{"CSSStyleSheet"}</h1>
      </div>
      {cssStyleRulesArr.length > 0 && (
        <ul>
          {cssStyleRulesArr.map((rule, index) => (
            <li key={Math.random()} className="css-tree-rule">
              <div className="node-container">
                <h1>CssStyleRule #{index + 1}</h1>
              </div>
              <ul>
                <li>
                  <div className="node-container">
                    <strong>{rule.selectorText}</strong>
                  </div>
                </li>
                <li>
                  <div className="node-container style-node">
                    {rule.style.cssText.split(";").map((line) => (
                      <p>{line}</p>
                    ))}
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
