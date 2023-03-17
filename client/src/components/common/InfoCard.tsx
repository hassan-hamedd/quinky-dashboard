import { Wysiwyg } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import { Typography, Box, Card, CardMedia, CardContent, Stack } from "@pankod/refine-mui";

import { IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

import { ContentCard2Props } from "interfaces/property";

interface Props {
    index: number;
    title: string;
    paragraphTitle: string;
    paragraph: string; 
    stackIndex: number;
    removeInfoCard: (index: number, stackIndex: number) => void;
}

const InfoCard = ({ index, title, paragraphTitle, paragraph, stackIndex, removeInfoCard }: Props) => {
  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: "330px",
        padding: "10px",
        margin: "20px",
        boxShadow: "0px 22px 45px 2px rgba(176, 176, 176, 0.35)",
        "&:hover": {
          boxShadow: "0px 22px 45px 2px rgba(176, 176, 176, 0.6)",
        },
        cursor: "pointer",
        display: "inline-block",
      }}
      elevation={0}
    >
        <CardContent sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "10px",
        paddingX: "5px", height: 230 }}>
            <IconButton 
                aria-label="close" 
                onClick={() => removeInfoCard(index, stackIndex)}
                sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                }}
            >
                <CloseOutlined />
            </IconButton>

            
            <Stack direction="column" gap={1}>
                <Wysiwyg
                sx={{
                    fontSize: 18,
                    color: "#11142D",
                    marginTop: 0.5,
                }}
                />
                <Typography fontSize={16} fontWeight={500} color="#11142D">
                    {title}
                </Typography>
                <Typography fontSize={15} fontWeight={500} color="#808191">{paragraphTitle}</Typography>
                    <Box bgcolor="#EDEDED" borderRadius={2} padding={2}>
                        <Typography fontSize={14} fontWeight={500} color="#808191" style={{wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
                            {paragraph}
                        </Typography>
                    </Box>
            </Stack>
        </CardContent>
    </Card>
  )
}

export default InfoCard;