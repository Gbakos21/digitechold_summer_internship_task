import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Stack,
} from "@mui/material";
import type { LeisureVenue, Brand } from "../types/SmurfTypes";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { getNameById } from "../types/SmurfTypes";

type VenueListProps = {
  venues: LeisureVenue[];
  brands: Brand[];
};

export default memo(function VenueList({ venues, brands }: VenueListProps) {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      {venues.map((v) => (
        <Grid key={v.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
            onClick={() => navigate(`/venue/${v.id}`)}
          >
            <CardContent
              sx={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h6">{v.name}</Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ my: 1, width: "100%", rowGap: 1 }}
                flexWrap="wrap"
                justifyContent="center"
              >
                <Chip label={`Members: ${v.members?.length || 0}`} />
                <Chip label={`Capacity: ${v.capacity}`} />
                <Chip
                  label={`Brand: ${getNameById(brands, v.acceptedBrand)}`}
                />
              </Stack>
              <Typography variant="body2" fontWeight={600}>
                Members:
              </Typography>
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  textAlign: "center",
                }}
              >
                {v.members?.length ? (
                  v.members.map((smurf) => (
                    <div key={smurf.id} style={{ marginBottom: 2 }}>
                      {smurf.name}
                    </div>
                  ))
                ) : (
                  <div style={{ color: "#888" }}>No members</div>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});
