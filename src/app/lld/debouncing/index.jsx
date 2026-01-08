import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [value, setValue] = useState("");
  let timerId;

  const fetchData = (val) => {
    console.log("fetchData", val);
  };

  function debounce(callback, timer) {
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      const context = this;
      timerId = setTimeout(() => {
        callback.apply(context, args);
      }, timer);
    };
  }

  useEffect(() => {
    const func = debounce(fetchData, 300);
    func("Abhishek");

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  function callApi() {
    console.log("API Called");
  }

  function debounce(cb, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        cb();
      }, delay);
    };
  }

  const changeEvent = debounce(callApi, 1000);

  return (
    <div>
      <h1>Debouncing Example</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <input type="text" onkeyup={changeEvent} placeholder="Enter Value" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
