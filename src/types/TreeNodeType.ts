type TreeNodeType = {
  name: string;
  tagName?: string;
  content?: string;
  styles?: Record<string, string>;
  type?: string;
  attributes?: { [key: string]: string };

  children?: TreeNodeType[];
};

export default TreeNodeType;
