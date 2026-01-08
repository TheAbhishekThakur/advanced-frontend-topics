// Q. How to detect overlapping circles in React.js?

/*
 * When left mouse button click
 * - draw a circle
 * - increase the circle size on drag
 * - on mouse leave => the final circle is drawn
 * - if left click without drag then clear left circle
 *
 * When right mouse button click
 * - draw a circle
 * - increase the circle size on drag
 * - on mouse leave => the final circle is drawn
 * - if right click without drag then clear right circle
 *
 * Circle overlap
 * - initially both circles are red
 * - if both circles overlap then change color to blue
 */

import React from "react";
import Circles from "./components/circle";

const App = () => {
  return (
    <div className="App">
      <h1>Circle Overlap Detection</h1>
      <Circles />
    </div>
  );
};
export default App;
