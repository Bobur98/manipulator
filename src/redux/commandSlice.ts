import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommandState {
  commands: string;
  optimizedCommand: string;
  history: {
    original: string;
    optimized: string;
    date: string;
    samplesPosition: string;
  }[];
}

const initialState: CommandState = {
  commands: "",
  optimizedCommand: "",
  history: [],
};

const commandSlice = createSlice({
  name: "command",
  initialState,
  reducers: {
    setCommands(state, action: PayloadAction<string>) {
      state.commands = action.payload;
      state.optimizedCommand = optimizeCommand(action.payload);
    },
    saveToHistory(state) {
      const date = new Date().toISOString();
      state.history.push({
        original: state.commands,
        optimized: state.optimizedCommand,
        date,
        samplesPosition: "Sample positions here",
      });
    },
  },
});

const { setCommands, saveToHistory } = commandSlice.actions;
export { setCommands, saveToHistory };
export default commandSlice.reducer;

// Command optimization function
function optimizeCommand(commands: string): string {
  return commands.replace(/(.)\1+/g, (match, p1) => `${match.length}${p1}`);
}
