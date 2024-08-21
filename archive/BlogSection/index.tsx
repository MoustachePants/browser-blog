import { ReactNode } from "react";

type BlogSectionProps = {
  children: ReactNode;
};

const BlogSection = ({ children }: BlogSectionProps) => {
  return <section className="blog-section-container">{children}</section>;
};

export default BlogSection;
