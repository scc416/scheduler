import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode) => {
    setMode(mode);
    setHistory((prev) => [...prev, mode]);
  };

  const back = () => {
    const historyLength = history.length;
    const lastMode = history[historyLength - 2];
    setMode(lastMode);
    setHistory((prev) => prev.slice(0, historyLength - 1));
  };

  return { mode, transition, back };
}
