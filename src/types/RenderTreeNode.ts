type RenderTreeNode = {
  tagName?: string;
  textContent?: string;
  styles: Record<string, string>;
  children: RenderTreeNode[];
};
export default RenderTreeNode;
