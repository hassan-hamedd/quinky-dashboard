import { Wysiwyg } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import { Typography, Box, Card, CardMedia, CardContent, Stack } from "@pankod/refine-mui";

import { GamesCardProps } from "interfaces/property";

const GamesCard = ({ id, title, photo, contentCategory, spiciness }: GamesCardProps) => {
  const pepperEmojis = '🌶'.repeat(spiciness);
  return (
    <Card
      onClick={() => {
        alert("The game details page is under construction 🚧. Please check back later. Thank you!");
        return;
      }}
      // component={Link}
      // to={`/games/show/${id}`}
      sx={{
        maxWidth: "330px",
        padding: "10px",
        "&:hover": {
          boxShadow: "0px 22px 45px 2px rgba(176, 176, 176, 0.1)",
        },
        cursor: "pointer",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        width="100%"
        height={210}
        image={photo}
        alt="card image"
        sx={{ borderRadius: "10px" }}
      />
      <CardContent sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "10px",
      paddingX: "5px" }}>
        <Stack direction="column" gap={1} sx={{ width: "100%" }}>
          <Stack direction="row" gap={0.5} alignItems="flex-start" justifyContent="space-between" sx={{ width: "100%" }}>
            <Typography fontSize={16} fontWeight={500} color="#11142D">
              {title}
            </Typography>
            <Typography fontSize={11} color="#808191">
              {pepperEmojis}
            </Typography>
          </Stack>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Wysiwyg
              sx={{
                fontSize: 18,
                color: "#11142D",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={14} color="#808191">{contentCategory.charAt(0).toUpperCase() + contentCategory.slice(1)}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default GamesCard;