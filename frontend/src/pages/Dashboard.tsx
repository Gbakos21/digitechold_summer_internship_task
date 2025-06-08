import {
  Box,
  Tabs,
  Tab,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  useMediaQuery,
  FormControl,
  InputLabel,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";
import { useLinkedSmurfData } from "../hooks/useLinkedSmurfData";
import Summary from "../components/Summary";
import SmurfList from "../components/SmurfList";
import HouseList from "../components/HouseList";
import WorkplaceList from "../components/WorkplaceList";
import VenueList from "../components/VenueList";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const tabLabels = [
  "Summary",
  "Smurfs",
  "Mushroom Houses",
  "Working places",
  "Leisure venues",
];

type DashboardProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Dashboard({ darkMode, setDarkMode }: DashboardProps) {
  const location = useLocation();
  const [tab, setTab] = useState(location.state?.tab ?? 0);
  const { data, error } = useLinkedSmurfData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data)
    return (
      <Box pt={4} maxWidth={900} mx="auto" textAlign="center">
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    );

  return (
    <Box
      maxWidth={900}
      width="100%"
      mx="auto"
      pt={2}
      px={{ xs: 1.5, sm: 0 }}
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
    >
      {/* Header + dark mode toggle */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="h4" gutterBottom align="center" flex={1}>
          Smurf Village Dashboard
        </Typography>
        <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
          <IconButton
            color="inherit"
            onClick={() => setDarkMode((m) => !m)}
            sx={{ ml: 2 }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      {/* Tabs or dropdown for mobile */}
      {isMobile ? (
        <Box width="100%">
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="dashboard-tab-select-label">Menu</InputLabel>
            <Select
              fullWidth
              labelId="dashboard-tab-select-label"
              value={tab}
              label="Menu"
              onChange={(e) => setTab(Number(e.target.value))}
            >
              {tabLabels.map((label, idx) => (
                <MenuItem key={label} value={idx}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) : (
        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          centered
          sx={{ mb: 3 }}
        >
          {tabLabels.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      )}
      <Box>
        {tab === 0 && <Summary data={data} />}
        {tab === 1 && <SmurfList smurfs={data.smurfs} jobs={data.jobs} />}
        {tab === 2 && <HouseList houses={data.houses} />}
        {tab === 3 && <WorkplaceList workplaces={data.workplaces} />}
        {tab === 4 && <VenueList venues={data.venues} />}
      </Box>
    </Box>
  );
}
