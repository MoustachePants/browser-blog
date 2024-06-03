import { ReactElement } from "react";
import DomTreeNodes from "./DomTreeNodes";
import getDomTree from "../../../utils/getDomTree";

type DomTreeNodesProps = {
  documentElement: HTMLElement;
};

const DomTree = ({ documentElement }: DomTreeNodesProps): ReactElement => {
  // console.log(node);
  const documentNode = getDomTree(documentElement);

  return <DomTreeNodes node={documentNode} />;
};

export default DomTree;