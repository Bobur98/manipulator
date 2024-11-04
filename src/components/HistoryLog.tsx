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
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Original Command</TableCell>
            <TableCell>Optimized Command</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Sample Positions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.original}</TableCell>
              <TableCell>{entry.optimized}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.samplesPosition}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
