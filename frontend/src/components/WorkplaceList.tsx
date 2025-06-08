import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Stack,
} from "@mui/material";
import type { WorkingPlace } from "../types/SmurfTypes";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

export default memo(function WorkplaceList({
  workplaces,
}: {
  workplaces: WorkingPlace[];
}) {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      {workplaces.map((wp) => (
        <Grid key={wp.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              height: 270,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "box-shadow 0.2s, transform 0.2s",
              "&:hover": {
                boxShadow: 8,
                transform: "scale(1.015)",
              },
            }}
            onClick={() => navigate(`/workplace/${wp.id}`)}
          >
            <CardContent
              sx={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h6">{wp.name}</Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ my: 1 }}
                justifyContent="center"
              >
                <Chip label={`Employees: ${wp.employees?.length || 0}`} />
                <Chip label={`Accepted jobs: ${wp.acceptedJobs.length}`} />
              </Stack>
              <Typography variant="body2" fontWeight={600}>Employees:</Typography>
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  textAlign: "center",
                }}
              >
                {wp.employees?.length ? (
                  wp.employees.map((smurf) => (
                    <div key={smurf.id} style={{ marginBottom: 2 }}>
                      {smurf.name}
                    </div>
                  ))
                ) : (
                  <div style={{ color: "#888" }}>No employees</div>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});
