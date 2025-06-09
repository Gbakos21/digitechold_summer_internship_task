import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import type { Smurf, Job } from "../types/SmurfTypes";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { getNameById } from "../types/SmurfTypes";

export default memo(function SmurfList({
  smurfs,
  jobs,
}: {
  smurfs: Smurf[];
  jobs: Job[];
}) {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      {smurfs.map((smurf) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={smurf.id}>
          <Card
            sx={{
              display: "flex",
              alignItems: "stretch",
              height: "100%",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
              "&:hover": {
                boxShadow: 8,
                transform: "scale(1.015)",
              },
            }}
            onClick={() => navigate(`/smurf/${smurf.id}`)}
          >
            <Box
              sx={{
                width: 8,
                background: `rgba(${smurf.favouriteColor.r},${
                  smurf.favouriteColor.g
                },${smurf.favouriteColor.b},${smurf.favouriteColor.a / 255})`,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{smurf.name}</Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ my: 1, width: "100%", rowGap: 1 }}
                flexWrap="wrap"
                justifyContent="center"
              >
                <Chip label={`Age: ${smurf.age}`} />
              </Stack>
              <Typography variant="body2">
                <strong>Job:</strong> {getNameById(jobs, smurf.job) || "—"}
              </Typography>
              <Typography variant="body2">
                <strong>Workplace:</strong> {smurf.workplace?.name || "—"}
              </Typography>
              <Typography variant="body2">
                <strong>Mushroom House:</strong> {smurf.house?.motto || "—"}
              </Typography>
              <Typography variant="body2">
                <strong>Leisure Venue:</strong>{" "}
                {smurf.leisureVenue?.name || "—"}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Favourite color:</strong>{" "}
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: `rgba(${smurf.favouriteColor.r},${
                      smurf.favouriteColor.g
                    },${smurf.favouriteColor.b},${
                      smurf.favouriteColor.a / 255
                    })`,
                    marginRight: 4,
                    verticalAlign: "middle",
                  }}
                />
                {smurf.favouriteColor.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});
