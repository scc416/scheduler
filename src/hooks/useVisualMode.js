import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      return setMode(newMode);
    }
    
    setHistory(prev => [...prev, mode]);
    setMode(newMode);
  };

  const back = () => {
    const historyLength = history.length;

    // only go back when history is not empty
    if (historyLength > 0) {
      const lastMode = history[historyLength - 1];
      setMode(lastMode);

      // remove lastMode from history
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  return { mode, transition, back };
}
