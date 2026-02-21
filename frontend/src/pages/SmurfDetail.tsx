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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLinkedSmurfData } from "../hooks/useLinkedSmurfData";
import { getNameById } from "../types/SmurfTypes";

export default function SmurfDetail() {
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

  // Find smurf by ID
  const smurf = data.smurfById[Number(id)];
  if (!smurf) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography color="error">No such smurf!</Typography>
      </Box>
    );
  }

  const jobName = getNameById(data.jobs, smurf.job);
  const foodName = getNameById(data.foods, smurf.favouriteFood);
  const brandName = getNameById(data.brands, smurf.favouriteBrand);

  return (
    <Box
      maxWidth={{ xs: "99vw", sm: 700, md: 900, lg: 1200 }}
      mx="auto"
      pt={{ xs: 2, sm: 5 }}
      px={{ xs: 1, sm: 0 }}
    >
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/", { state: { tab: 1 } })}
        sx={{ mb: 2 }}
      >
        Back to smurfs
      </Button>
      <Card
        sx={{
          p: { xs: 2, sm: 4 },
          width: "100%",
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
                width: 20,
                height: 90,
                background: `rgba(${smurf.favouriteColor.r},${
                  smurf.favouriteColor.g
                },${smurf.favouriteColor.b},${smurf.favouriteColor.a / 255})`,
                borderRadius: 3,
                mr: 3,
              }}
            />
            <Typography variant="h4" fontWeight={700}>
              {smurf.name}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Chip label={`Age: ${smurf.age}`} color="primary" />
              <Chip label={`Job: ${jobName}`} color="secondary" />
            </Stack>
            <Typography>
              <strong>Favourite food:</strong> {foodName}
            </Typography>
            <Typography>
              <strong>Favourite brand:</strong> {brandName}
            </Typography>
            <Typography>
              <strong>Favourite color:</strong>{" "}
              <span
                style={{
                  display: "inline-block",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: `rgba(${smurf.favouriteColor.r},${
                    smurf.favouriteColor.g
                  },${smurf.favouriteColor.b},${smurf.favouriteColor.a / 255})`,
                  marginRight: 6,
                  verticalAlign: "middle",
                  border: "2px solid #fff",
                  boxShadow: "0 0 4px #aaa",
                }}
              />
              {smurf.favouriteColor.name}
            </Typography>
            <Typography>
              <strong>Workplace:</strong> {smurf.workplace?.name || "—"}
            </Typography>
            <Typography>
              <strong>Mushroom house:</strong> {smurf.house?.motto || "—"}
            </Typography>
            <Typography>
              <strong>Leisure venue:</strong> {smurf.leisureVenue?.name || "—"}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
