import React, { useState, useEffect } from "react";
import {  
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  FormControl,
  FormHelperText,
  Select, 
  MenuItem,
  TextField,
  TextareaAutosize
} from "@pankod/refine-mui";
import { IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

import { FormProps } from "interfaces/common";
import { ContentCard2 } from "components";
import CustomButton from "./CustomButton";

interface IntroCard {
    title: string;
    paragraph: string;
}


interface IntroCardsContainer {
    cards: IntroCard[];
    checkpoint: string;
}

interface Props {
    isGameCardModalOpen: boolean;
    setIsGameCardModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // setIntroCards: React.Dispatch<React.SetStateAction<IntroCardsContainer>>;
}

function isValidURL(url: string) {
    // Regular expression for a valid URL
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    
    // Test the URL against the regular expression
    return urlRegex.test(url);
}  

const GameCardModal = ({ isGameCardModalOpen, setIsGameCardModalOpen, setGameCards }: any) => {
    const [cardTitle, setCardTitle] = useState("");
    const [cardType, setCardType] = useState("");
    const [cardList, setCardList] = useState("");
    const [cardParagraph, setCardParagraph] = useState("");
    const [cardTag, setCardTag] = useState("");
    const [tipOneText, setTipOneText] = useState("");
    const [tipOneImage, setTipOneImage] = useState("");
    const [tipTwoText, setTipTwoText] = useState("");
    const [tipTwoImage, setTipTwoImage] = useState("");
    const [emojis, setEmojis] = useState("");
    const [paragraphFontWeight, setParagraphFontWeight] = useState("");
    const [listImage, setListImage] = useState("");

    return (
        <Dialog open={isGameCardModalOpen} onClose={() => {return;}}>
            <DialogTitle>
                Create Game card
                <IconButton 
                    aria-label="close" 
                    onClick={() => {
                        // setIntroCard({ title: "", paragraph: "" });
                        setIsGameCardModalOpen(false);
                    }}
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                    }}
                >
                    <CloseOutlined />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form 
                    style={{ marginTop: "20px", width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}
                    onSubmit={() => {return;}}  
                    >
                         <FormControl sx={{ flex: 1 }}>
                            <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                                Select Game Category
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue="quinky"
                                value={cardType}
                                onChange={(e) => setCardType(e.target.value)}
                            >
                                {[
                                    {name: "Title & Paragraph", value: "titleAndParagraph"},
                                    {name: "Title & List", value: "titleAndList"},
                                    {name: "Tips & Precautions", value: "tipsAndPrecautions"},
                                ].map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    {cardType === "titleAndList" || cardType === "titleAndParagraph" ? (
                        <FormControl>
                            <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                                Enter Card Title
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required={cardType === "titleAndList" ? true : false}
                                id="outlined-basic"
                                color="info"
                                variant="outlined"
                                placeholder="Card title.."
                                value={cardTitle}
                                onChange={(e) => setCardTitle(e.target.value)}
                            />
                        </FormControl>
                    ) : null}

                    {cardType === "titleAndList" ? (
                        <FormControl>
                            <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                                Enter List Image URL
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                id="outlined-basic"
                                color="info"
                                variant="outlined"
                                placeholder="Paste the image URL here..."
                                value={listImage}
                                onChange={(e) => setListImage(e.target.value)}
                            />
                        </FormControl>
                    ) : null}

                    {cardType === "titleAndList" && (
                        <FormControl>
                            <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                            Enter List
                            </FormHelperText>
                            <TextareaAutosize 
                                minRows={5}
                                required
                                placeholder={`-Line 1${"\n"}-Line 2${"\n"}-Line 3`}
                                color="info"
                                style={{ width: "100%", background: "transparent", fontSize: "16px", borderColor: "rgba(0, 0, 0, 0.23)",
                                borderRadius: 6, padding: 10, color: "#919191" }}
                                value={cardList}
                                onChange={(e) => setCardList(e.target.value)}
                            />
                        </FormControl>
                    )}

                    {cardType === "titleAndParagraph" || cardType === "titleAndList" ? (
                        <FormControl>
                            <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                                Enter Tag
                            </FormHelperText>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                color="info"
                                variant="outlined"
                                placeholder="Write tag here..."
                                value={cardTag}
                                onChange={(e) => setCardTag(e.target.value)}
                            />
                        </FormControl>
                    ) : null}

                    {cardType === "titleAndParagraph"? (
                        <FormControl>
                            <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                            Enter Paragraph
                            </FormHelperText>
                            <TextareaAutosize 
                                minRows={5}
                                required
                                placeholder="Write paragraph here..."
                                color="info"
                                style={{ width: "100%", background: "transparent", fontSize: "16px", borderColor: "rgba(0, 0, 0, 0.23)",
                                borderRadius: 6, padding: 10, color: "#919191" }}
                                value={cardParagraph}
                                onChange={(e) => setCardParagraph(e.target.value)}
                            />
                        </FormControl>
                    ) : null}

                    {cardType === "titleAndParagraph"? (
                         <FormControl>
                            <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                                Enter Emojis
                            </FormHelperText>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                color="info"
                                variant="outlined"
                                placeholder="Write tag here..."
                                value={emojis}
                                onChange={(e) => setEmojis(e.target.value)}
                            />
                        </FormControl>
                    ) : null}

                    {cardType === "titleAndParagraph"? (
                         <FormControl sx={{ flex: 1 }}>
                            <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                                Select Paragraph Font Weight 
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue="quinky"
                                value={paragraphFontWeight}
                                onChange={(e) => setParagraphFontWeight(e.target.value)}
                            >
                                {[
                                    {name: "Bold", value: "bold"},
                                    {name: "Regular", value: "regular"},
                                ].map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : null}

                    {cardType === "tipsAndPrecautions" && (
                        <>
                            <FormControl>
                                <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                                Enter Tip 1 Text
                                </FormHelperText>
                                <TextareaAutosize 
                                    minRows={5}
                                    required={cardType === "tipsAndPrecautions" ? true : false}
                                    placeholder="Write tip 1 paragraph here..."
                                    color="info"
                                    style={{ width: "100%", background: "transparent", fontSize: "16px", borderColor: "rgba(0, 0, 0, 0.23)",
                                    borderRadius: 6, padding: 10, color: "#919191" }}
                                    value={tipOneText}
                                    onChange={(e) => setTipOneText(e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                                    Enter Tip 1 Image URL
                                </FormHelperText>
                                <TextField
                                    fullWidth
                                    required={cardType === "tipsAndPrecautions" ? true : false}
                                    id="outlined-basic"
                                    color="info"
                                    variant="outlined"
                                    placeholder="Paste the image URL here..."
                                    value={tipOneImage}
                                    onChange={(e) => setTipOneImage(e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                                Enter Tip 2 Text
                                </FormHelperText>
                                <TextareaAutosize 
                                    minRows={5}
                                    required={cardType === "tipsAndPrecautions" ? true : false}
                                    placeholder="Write tip 2 paragraph here..."
                                    color="info"
                                    style={{ width: "100%", background: "transparent", fontSize: "16px", borderColor: "rgba(0, 0, 0, 0.23)",
                                    borderRadius: 6, padding: 10, color: "#919191" }}
                                    value={tipTwoText}
                                    onChange={(e) => setTipTwoText(e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                                    Enter Tip 2 Image URL
                                </FormHelperText>
                                <TextField
                                    fullWidth
                                    required={cardType === "tipsAndPrecautions" ? true : false}
                                    id="outlined-basic"
                                    color="info"
                                    variant="outlined"
                                    placeholder="Paste the image URL here..."
                                    value={tipTwoImage}
                                    onChange={(e) => setTipTwoImage(e.target.value)}
                                />
                            </FormControl>
                        </>
                    )}
                </form>
            </DialogContent>
            <DialogActions>
            <Button
                sx={{
                    flex: 1,
                    padding: "10px 15px",
                    width: "100%",
                    minWidth: 60,
                    backgroundColor: "#475be8",
                    color: "#fcfcfc",
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: "capitalize",
                    "&:hover": {
                    opacity: 0.9,
                    backgroundColor: "#475be8",
                    }
                }}
                onClick={() => {
                    let card: any;
                    if(cardType === "titleAndParagraph") {
                        if(cardParagraph.length === 0) {
                            alert("Please enter paragraph");
                            return;
                        }
                        if(paragraphFontWeight === "" || paragraphFontWeight === undefined) {
                            alert("Please select paragraph font weight");
                            return;
                        }
                        if(paragraphFontWeight === "bold" && cardParagraph.length > 200) {
                            alert("Please enter paragraph less than 200 characters when font weight is bold");
                            return;
                        }
                        card = {
                            cardType,
                            title: cardTitle,
                            tag: cardTag,
                            paragraph: cardParagraph,
                            emojis,
                            paragraphFontWeight,
                        }
                    } else if(cardType === "tipsAndPrecautions") {
                        if(tipOneText.length === 0 || tipOneImage.length === 0 || tipTwoText.length === 0 || tipTwoImage.length === 0) {
                            alert("Please enter all fields");
                            return;
                        }
                        if(!isValidURL(tipOneImage) || !isValidURL(tipTwoImage)) {
                            alert("Please enter valid image URL");
                            return;
                        }
                        card = {
                            cardType,
                            tipOneText,
                            tipOneImage,
                            tipTwoText,
                            tipTwoImage,
                        }
                    } else if(cardType === "titleAndList") {
                        if(cardList.length === 0 || cardList.split("\n").length < 2) {
                            alert("Please enter atleast 3 list items");
                            return;
                        }
                        if(cardList.split("\n").length > 4) {
                            alert("Please enter atmost 4 list items");
                            return;
                        }
                        if(cardTitle.length === 0) {
                            alert("Please enter title");
                            return;
                        }
                        if(listImage.length === 0) {
                            alert("Please enter list image");
                            return;
                        }
                        if(!isValidURL(listImage)) {
                            alert("Please enter valid list image URL");
                            return;
                        }
                        card = {
                            cardType,
                            title: cardTitle,
                            tag: cardTag,
                            listImage,
                            listItems: cardList.split("\n").map(line => line.replace(/-/g, "").trim()),
                        }
                    }
                    if(!card) {
                        alert("Error. Cannot add card");
                        return;
                    }
                    try {
                        setGameCards((prev: any) => [...prev, card]);
                        setCardType("");
                        setCardTitle("");
                        setCardParagraph("");
                        setCardList("");
                        setTipOneText("");
                        setTipOneImage("");
                        setTipTwoText("");
                        setTipTwoImage("");
                        setListImage("");
                        setParagraphFontWeight("");
                        setCardTag("");
                        setEmojis("");
                        setIsGameCardModalOpen(false);
                    } catch(e) {
                        alert(`Error. Cannot add card ${e}`);
                        return;
                    }
                }}
                >
                Submit
            </Button>
            </DialogActions>
        </Dialog>
    )
};

export default GameCardModal;