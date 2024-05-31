import isValidCSSBlock from "./isValidCSSBlock";

interface CSSDeclaration {
  property: string;
  value: string;
}

interface CSSRule {
  selectors: string[];
  declarations: CSSDeclaration[];
}

interface CSSTree {
  rules: CSSRule[];
}

const parseCSS = (css: string): CSSTree => {
  const rules: CSSRule[] = [];

  // BUG - if you write nonsense and then a rule, it thinks that the nonsense is a part of the next rule's selector
  const ruleBlocks = css.split("}").filter((rule) => rule.trim().length > 0);

  ruleBlocks.forEach((block) => {
    block = block.trim() + "}";
    if (!isValidCSSBlock(block)) return;

    const [selectorBlock, declarationsBlock] = block.split("{");

    if (selectorBlock && declarationsBlock) {
      const selectors = selectorBlock
        .trim()
        .split(",")
        .map((selector) => selector.trim());
      const declarationPairs = declarationsBlock
        .trim()
        .slice(0, -1)
        .trim()
        .split(";")
        .filter((declaration) => declaration.trim().length > 0);
      const declarations: CSSDeclaration[] = declarationPairs.map(
        (declaration) => {
          const [property, value] = declaration.split(":");
          return { property: property.trim(), value: value.trim() };
        }
      );

      rules.push({
        selectors,
        declarations,
      });
    }
  });

  return { rules };
};

export default parseCSS;
