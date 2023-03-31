import React from "react";
import { ImportExport, Wysiwyg } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import { Typography, Box, Card, CardMedia, CardContent, Stack } from "@pankod/refine-mui";

import { ContentCard3Props } from "interfaces/property";

const ContentCard3 = ({ id, card }: ContentCard3Props) => {
  return (
    <Card
    //   component={Link}
    //   to={`/learning/show/${id}`}
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
      paddingX: "5px", height: 290 }}>
        <Stack direction="column" gap={1}>
        {card.cardType === "titleAndParagraph" || card.cardType === "titleAndList" ? (
          <Typography fontSize={16} fontWeight={500} color="#11142D">
            {card.title}
          </Typography>
        ) : null}  
          <Stack direction="column" gap={0.5} alignItems="flex-start">
            <Stack direction="row" gap={0.3} alignItems="flex-start" justifyContent="center">
                <Wysiwyg
                sx={{
                    fontSize: 18,
                    color: "#11142D",
                    marginTop: 0.5,
                }}
                />
                <Typography fontSize={15} fontWeight={500} color="#808191">{card.cardType}</Typography>
            </Stack>

            {card.tag && (card.cardType === "titleAndParagraph" || card.cardType === "titleAndList") ? (
                <Box bgcolor="#EDEDED" borderRadius={2} padding={0.5}>
                        <Typography fontSize={12} fontWeight={500} color="#808191">
                            {card.tag}
                        </Typography>
                </Box>
            ) : null}
            {card.cardType === "titleAndList" || card.cardType === "titleAndParagraph" ? (
                <Box bgcolor="#EDEDED" borderRadius={2} padding={2}>
                    {card.cardType === "titleAndParagraph" && (
                        <>
                            <Typography fontSize={14} fontWeight={card.paragraphFontWeight === "regular" ? 500 : "bold"} color="#808191">
                                {card.paragraph}
                            </Typography>
                            {card.emojis.length > 0 && (
                                <Typography fontSize={14} fontWeight={card.paragraphFontWeight === "regular" ? 500 : "bold"} color="#808191">
                                    {card.emojis}
                                </Typography>
                            )}
                        </>
                    )}
                    {card.cardType === "titleAndList" && (
                        <Typography fontSize={14} fontWeight={500} color="#808191">
                            {card.listItems.map((item: string) => (
                                <React.Fragment key={item}>
                                <span>- {item}</span>
                                <br />
                                </React.Fragment>
                            ))}
                        </Typography>
                    )}
                </Box>
            ) : null}

            {card.cardType === "titleAndList" ? (
                <CardMedia
                    component="img"
                    width="auto"
                    height={65}
                    image={card.listImage}
                    alt="card image"
                    sx={{ borderRadius: "10px" }}
                />
            ) : null}

            {card.cardType === "paragraphAndImage" ? (
                <>
                    <Box bgcolor="#EDEDED" borderRadius={2} padding={2} marginBottom={3}>
                        <Typography fontSize={14} fontWeight={500} color="#808191">
                            {card.paragraph}
                        </Typography>
                    </Box>
                    <CardMedia
                        component="img"
                        width="auto"
                        height="auto"
                        image={card.paragraphImage}
                        alt="card image"
                        sx={{ borderRadius: "10px" }}
                    />
                </>
            ) : null}

            {card.cardType === "tipsAndPrecautions" ? (
                <Stack direction="row" gap={0.4} alignItems="flex-start" justifyContent="center">
                    <Stack direction="column" gap={0.5} alignItems="flex-start">
                        <Box bgcolor="#EDEDED" borderRadius={2} padding={2}>
                            <Typography fontSize={12} fontWeight={500} color="#808191">
                                {card.tipOneText}
                            </Typography>
                        </Box>
                        <CardMedia
                            component="img"
                            width="auto"
                            height={75}
                            image={card.tipOneImage}
                            alt="card image"
                            sx={{ borderRadius: "10px" }}
                        />
                    </Stack>

                    <Stack direction="column" gap={0.5} alignItems="flex-start">
                        <Box bgcolor="#EDEDED" borderRadius={2} padding={2}>
                            <Typography fontSize={12} fontWeight={500} color="#808191">
                                {card.tipTwoText}
                            </Typography>
                        </Box>
                        <CardMedia
                            component="img"
                            width="auto"
                            height={75}
                            image={card.tipTwoImage}
                            alt="card image"
                            sx={{ borderRadius: "10px" }}
                        />
                    </Stack>
                </Stack>
            ) : null}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ContentCard3;