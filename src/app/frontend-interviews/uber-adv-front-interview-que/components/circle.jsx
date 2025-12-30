import { useEffect, useState } from "react";

const handleContextMenu = (event) => {
  event.preventDefault();
  console.log("Right click detected");
};

const Circles = () => {
  const [circles, setCircles] = useState({
    left: {
      id: "left",
      width: 0,
      height: 0,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
    },
    right: {
      id: "right",
      width: 0,
      height: 0,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
    },
  });
  const [currentCircleId, setCurrentCircleId] = useState(null);

  const handleMouseDown = (event) => {
    const { button } = event;
    const currentId = button === 0 ? "left" : "right";
    setCurrentCircleId(currentId);
    setCircles((prevCircles) => {
      prevCircles.map((circle) => {
        if (circle.id === currentId) {
          return {
            ...circle,
            startX: event.clientX,
            startY: event.clientY,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
          };
        }
        return circle;
      });
      return prevCircles;
    });
  };

  const onMouseMove = (event) => {
    if (currentCircleId === null) return;
    const updatedCircles = circles.map((circle) => {
      if (circle.id === currentCircleId) {
        const distanceX = Math.abs(event.clientX - circle.startX);
        const distanceY = Math.abs(event.clientY - circle.startY);

        const size = Math.max(Math.abs(distanceX), Math.abs(distanceY));

        const newX = distanceX < 0 ? circle.startX - size : circle.startX;
        const newY = distanceY < 0 ? circle.startY - size : circle.startY;

        return {
          ...circle,
          width: size,
          height: size,
          x: newX,
          y: newY,
        };
      }
      return circle;
    });

    const doCircleOverlap = elementsOverlap(
      updatedCircles[0],
      updatedCircles[1]
    );

    const newCircles = updatedCircles.map((circle) => {
      if (circle.id === currentCircleId) {
        return {
          ...circle,
          overlap: doCircleOverlap,
        };
      }
      return circle;
    });

    setCircles(newCircles);
  };

  const onMouseUp = () => {
    setCurrentCircleId(null);
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const elementsOverlap = (leftCircle, rightCircle) => {
    const leftCircleRedius = leftCircle.width / 2;
    const rightCircleRedius = rightCircle.width / 2;
    const leftCenter = {
      x: leftCircle.x + leftCircleRedius,
      y: leftCircle.y + leftCircleRedius,
    };
    const rightCenter = {
      x: rightCircle.x + rightCircleRedius,
      y: rightCircle.y + rightCircleRedius,
    };
    const distanceBetweenCenters = Math.sqrt(
      Math.pow(leftCenter.x - rightCenter.x, 2) +
        Math.pow(leftCenter.y - rightCenter.y, 2)
    );
    return distanceBetweenCenters < leftCircleRedius + rightCircleRedius;
  };

  <div
    className="board"
    onMouseDown={handleMouseDown}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
  >
    {circles.map((circle) => (
      <div
        key={circle.id}
        className={`circle ${circle.id}`}
        style={{
          position: "absolute",
          width: `${circle.width}px` || "100px",
          height: `${circle.height}px` || "100px",
          top: `${circle.y}px`, // y - top
          left: `${circle.x}px`, // x - left
          backgroundColor: circle.overlap ? "blue" : "red",
          borderRadius: "50%",
        }}
      ></div>
    ))}
  </div>;
};

export default Circles;
