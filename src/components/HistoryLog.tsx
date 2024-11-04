import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function HistoryLog() {
  const history = useSelector((state: RootState) => state.command.history);

  // Helper function to format position
  const formatPosition = (position: { x: number; y: number }) => {
    return `(${position.x}, ${position.y})`;
  };

  // Helper function to format sample positions
  const formatSamplePositions = (samples: { x: number; y: number }[]) => {
    return samples.map((sample) => `(${sample.x}, ${sample.y})`).join(", ");
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Original Command</TableCell>
            <TableCell>Optimized Command</TableCell>
            <TableCell sx={{ width: "200px" }}>Date</TableCell>

            <TableCell>Initial Sample Positions</TableCell>
            <TableCell>Final Sample Positions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.original}</TableCell>
              <TableCell>{entry.optimized}</TableCell>
              <TableCell>{entry.date}</TableCell>

              <TableCell>
                {formatSamplePositions(entry.initialSamples)}
              </TableCell>
              <TableCell>{formatSamplePositions(entry.finalSamples)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
