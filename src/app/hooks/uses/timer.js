"use client";
import React from "react";
import useTimer from "../useTimer";

const Timer = () => {
  const { seconds, start, stop, isRunning } = useTimer(5);
  return (
    <div>
      <h1 className="text-center">Timer Hook Page</h1>
      <div className="text-center">
        {!isRunning && <p>No Timer Running</p>}
        {isRunning && <p>Time left: {seconds} seconds</p>}
      </div>
      <div>
        <button
          onClick={start}
          className="me-2 p-2 bg-green-500 text-white rounded"
          disabled={isRunning}
        >
          Start Timer
        </button>
        <button
          disabled={!isRunning}
          onClick={stop}
          className="p-2 bg-red-500 text-white rounded"
        >
          Stop Timer
        </button>
      </div>
    </div>
  );
};
export default Timer;
