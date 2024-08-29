"use client";
import "./Ropes.css";
import { useRef, useState, useEffect } from "react";

const generateRandomPath = (width: number, height: number): string => {
  const segments = 10;
  let path = `M0,${height / 2}`;
  let x = 0;
  let y = height / 2;

  for (let i = 0; i < segments; i++) {
    x += (Math.random() * width) / segments;
    y += ((Math.random() - 0.5) * height) / 4;
    path += ` Q${x},${y} ${x + (Math.random() * width) / segments},${
      y + ((Math.random() - 0.5) * height) / 4
    }`;
  }

  path += ` L${width},${height / 2}`;
  return path;
};

const Ropes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 400, height: 100 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    // Initial size update
    handleResize();

    // Update size on window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const numRails = 5;
  const rails = Array.from({ length: numRails }).map((_, i) => {
    const xOffset = Math.random() * (dimensions.width - 100);
    const yOffset = Math.random() * (dimensions.height - 20);
    const transform = `translate(${xOffset}, ${yOffset}) rotate(${
      Math.random() * 360
    }, ${dimensions.width / 2}, ${dimensions.height / 2})`;

    return (
      <path
        key={i}
        d={generateRandomPath(dimensions.width, dimensions.height)}
        transform={transform}
        fill="none"
        stroke="#333"
        strokeWidth="4"
      />
    );
  });

  return (
    <div ref={containerRef} className="rails-container">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        {rails}
      </svg>
    </div>
  );
};

export default Ropes;
