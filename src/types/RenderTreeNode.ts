type RenderTreeNode = {
  name: string;
  styles: Record<string, string>;
  children: RenderTreeNode[];
};

export default RenderTreeNode;
