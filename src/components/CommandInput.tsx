import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { saveToHistory, setCommands } from "../redux/commandSlice";
import { Button, TextField } from "@mui/material";

export default function CommandInput() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const optimizedCommand = useSelector(
    (state: RootState) => state.command.optimizedCommand
  );

  const handleOptimize = () => {
    dispatch(setCommands(input));
  };

  const handleSave = () => {
    dispatch(saveToHistory());
  };

  return (
    <div>
      <TextField
        label="Enter Commands"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleOptimize} variant="contained">
        Optimize
      </Button>
      <Button onClick={handleSave} variant="contained">
        Save
      </Button>
      <p>Optimized Command: {optimizedCommand}</p>
    </div>
  );
}
