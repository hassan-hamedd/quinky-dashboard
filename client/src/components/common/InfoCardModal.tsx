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


interface InfoCard {
    title: string;
    paragraphTitle: string;
    paragraph: string;
}

interface InfoStack {
    cards: InfoCard[];
    checkpoint: string;
}

interface Props {
    isInfoModalOpen: boolean;
    setIsInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setInfoStacks: React.Dispatch<React.SetStateAction<InfoStack[]>>;
    infoStacks: InfoStack[];
    infoCreateType: string;
    stackIndex: number;
}


const InfoCardModal = ({ isInfoModalOpen, setIsInfoModalOpen, infoStacks, setInfoStacks, infoCreateType, stackIndex = 0 }: Props) => {
    const [infoCard, setInfoCard] = useState({
        title: "",
        paragraphTitle: "",
        paragraph: "",
    });

    return (
        <Dialog open={isInfoModalOpen} onClose={() => {return;}}>
            <DialogTitle>
                Create info card
                <IconButton 
                    aria-label="close" 
                    onClick={() => {
                        setInfoCard({ title: "", paragraphTitle: "", paragraph: "" });
                        setIsInfoModalOpen(false);
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
                            value={infoCard.title}
                            onChange={(e) => setInfoCard({ ...infoCard, title: e.target.value })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                            Enter Paragraph Title
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            placeholder="Card paragraph title.."
                            value={infoCard.paragraphTitle}
                            onChange={(e) => setInfoCard({ ...infoCard, paragraphTitle: e.target.value })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                            Enter Paragraph
                        </FormHelperText>
                        <TextareaAutosize 
                            minRows={5}
                            required
                            placeholder="Card paragraph..."
                            color="info"
                            style={{ width: "100%", background: "transparent", fontSize: "16px", borderColor: "rgba(0, 0, 0, 0.23)",
                            borderRadius: 6, padding: 10, color: "#919191" }}
                            value={infoCard.paragraph}
                            onChange={(e) => setInfoCard({ ...infoCard, paragraph: e.target.value })}
                        />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
            <Button
                disabled={infoCard.title.length === 0 || infoCard.paragraph.length === 0}
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
                    setInfoStacks((prevState) => {
                        if (infoCreateType === "stack") {
                          return [
                            ...prevState, 
                            {
                                cards: [
                                    {
                                        title: infoCard.title,
                                        paragraphTitle: infoCard.paragraphTitle,
                                        paragraph: infoCard.paragraph,
                                    }
                                ],
                                checkpoint: "",
                            }
                        ];
                        } else {
                          return prevState.map((stack, index) => {
                            if (index === stackIndex) {
                              return {
                                ...stack,
                                cards: [
                                  ...stack.cards,
                                  {
                                    title: infoCard.title,
                                    paragraphTitle: infoCard.paragraphTitle,
                                    paragraph: infoCard.paragraph,
                                  },
                                ],
                              };
                            } else {
                              return stack;
                            }
                          });
                        }
                      });
                    setInfoCard({ title: "", paragraphTitle: "", paragraph: "" });
                    setIsInfoModalOpen(false);
                }}
                >
                Submit
            </Button>
            </DialogActions>
        </Dialog>
    )
};

export default InfoCardModal;