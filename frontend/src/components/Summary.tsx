import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import type { LinkedData } from "../hooks/useLinkedSmurfData";
import { memo } from "react";

export default memo(function Summary({ data }: { data: LinkedData }) {
  const summaryData = [
    { id: 0, value: data.smurfs.length, label: "Smurfs" },
    { id: 1, value: data.houses.length, label: "Mushrooms" },
    { id: 2, value: data.workplaces.length, label: "Workplaces" },
    { id: 3, value: data.venues.length, label: "Leisure" },
  ];

  const choiceData = [
    { id: 0, value: data.jobs.length, label: "Job Types" },
    { id: 1, value: data.brands.length, label: "Brands" },
    { id: 2, value: data.foods.length, label: "Foods" },
  ];

  return (
    <Box>
      {/* Top cards */}
      <Grid container spacing={2} alignItems="stretch" justifyContent="center">
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                General Statistics
              </Typography>
              <Typography>
                Smurfs: <b>{data.smurfs.length}</b>
              </Typography>
              <Typography>
                Mushroom Houses: <b>{data.houses.length}</b>
              </Typography>
              <Typography>
                Workplaces: <b>{data.workplaces.length}</b>
              </Typography>
              <Typography>
                Leisure Venues: <b>{data.venues.length}</b>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Selectable Values
              </Typography>
              <Typography>
                Job Types: <b>{data.jobs.length}</b>
              </Typography>
              <Typography>
                Brands: <b>{data.brands.length}</b>
              </Typography>
              <Typography>
                Foods: <b>{data.foods.length}</b>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Responsive charts row */}
      <Box
        mt={4}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Box sx={{ width: "100%", maxWidth: 300 }}>
          <PieChart
            series={[
              {
                data: summaryData,
                innerRadius: 30,
                outerRadius: 80,
                paddingAngle: 2,
                cornerRadius: 8,
              },
            ]}
            width={260}
            height={230}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ width: "100%", maxWidth: 300 }}>
          <PieChart
            series={[
              {
                data: choiceData,
                innerRadius: 30,
                outerRadius: 80,
                paddingAngle: 2,
                cornerRadius: 8,
              },
            ]}
            width={260}
            height={230}
            sx={{ width: "100%" }}
          />
        </Box>
      </Box>
    </Box>
  );
});
