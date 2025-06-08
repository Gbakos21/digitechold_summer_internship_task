import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLinkedSmurfData } from "../hooks/useLinkedSmurfData";
import { getNameById } from "../types/SmurfTypes";

export default function WorkplaceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, error } = useLinkedSmurfData();

  if (error) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  if (!data) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const wp = data.workplaceById[Number(id)];
  if (!wp) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography color="error">No such workplace!</Typography>
      </Box>
    );
  }

  const jobNames = wp.acceptedJobs
    .map((id) => getNameById(data.jobs, id))
    .filter((n) => n !== "—");

  const employees = wp.employees && wp.employees.length ? wp.employees : [];

  return (
    <Box
      maxWidth={{ xs: "99vw", sm: 1100, md: 1300, lg: 2000 }}
      width="100%"
      mx="auto"
      pt={{ xs: 2, sm: 5 }}
      px={{ xs: 1, sm: 0 }}
    >
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/", { state: { tab: 3 } })}
        sx={{ mb: 2 }}
      >
        Back to workplaces
      </Button>
      <Card
        sx={{
          width: "100%",
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          boxShadow: 6,
          minHeight: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardContent sx={{ width: "100%", p: 0 }}>
          <Typography variant="h4" fontWeight={700} mb={2}>
            {wp.name}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack
            direction="row"
            spacing={1}
            sx={{ my: 1, width: "100%", rowGap: 1 }}
            flexWrap="wrap"
            justifyContent="center"
          >
            <Chip
              label={`Accepted job types: ${jobNames.length}`}
              color="primary"
            />
            <Chip label={`Employees: ${employees.length}`} color="secondary" />
          </Stack>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <Paper
                elevation={2}
                sx={{ p: 2, minHeight: 200, width: "100%", overflowX: "auto" }}
              >
                <Typography variant="h6" mb={1}>
                  Accepted job types
                </Typography>
                {jobNames.length ? (
                  <Stack spacing={1}>
                    {jobNames.map((name, i) => (
                      <Typography key={i} sx={{ wordBreak: "break-all" }}>
                        {name}
                      </Typography>
                    ))}
                  </Stack>
                ) : (
                  <Typography color="text.secondary">
                    No accepted job types
                  </Typography>
                )}
              </Paper>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Paper
                elevation={2}
                sx={{ p: 2, minHeight: 200, width: "100%", overflowX: "auto" }}
              >
                <Typography variant="h6" mb={1}>
                  Employees
                </Typography>
                {employees.length ? (
                  <Stack spacing={1}>
                    {employees.map((smurf) => (
                      <Typography
                        key={smurf.id}
                        sx={{ wordBreak: "break-all" }}
                      >
                        {smurf.name}
                      </Typography>
                    ))}
                  </Stack>
                ) : (
                  <Typography color="text.secondary">No employees</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
