import { useMemo, useState, useEffect, useRef, use } from "react";
import classnames from "classnames";
import "style.css";
/*

- Create a shape based on the 2D data
- Empty box where value === 1
- When value === 0, then render nothing
- We can select a box and change bgColor to green
- Deselect in the order of selection
- Disable my interaction
- DS? Array? Object? Something?

2D Array
[[], [], []]

*/

const Shapes = ({ boxes }) => {
  // Array, Object, Set, Map, etc.
  const [selected, setSelected] = useState(new Set());
  const [unloading, setUnloading] = useState(false);
  const timeoutRef = useRef(null);

  const countOfVisibleBoxes = useMemo(() => {
    return boxes.reduce((acc, row) => {
      row.forEach((column) => {
        if (column === 1) {
          acc += 1;
        }
      });

      return acc;
    }, 0);
  }, [boxes]);

  const handleClick = (e) => {
    const { target } = e;
    const index = target.getAttribute("data-index");

    if (index === null || selected.has(index) || unloading) {
      return;
    }

    setSelected((prev) => {
      const newSelected = new Set(prev);
      newSelected.add(index);
      return newSelected;
    });
  };

  const unload = () => {
    // every 500 ms we want deselect the box
    // based on the order of insertion/selection

    setUnloading(true);
    const keys = Array.from(selected.keys());
    let index = 0;

    const removeNextKey = () => {
      if (keys[index]) {
        const next = keys[index];
        index += 1;
        setSelected((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(next);
          return updatedKeys;
        });

        timeoutRef.current = setTimeout(() => {
          removeNextKey();
        }, 500);
      } else {
        setUnloading(false);
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(removeNextKey, 100);
    };
  };

  useEffect(() => {
    if (selected.size >= countOfVisibleBoxes) {
      unload();
    }
  }, [selected]);

  return (
    <div className="boxes" onClick={handleClick}>
      {boxes.map((row, rowIndex) => {
        return (
          <div className="row" key={`${row}-${rowIndex}`}>
            {row.map((column, colIndex) => {
              const identifier = `${rowIndex}-${colIndex}`;
              const isSelected = selected.has(identifier);
              return column === 1 ? (
                <div
                  key={identifier}
                  data-index={identifier}
                  className={classnames("box", isSelected && "selected")}
                >
                  {isSelected ? "Selected" : ""}
                </div>
              ) : (
                <div key={identifier} className="box-placeholder"></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Shapes;
