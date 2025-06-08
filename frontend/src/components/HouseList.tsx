import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  Grid,
} from "@mui/material";
import type { MushroomHouse } from "../types/SmurfTypes";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

export default memo(function HouseList({
  houses,
}: {
  houses: MushroomHouse[];
}) {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} alignItems="stretch">
      {houses.map((house) => (
        <Grid key={house.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "stretch",
              cursor: "pointer",
              transition: "box-shadow 0.2s, transform 0.2s",
              "&:hover": {
                boxShadow: 10,
                transform: "scale(1.015)",
              },
            }}
            onClick={() => navigate(`/house/${house.id}`)}
          >
            {/* Left colored stripe */}
            <Box
              sx={{
                width: 8,
                height: "100%",
                background: `rgba(${house.color.r},${house.color.g},${
                  house.color.b
                },${house.color.a / 255})`,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                flexShrink: 0,
              }}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={700}>
                {house.motto}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ my: 1, width: "100%", rowGap: 1 }}
                flexWrap="wrap"
                justifyContent="center"
              >
                <Chip label={`Main color: ${house.color.name}`} />
                <Chip label={`Capacity: ${house.capacity}`} />
                <Chip label={`Residents: ${house.residents?.length || 0}`} />
              </Stack>

              <Typography variant="body2" fontWeight={600}>
                Residents:
              </Typography>
              <div style={{ margin: 0, paddingLeft: 18 }}>
                {house.residents?.length ? (
                  house.residents.map((smurf) => (
                    <div key={smurf.id}>{smurf.name}</div>
                  ))
                ) : (
                  <div>No residents</div>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});
