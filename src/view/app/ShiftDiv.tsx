import React, { useState } from "react";

interface Props {
  onClick: () => void;
  mcp: string;
  srg: string;
  desc?: string;
}

export default function ShiftDiv({ onClick, mcp, srg, desc }: Props) {
  const [shiftDown, setShiftDown] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.shiftKey) {
      setShiftDown(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    setShiftDown(false);
  };

  return (
    <div
      style={{ outline: "none" }}
      onMouseEnter={(e) => {
        e.currentTarget.focus();
      }}
      onMouseLeave={(e) => {
        e.currentTarget.blur();
        setShiftDown(false);
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={-1}
    >
      {shiftDown ? srg + (desc ? ` ${desc}` : "") : mcp}
    </div>
  );
}
