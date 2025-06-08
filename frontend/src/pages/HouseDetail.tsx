import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLinkedSmurfData } from "../hooks/useLinkedSmurfData";
import { getNameById } from "../types/SmurfTypes";

export default function HouseDetail() {
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

  // Find house by ID
  const house = data.houseById[Number(id)];
  if (!house) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography color="error">No such mushroom house!</Typography>
      </Box>
    );
  }

  // Accepted foods - always an array!
  const acceptedFoods: string[] = (house.acceptedFoods ?? [])
    .map((foodId: number) => getNameById(data.foods, foodId))
    .filter((name) => name !== "—");

  // Residents list
  const residentsList =
    house.residents && house.residents.length
      ? house.residents.map((smurf) => smurf.name).join(", ")
      : "No residents";

  return (
    <Box
      maxWidth={{ xs: "99vw", sm: 700, md: 1000 }}
      width="100%"
      mx="auto"
      pt={{ xs: 2, sm: 5 }}
      px={{ xs: 1, sm: 0 }}
    >
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/", { state: { tab: 2 } })}
        sx={{ mb: 2 }}
      >
        Back to mushroom houses
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
          <Box display="flex" alignItems="center" mb={2}>
            <Box
              sx={{
                width: 22,
                height: 100,
                background: `rgba(${house.color.r},${house.color.g},${
                  house.color.b
                },${house.color.a / 255})`,
                borderRadius: 3,
                mr: 3,
              }}
            />
            <Typography variant="h4" fontWeight={700}>
              {house.motto}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            <Stack
              direction="row"
              spacing={2}
              flexWrap="wrap"
              justifyContent="center"
            >
              <Chip label={`Capacity: ${house.capacity}`} color="primary" />
              <Chip
                label={`Main color: ${house.color.name}`}
                color="secondary"
              />
            </Stack>
            <Typography>
              <strong>Motto:</strong> {house.motto || "—"}
            </Typography>
            <Typography>
              <strong>Accepted foods:</strong>{" "}
              {acceptedFoods.length ? acceptedFoods.join(", ") : "—"}
            </Typography>

            <Typography>
              <strong>Residents:</strong> {residentsList}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
