import "./Tree.css";
import { ReactElement, useEffect, useRef } from "react";

type TreeProps = {
  children: ReactElement;
};

const Tree = ({ children }: TreeProps) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const liHoverHandler = (event: MouseEvent) => {
    // console.log(event.target.title);
  };

  useEffect(() => {
    if (!ulRef.current) return;
    const allLi = ulRef.current.querySelectorAll("li");
    allLi.forEach((li) => (li.onmouseenter = (event) => liHoverHandler(event)));
  }, [ulRef]);

  return (
    <div className="tree-container">
      <div className="row">
        <div className="tree">
          <ul ref={ulRef}>{children}</ul>
        </div>
      </div>
    </div>
  );
};

export default Tree;
