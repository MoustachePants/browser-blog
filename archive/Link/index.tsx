import "./Link.css";
import { ReactNode } from "react";

type LinkProps = {
  children: ReactNode;
  url: string;
};

const Link = ({ children, url }: LinkProps) => {
  return (
    <a href={url} className="link-container">
      {children}
    </a>
  );
};

export default Link;
