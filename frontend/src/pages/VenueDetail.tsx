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

export default function VenueDetail() {
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

  const venue = data.venueById[Number(id)];
  if (!venue) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography color="error">No such Leisure venue!</Typography>
      </Box>
    );
  }

  const brandName = getNameById(data.brands, venue.acceptedBrand);

  const membersList =
    venue.members && venue.members.length
      ? venue.members.map((smurf) => smurf.name).join(", ")
      : "No members";

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
        onClick={() => navigate("/", { state: { tab: 4 } })}
        sx={{ mb: 2 }}
      >
        Back to Leisure venues
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
            {venue.name}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack
            direction="row"
            spacing={1}
            sx={{ my: 1, width: "100%", rowGap: 1 }}
            flexWrap="wrap"
            justifyContent="center"
          >
            <Chip label={`Capacity: ${venue.capacity}`} color="primary" />
            <Chip label={`Accepted brand: ${brandName}`} color="secondary" />
            <Chip label={`Members: ${venue.members?.length || 0}`} />
          </Stack>
          <Typography sx={{ mt: 10 }}>
            <strong>Members:</strong> {membersList}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
