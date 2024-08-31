"use client";
import "./Ropes.css";
import { useRef, useState, useEffect } from "react";

function generateSmoothPathWithLoops(width, height, minPoints, maxPoints) {
  // Ensure we have at least 4 points to accommodate loops
  const numPoints = Math.max(
    4,
    Math.floor(Math.random() * (maxPoints - minPoints + 1)) + minPoints
  );

  // Generate random points
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: (i / (numPoints - 1)) * width,
      y: Math.random() * height,
    });
  }

  // Function to generate a smooth curve between two points
  function smoothCurve(p1, p2) {
    const controlPoint1 = {
      x: p1.x + (p2.x - p1.x) / 3,
      y: p1.y + (Math.random() - 0.5) * height * 0.5,
    };
    const controlPoint2 = {
      x: p1.x + (2 * (p2.x - p1.x)) / 3,
      y: p2.y + (Math.random() - 0.5) * height * 0.5,
    };
    return `C ${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${p2.x},${p2.y}`;
  }

  // Function to generate a loop
  function generateLoop(startPoint, endPoint) {
    const midX = (startPoint.x + endPoint.x) / 2;
    const peakY = Math.random() * height;
    const loopDirection = Math.random() < 0.5 ? 1 : -1; // 1 for clockwise, -1 for counterclockwise

    const controlPoint1 = {
      x: midX - loopDirection * (endPoint.x - startPoint.x) * 0.2,
      y: peakY,
    };
    const controlPoint2 = {
      x: midX + loopDirection * (endPoint.x - startPoint.x) * 0.2,
      y: peakY,
    };

    return `C ${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${endPoint.x},${endPoint.y}`;
  }

  // Generate the path
  let pathData = `M ${points[0].x},${points[0].y}`;

  const numLoops = Math.floor(Math.random() * 4); // 0-3 loops
  const loopPositions = new Set();

  // Randomly select positions for loops
  while (loopPositions.size < numLoops) {
    loopPositions.add(Math.floor(Math.random() * (points.length - 1)) + 1);
  }

  for (let i = 1; i < points.length; i++) {
    if (loopPositions.has(i)) {
      // Insert additional points for the loop
      const loopStartX =
        points[i - 1].x + (points[i].x - points[i - 1].x) * 0.25;
      const loopEndX = points[i - 1].x + (points[i].x - points[i - 1].x) * 0.75;
      const loopStartY =
        points[i - 1].y + (points[i].y - points[i - 1].y) * 0.25;
      const loopEndY = points[i - 1].y + (points[i].y - points[i - 1].y) * 0.75;

      pathData +=
        " " + smoothCurve(points[i - 1], { x: loopStartX, y: loopStartY });
      pathData +=
        " " +
        generateLoop(
          { x: loopStartX, y: loopStartY },
          { x: loopEndX, y: loopEndY }
        );
      pathData += " " + smoothCurve({ x: loopEndX, y: loopEndY }, points[i]);
    } else {
      pathData += " " + smoothCurve(points[i - 1], points[i]);
    }
  }

  return pathData;
}

const Ropes = () => {
  return (
    <div className="rails-container">
      <svg xmlns="http://www.w3.org/2000/svg" stroke="red" fill="transparent">
        <path
          d={generateSmoothPathWithLoops(
            window.innerWidth,
            window.innerHeight / 5,
            10,
            20
          )}
        />
        <path
          d={generateSmoothPathWithLoops(
            window.innerWidth,
            window.innerHeight / 5,
            10,
            20
          )}
        />
        <path
          d={generateSmoothPathWithLoops(
            window.innerWidth,
            window.innerHeight / 5,
            10,
            20
          )}
        />
      </svg>
    </div>
  );
};

export default Ropes;
