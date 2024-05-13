import "./Section.css";
import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
};

const Section = ({ children }: SectionProps) => {
  return <section className="section-container">{children}</section>;
};

export default Section;
