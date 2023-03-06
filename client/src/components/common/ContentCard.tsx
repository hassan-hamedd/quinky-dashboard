import { Wysiwyg } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import { Typography, Box, Card, CardMedia, CardContent, Stack } from "@pankod/refine-mui";

import { ContentCardProps } from "interfaces/property";

const ContentCard = ({ id, title, photo, contentType }: ContentCardProps) => {
  return (
    <Card
      component={Link}
      to={`/content/show/${id}`}
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
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#11142D">
            {title}
          </Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Wysiwyg
              sx={{
                fontSize: 18,
                color: "#11142D",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={14} color="#808191">{contentType.charAt(0).toUpperCase() + contentType.slice(1)}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ContentCard;