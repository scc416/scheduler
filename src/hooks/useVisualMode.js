import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const historyLength = history.length;
  const lastMode = historyLength ? history[historyLength - 1] : null;

  const transition = (newMode, replace = false) => {
    if (replace) {
      return setMode(newMode);
    }
    
    setHistory(prev => [...prev, mode]);
    setMode(newMode);
  };

  const back = () => {

    // only go back when history is not empty
    if (lastMode) {
      setMode(lastMode);

      // remove lastMode from history
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  return { mode, transition, back, lastMode };
}
