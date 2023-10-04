import { useState } from "react";
export function useToggle(initState = false) {
  const [isOn, setIsOn] = useState(initState);
  function onToggle() {
    setIsOn((isOn) => !isOn);
  }
  return [isOn, onToggle];
}
