/*

Create a custom hook called useTimer that provides the following API:

const { seconds, start, stop, isRunning } = useTimer(initialTime);

- Show two buttons on the screen Start & Stop.
- One button to start the timer. when the timer is running then show remaining seconds on the screen.
- Another button to stop the timer. When the timer is stops/reaches to 0 then it
resets to the total time and shows "No Timer Running" on the screen.

*/

"use client";
import { useEffect, useRef, useState } from "react";

const useTimer = (initialTime = 0) => {
  const [seconds, setSeconds] = useState(initialTime);
  const [isStarted, setIsStarted] = useState(false);
  const timer = useRef(null);

  const start = () => {
    timer.current = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    setIsStarted(true);
  };

  const stop = () => {
    clearInterval(timer.current);
    setIsStarted(false);
    setSeconds(initialTime);
  };

  useEffect(() => {
    if (seconds < 1) {
      return stop();
    }
    if (isStarted) {
      start();
    }
    return () => clearInterval(timer.current);
  }, [seconds]);

  return { seconds: seconds, start, stop, isRunning: isStarted };
};

export default useTimer;
