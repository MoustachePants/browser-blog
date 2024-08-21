import "./ProgressBar.css";
import { UIEventHandler, useEffect, useState } from "react";

const ProgressBar = () => {
  const [scrollYPosition, setScrollYPosition] = useState<number>(0);

  const handleScroll = () => {
    const newScrollYPosition = window.scrollY;
    setScrollYPosition(newScrollYPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const body = document.body;
  const html = document.documentElement;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: (scrollYPosition / scrollHeight) * 100 + "%" }}
      ></div>
    </div>
  );
};

export default ProgressBar;