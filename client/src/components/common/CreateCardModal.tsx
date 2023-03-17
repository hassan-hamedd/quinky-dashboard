import React, { useState, useEffect } from "react";
import {  
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  FormControl,
  FormHelperText,
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
    isCardModalOpen: boolean;
    setIsCardModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIntroCards: React.Dispatch<React.SetStateAction<IntroCardsContainer>>;
}

const CreateCardModal = ({ isCardModalOpen, setIsCardModalOpen, setIntroCards }: Props) => {
    const [introCard, setIntroCard] = useState({
        title: "",
        paragraph: "",
    });

    return (
        <Dialog open={isCardModalOpen} onClose={() => {return;}}>
            <DialogTitle>
                Create intro card
                <IconButton 
                    aria-label="close" 
                    onClick={() => {
                        setIntroCard({ title: "", paragraph: "" });
                        setIsCardModalOpen(false);
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
                    <FormControl>
                        <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                            Enter Card Title
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            placeholder="Card title.."
                            value={introCard.title}
                            onChange={(e) => setIntroCard({ ...introCard, title: e.target.value })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                            Enter Card Paragraph
                        </FormHelperText>
                        <TextareaAutosize 
                            minRows={5}
                            required
                            placeholder="Card paragraph..."
                            color="info"
                            style={{ width: "100%", background: "transparent", fontSize: "16px", borderColor: "rgba(0, 0, 0, 0.23)",
                            borderRadius: 6, padding: 10, color: "#919191" }}
                            value={introCard.paragraph}
                            onChange={(e) => setIntroCard({ ...introCard, paragraph: e.target.value })}
                        />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
            <Button
                disabled={introCard.title.length === 0 || introCard.paragraph.length === 0}
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
                    setIntroCards(prev => ({
                        cards: [...prev.cards, introCard],
                        checkpoint: ""
                    }));
                    setIntroCard({ title: "", paragraph: "" });
                    setIsCardModalOpen(false);
                }}
                >
                Submit
            </Button>
            </DialogActions>
        </Dialog>
    )
};

export default CreateCardModal;