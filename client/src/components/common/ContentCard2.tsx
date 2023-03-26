import { Wysiwyg } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import { Typography, Box, Card, CardMedia, CardContent, Stack } from "@pankod/refine-mui";

import { ContentCard2Props } from "interfaces/property";

const ContentCard2 = ({ id, title, paragraphTitle, paragraph }: ContentCard2Props) => {
  return (
    <Card
      // component={Link}
      // to={`/learning/show/${id}`}
      sx={{
        maxWidth: "330px",
        padding: "10px",
        boxShadow: "0px 22px 45px 2px rgba(176, 176, 176, 0.35)",
        "&:hover": {
          boxShadow: "0px 22px 45px 2px rgba(176, 176, 176, 0.6)",
        },
        cursor: "pointer",
      }}
      elevation={0}
    >
      <CardContent sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "10px",
      paddingX: "5px", height: 230 }}>
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#11142D">
            {title}
          </Typography>
          <Stack direction="column" gap={0.5} alignItems="flex-start">
            <Wysiwyg
              sx={{
                fontSize: 18,
                color: "#11142D",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={15} fontWeight={500} color="#808191">{paragraphTitle}</Typography>
            <Box bgcolor="#EDEDED" borderRadius={2} padding={2}>
                <Typography fontSize={14} fontWeight={500} color="#808191">{paragraph}</Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ContentCard2;