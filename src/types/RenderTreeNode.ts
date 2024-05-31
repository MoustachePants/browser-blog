type RenderTreeNode = {
  tagName: string;
  styles: Record<string, string>;
  children: RenderTreeNode[];
};

export default RenderTreeNode;
