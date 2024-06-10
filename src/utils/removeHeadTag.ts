const removeHeadTag = (html: string): string => {
  // Regular expression to match <head> tags and their contents
  const headRegex = /<head[^>]*>[\s\S]*?<\/head>/i;

  // Replace the matched <head> tag and its contents with an empty string
  return html.replace(headRegex, "");
};

export default removeHeadTag;
