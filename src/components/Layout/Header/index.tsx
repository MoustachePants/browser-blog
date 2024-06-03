import "./Header.css";

const BlogHeader = () => {
  return (
    <section className="blog-header-container">
      <h1 className="blog-main-title">Browser Render Made Easy</h1>
      <h2 className="blog-sub-title">
        Trying to explain hard stuff the simple way
      </h2>
      <ul className="header-details">
        <li>
          <h3>Elad Laor</h3>
        </li>
        <li>
          <h3>June 1st, 2024 </h3>
        </li>
      </ul>
    </section>
  );
};

export default BlogHeader;
