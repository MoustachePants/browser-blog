const getComputedStylesForElement = (
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

export default getComputedStylesForElement;
