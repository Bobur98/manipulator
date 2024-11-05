import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { saveToHistory, setCommands } from "../redux/commandSlice";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function CommandInput() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const optimizedCommand = useSelector(
    (state: RootState) => state.command.optimizedCommand
  );

  const handleOptimize = () => {
    const allowedCommandsPattern = /^[ЛПВНОБЛПВНОБ]+$/i;

    if (!allowedCommandsPattern.test(input)) {
      setError("Invalid input: Only Л, П, В, Н, О, Б are allowed.");
      return;
    }

    setError("");

    dispatch(
      setCommands({
        commands: input,
        initialPos: { x: 0, y: 0 },
        initialSamples: [
          { x: 4, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 0 },
        ],
      })
    );
  };

  return (
    <Stack>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          label="Enter Commands"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={Boolean(error)}
          helperText={error}
        />
        <Button onClick={handleOptimize} variant="contained">
          Optimize
        </Button>
      </Box>

      <p>Optimized Command: {optimizedCommand}</p>
    </Stack>
  );
}
