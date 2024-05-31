import { ReactElement } from "react";
import getDomTree from "../../utils/getDomTree";
import DomTreeNodes from "./DomTreeNodes";

type DomTreeNodesProps = {
  documentElement: HTMLElement;
};

const DomTree = ({ documentElement }: DomTreeNodesProps): ReactElement => {
  // console.log(node);
  const documentNode = getDomTree(documentElement);

  return <DomTreeNodes node={documentNode} />;
};

export default DomTree;
