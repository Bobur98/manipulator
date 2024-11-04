import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function GridVisualization() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveManipulator = (command: string) => {};

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 40px)",
          gridTemplateRows: "repeat(5, 40px)",
          gap: "5px",
          placeSelf: "center",
          marginBottom: "15px",
        }}
      >
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor:
                i === position.y * 5 + position.x ? "blue" : "lightgrey",
            }}
          />
        ))}
      </div>

      <Button onClick={() => moveManipulator("Л")}>Move Left</Button>
      <Button onClick={() => moveManipulator("П")}>Move Right</Button>
      <Button onClick={() => moveManipulator("В")}>Move Up</Button>
      <Button onClick={() => moveManipulator("Н")}>Move Down</Button>
      <Button onClick={() => moveManipulator("О")}>Pick Up Sample</Button>
      <Button onClick={() => moveManipulator("Б")}>Release Sample</Button>
    </div>
  );
}
