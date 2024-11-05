import React, { useState } from "react";
import { Alert, Button, Slider, Snackbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setFinalPosition, saveToHistory } from "../redux/commandSlice";
import SnackbarAlert from "./SnackbarAlert";

const GRID_SIZE = 5;
const INITIAL_POSITION = { x: 0, y: 0 };
const INITIAL_SAMPLES = [
  { x: 4, y: 1 },
  { x: 2, y: 3 },
  { x: 3, y: 0 },
];

export default function GridVisualization() {
  const { optimizedCommand, initialPos, initialSamples } = useSelector(
    (state: RootState) => state.command
  );
  console.log(initialSamples);

  const [robotPosition, setRobotPosition] = useState(initialPos);
  const [samples, setSamples] = useState(INITIAL_SAMPLES);
  const [holdingSample, setHoldingSample] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state

  const dispatch = useDispatch();

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

        // Save final state after the animation completes
        dispatch(
          setFinalPosition({
            finalPos: robotPos,
            finalSamples: newSamples,
          })
        );
        dispatch(saveToHistory());

        // Reset robot position and sample holding state
        setRobotPosition(INITIAL_POSITION);
        setHoldingSample(false);
        setSnackbarOpen(true);

        return;
      }

      const command = commandSequence[currentStep];
      console.log("Executing command:", command);
      const UppercaseCommand = command.toUpperCase();
      switch (UppercaseCommand) {
        case "Л": // Left
          console.log(command);
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
          if (sampleIndex !== -1 && !holding) {
            // Only pick up if robot is not already holding a sample
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
      setSamples([...newSamples]); // Update sample positions in state
      setHoldingSample(holding);

      currentStep++;
    }, animationSpeed);
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
      <Typography gutterBottom>Animation Speed (ms)</Typography>
      <Slider
        value={animationSpeed}
        onChange={(e, value) => setAnimationSpeed(value as number)}
        aria-labelledby="animation-speed-slider"
        min={100}
        max={2000}
        step={100}
        valueLabelDisplay="auto"
      />
      <Button
        onClick={executeCommands}
        variant="contained"
        style={{ marginTop: "10px" }}
      >
        Execute Commands
      </Button>

      <SnackbarAlert
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </div>
  );
}
