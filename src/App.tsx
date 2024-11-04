import { Provider } from "react-redux";
import store from "./redux/store";
import {
  createBrowserRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Auth from "./components/Auth";
import CommandInput from "./components/CommandInput";
import GridVisualization from "./components/GridVisualization";
import HistoryLog from "./components/HistoryLog";
import { Paper } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <Paper
                sx={{
                  padding: 0,
                  margin: "50px 0 0 0",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CommandInput />
                <GridVisualization />
                <HistoryLog />
              </Paper>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
