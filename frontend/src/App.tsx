import "./App.css";
import Dashboard from "./pages/Dashboard";
import SmurfDetail from "./pages/SmurfDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo, useState } from "react";
import HouseDetail from "./pages/HouseDetail";
import VenueDetail from "./pages/VenueDetail";
import WorkplaceDetail from "./pages/WorkplaceDetail";

function App() {
  const [darkMode, setDarkModeState] = useState(() => {
    const stored = localStorage.getItem("smurf-dark-mode");
    return stored ? JSON.parse(stored) : false;
  });

  const setDarkMode = (value: boolean | ((prev: boolean) => boolean)) => {
    setDarkModeState((prev: boolean) => {
      const newVal = typeof value === "function" ? value(prev) : value;
      localStorage.setItem("smurf-dark-mode", JSON.stringify(newVal));
      return newVal;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
            }
          />
          <Route path="/smurf/:id" element={<SmurfDetail />} />
          <Route path="/house/:id" element={<HouseDetail />} />
          <Route path="/venue/:id" element={<VenueDetail />} />
          <Route path="/workplace/:id" element={<WorkplaceDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
