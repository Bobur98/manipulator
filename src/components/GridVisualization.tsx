import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setFinalPosition, saveToHistory } from "../redux/commandSlice";

const GRID_SIZE = 5;
const INITIAL_POSITION = { x: 0, y: 0 };
const INITIAL_SAMPLES = [
  { x: 4, y: 1 },
  { x: 2, y: 3 },
  { x: 3, y: 0 },
];

export default function GridVisualization() {
  const [robotPosition, setRobotPosition] = useState(INITIAL_POSITION);
  const [samples, setSamples] = useState(INITIAL_SAMPLES);
  const [holdingSample, setHoldingSample] = useState(false);
  const dispatch = useDispatch();

  const optimizedCommand = useSelector(
    (state: RootState) => state.command.optimizedCommand
  );

  const parseCommands = (commands: string): string[] => {
    const expandedCommands: string[] = [];
    let i = 0;

    while (i < commands.length) {
      const currentChar = commands[i];

      if (!isNaN(parseInt(currentChar))) {
        let countStr = "";

        while (i < commands.length && !isNaN(parseInt(commands[i]))) {
          countStr += commands[i];
          i++;
        }

        const count = parseInt(countStr);
        const command = commands[i];
        for (let j = 0; j < count; j++) {
          expandedCommands.push(command);
        }
      } else {
        expandedCommands.push(currentChar);
      }

      i++;
    }

    return expandedCommands;
  };

  const executeCommands = () => {
    const commandSequence = parseCommands(optimizedCommand);
    console.log("Parsed Command Sequence:", commandSequence);

    let currentStep = 0;
    let newSamples = [...samples];
    let robotPos = { ...robotPosition };
    let holding = holdingSample;

    const intervalId = setInterval(() => {
      if (currentStep >= commandSequence.length) {
        clearInterval(intervalId);
        setRobotPosition(INITIAL_POSITION); // Reset to initial position after completion
        setSamples(newSamples); // Update the samples' final positions
        setHoldingSample(false); // Reset holding state
        return;
      }

      const command = commandSequence[currentStep];
      console.log("Executing command:", command);

      switch (command) {
        case "Л": // Left
          if (robotPos.x > 0) robotPos.x -= 1;
          break;
        case "П": // Right
          if (robotPos.x < GRID_SIZE - 1) robotPos.x += 1;
          break;
        case "В": // Up
          if (robotPos.y > 0) robotPos.y -= 1;
          break;
        case "Н": // Down
          if (robotPos.y < GRID_SIZE - 1) robotPos.y += 1;
          break;
        case "О": // Pick up sample
          const sampleIndex = newSamples.findIndex(
            (sample) => sample.x === robotPos.x && sample.y === robotPos.y
          );
          if (sampleIndex !== -1) {
            newSamples.splice(sampleIndex, 1);
            holding = true;

            console.log("Picked up a sample at:", robotPos);
          }
          break;
        case "Б": // Drop sample
          if (holding) {
            newSamples.push({ ...robotPos });
            holding = false;

            console.log("Dropped a sample at:", robotPos);
          }
          break;
        default:
          break;
      }

      setRobotPosition({ ...robotPos });
      setHoldingSample(holding);

      currentStep++;
    }, 500);
    dispatch(saveToHistory());
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 40px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 40px)`,
          gap: "5px",
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isRobot = x === robotPosition.x && y === robotPosition.y;
          const isSample = samples.some(
            (sample) => sample.x === x && sample.y === y
          );

          return (
            <div
              key={i}
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: isRobot
                  ? "blue"
                  : isSample
                  ? "red"
                  : "lightgrey",
                border: "1px solid black",
              }}
            />
          );
        })}
      </div>
      <Button
        onClick={executeCommands}
        variant="contained"
        style={{ marginTop: "10px" }}
      >
        Execute Commands
      </Button>
    </div>
  );
}
