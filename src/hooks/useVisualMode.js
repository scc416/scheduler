import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const transition = setMode;

  const back = () => {};

  return { mode, transition, back };
}
