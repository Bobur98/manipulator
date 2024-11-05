import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SamplePosition {
  x: number;
  y: number;
}

interface CommandState {
  commands: string;
  optimizedCommand: string;
  initialPos: { x: number; y: number }; // Robot's initial position
  finalPos: { x: number; y: number }; // Robot's final position
  initialSamples: SamplePosition[]; // Initial positions of samples
  finalSamples: SamplePosition[]; // Final positions of samples
  history: {
    original: string;
    optimized: string;
    date: string;
    initialPosition: { x: number; y: number };
    finalPosition: { x: number; y: number };
    initialSamples: SamplePosition[];
    finalSamples: SamplePosition[];
  }[];
}

const initialState: CommandState = {
  commands: "",
  optimizedCommand: "",
  initialPos: { x: 0, y: 0 },
  finalPos: { x: 0, y: 0 },
  initialSamples: [],
  finalSamples: [],
  history: [],
};

const commandSlice = createSlice({
  name: "command",
  initialState,
  reducers: {
    setCommands(
      state,
      action: PayloadAction<{
        commands: string;
        initialPos: { x: number; y: number };
        initialSamples: SamplePosition[];
      }>
    ) {
      state.commands = action.payload.commands;
      state.optimizedCommand = optimizeCommand(action.payload.commands);
      state.initialPos = action.payload.initialPos; // Set the initial position of the robot
      state.initialSamples = action.payload.initialSamples; // Set the initial positions of the samples
    },
    saveToHistory(state) {
      const date = new Date().toISOString();
      state.history.push({
        original: state.commands,
        optimized: state.optimizedCommand,
        date,
        initialPosition: state.initialPos,
        finalPosition: state.finalPos,
        initialSamples: state.initialSamples,
        finalSamples: state.finalSamples, // setting this after execution!!!
      });
    },
    setFinalPosition(
      state,
      action: PayloadAction<{
        finalPos: { x: number; y: number };
        finalSamples: SamplePosition[];
      }>
    ) {
      state.finalPos = action.payload.finalPos; // Updating the final position of the robot
      state.finalSamples = action.payload.finalSamples; // Updating the final positions of the samples
    },
  },
});

const { setCommands, saveToHistory, setFinalPosition } = commandSlice.actions;
export { setCommands, saveToHistory, setFinalPosition };
export default commandSlice.reducer;

function optimizeCommand(commands: string): string {
  let simpleOptimized = commands.replace(
    /(.)\1+/g,
    (match, p1) => `${match.length}${p1}`
  );

  // repeating sequences ( "ЛЛЛНННЛЛЛННН" -> "2(3Л3Н)")
  const patternRegex = /((\d*\D+)+)\1+/g;
  simpleOptimized = simpleOptimized.replace(patternRegex, (match) => {
    const sequence = match.slice(0, match.length / 2);
    const repeatCount = match.length / sequence.length;
    return `${repeatCount}(${sequence})`;
  });

  return simpleOptimized;
}