import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { saveToHistory, setCommands } from "../redux/commandSlice";
import { Box, Button, Stack, TextField } from "@mui/material";

export default function CommandInput() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const optimizedCommand = useSelector(
    (state: RootState) => state.command.optimizedCommand
  );

  const handleOptimize = () => {
    dispatch(
      setCommands({
        commands: "ппповвб",
        initialPos: { x: 0, y: 0 },
        initialSamples: [
          { x: 4, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 0 },
        ],
      })
    );
  };
  // dispatch(saveToHistory());

  return (
    <Stack>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          label="Enter Commands"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleOptimize} variant="contained">
          Optimize
        </Button>
      </Box>
      <p>Optimized Command: {optimizedCommand}</p>
    </Stack>
  );
}
