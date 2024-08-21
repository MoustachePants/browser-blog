import "./DevSection.css";
import { ReactChildren, ReactNode } from "react";

type DevSectionProps = {
  children: ReactNode;
  display: boolean;
  name?: string;
};

const DevSection = ({ children, display, name }: DevSectionProps) => {
  return (
    <section
      className="dev-section-container"
      style={{ display: display ? "block" : "none" }}
    >
      {children}
    </section>
  );
};

export default DevSection;
