const isValidCSSBlock = (css: string): boolean => {
  const selectorPattern = /^[\s\S]+?\s*\{/;
  const declarationPattern = /^\s*([\w-]+)\s*:\s*([^;]+)\s*;?/;

  css = css.replace(/\/\*[\s\S]*?\*\//g, "").trim();

  const parts = css.split("{");
  if (parts.length !== 2) return false;

  const [selector, declarationsBlock] = parts;
  if (!selectorPattern.test(selector.trim() + "{")) return false;

  const declarations = declarationsBlock.trim().slice(0, -1).trim();
  if (declarationsBlock.trim().slice(-1) !== "}") return false;

  const declarationPairs = declarations
    .split(";")
    .filter((decl) => decl.trim().length > 0);
  for (const declaration of declarationPairs) {
    if (!declarationPattern.test(declaration.trim())) return false;
  }

  return true;
};

export default isValidCSSBlock;
