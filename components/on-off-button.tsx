import { useState } from "react";
import { Button } from "@/components/button";

export function OnOffButton() {
  const [isOn, setIsOn] = useState(true);
  const label = isOn ? "On" : "Off";
  const style = isOn ? "bg-red-600" : "bg-blue-600";

  return (
    <Button
      onClick={() => setIsOn(!isOn)}
      className={`${style} text-white rounded-md p-2`}
    >
      {label}
    </Button>
  );
}
