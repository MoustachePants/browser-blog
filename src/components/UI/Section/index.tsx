import "./Section.css";
import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  name: string;
};

const Section = ({ children, name }: SectionProps) => {
  return (
    <section className="section-container" about={name}>
      {children}
    </section>
  );
};

export default Section;
