import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  FormControl, 
  FormHelperText, 
  TextField, 
  TextareaAutosize, 
  Stack, 
  Select, 
  MenuItem, 
  Button 
} from "@pankod/refine-mui";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { IntroCardsContainer, LearningContentFormProps } from "interfaces/common";
import { IntroCard, InfoCard } from "components";
import CustomButton from "./CustomButton";
import CreateCardModal from "./CreateCardModal";
import InfoCardModal from "./InfoCardModal";

interface Card {
  _id: number;
  title: string;
  paragraphTitle: string;
  paragraph: string;
}

interface IntroCard {
  title: string;
  paragraph: string;
}

interface InfoCard {
    title: string;
    paragraphTitle: string;
    paragraph: string;
}

interface InfoStack {
    cards: InfoCard[];
    checkpoint: string;
}

const CreateLearningContent = ({ 
    type, 
    register, 
    handleSubmit, 
    formLoading, 
    onFinishHandler, 
    contentImage, 
    introCards, 
    setIntroCards, 
    infoStacks, 
    setInfoStacks }: LearningContentFormProps) => {

    const [stackIndex, setStackIndex] = useState(0);
    const [infoCreateType, setInfoCreateType] = useState("stack");
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    const removeIntroCard = (index: number) => {
        const newIntroCards = {
            ...introCards,
            cards: introCards.cards.filter((_, i) => i !== index),
        };
        setIntroCards(newIntroCards);
    }

    const removeInfoCard = (index: number, stackIndex: number) => {
        console.log("X button clicked");
        console.log("Stack Index is: ", stackIndex);
        const newInfoStacks = infoStacks.map((stack, i) => {
            if (i === stackIndex) {
                console.log("Stack index matched", i);
                return {
                    ...stack,
                    cards: stack.cards.filter((_, j) => j !== index)
                }
            }
            return stack;
        });
        setInfoStacks(newInfoStacks);
    }


    return (
        <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142D">
            {type} a new piece of Content
        </Typography>

        <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
            <form 
            style={{ marginTop: "20px", width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={handleSubmit(onFinishHandler)}  
            >
            <FormControl>
                <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                Enter Content Name
                </FormHelperText>
                <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                variant="outlined"
                {...register("title", { required: true })}
                />
            </FormControl>

            <Stack direction="row" gap={4}>
                <FormControl sx={{ flex: 1 }}>
                <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                    Select Content Category
                </FormHelperText>
                <Select
                    variant="outlined"
                    color="info"
                    displayEmpty
                    required
                    inputProps={{ "aria-label": "Without label" }}
                    defaultValue="health"
                    {...register("contentCategory", { required: true })}
                >
                    {["sex positions", "anatomy", "history", "animal world", "compatibility", "health", 
                    "communication during sex", "what's normal", "dictionary"].map((category) => (
                        <MenuItem value={category}>{category}</MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Stack>
            
            <CreateCardModal 
                isCardModalOpen={isCardModalOpen} 
                setIsCardModalOpen={setIsCardModalOpen} 
                setIntroCards={setIntroCards} 
            />

            <Stack direction="column" gap={1} justifyContent="center" mb={2}>
                <Stack direction="row" gap={2}>
                    <Typography fontSize={16} fontWeight={500} my="10px" color="#11142D">
                        Intro Cards
                    </Typography>
                    <CustomButton
                        title=""
                        backgroundColor="#475BE8"
                        color="#FCFCFC"
                        fullWidth={false}
                        icon={<AddCircleOutlineOutlined />}
                        handleClick={() => {
                            setIsCardModalOpen(true);
                        }}
                    />
                </Stack>

                <FormControl sx={{ width: "100%" }}>
                    <FormHelperText sx={{ fontWeight: 400, margin: "10px 0", fontSize: 14, color: "#11142D" }}>
                        Checkpoint Text
                    </FormHelperText>
                    <TextField
                        fullWidth
                        required
                        size="small"
                        id="outlined-basic"
                        color="info"
                        variant="outlined"
                        placeholder="Checkpoint text.."
                        value={introCards.checkpoint}
                        onChange={(e) => {
                            setIntroCards((prev: IntroCardsContainer) => ({
                                ...prev,
                                checkpoint: e.target.value,
                            }));
                        }}
                    />
                </FormControl>

                <Box mt="10px" sx={{ display: "flex", justifyContent: "flex-start" }}>
                {introCards.cards.length > 0 ? (
                    <Box sx={{ 
                        overflowX: "scroll", 
                        overflowY: "hidden", 
                        whiteSpace: "nowrap", 
                        maxWidth: "1000px", 
                        '&::-webkit-scrollbar': {
                            width: '2px',
                            backgroundColor: '#F9F9F9'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#000000',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: '#1A1A1A'
                            }
                        },
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#000000 #F5F5F5'
                    }}>
                        {introCards.cards.map((introCard, index) => (
                            <IntroCard
                                key={index}
                                index={index}
                                title={introCard.title}
                                paragraph={introCard.paragraph}
                                removeIntroCard={removeIntroCard}
                            />
                        ))}
                    </Box>
                ) : <Typography fontSize={14} fontWeight={500} color="#808191">No intro cards</Typography>}
                </Box>
                
            </Stack>

            <InfoCardModal 
                isInfoModalOpen={isInfoModalOpen}
                setIsInfoModalOpen={setIsInfoModalOpen}
                infoStacks={infoStacks}
                setInfoStacks={setInfoStacks}
                infoCreateType={infoCreateType}
                stackIndex={stackIndex}
            />


            <Stack direction="column" mt="20px" gap={1} justifyContent="center" mb={2}>
                <Stack direction="row" gap={2}>
                    <Typography fontSize={16} fontWeight={500} my="10px" color="#11142D">
                        Info Stacks
                    </Typography>
                    <CustomButton
                        title=""
                        backgroundColor="#475BE8"
                        color="#FCFCFC"
                        fullWidth={false}
                        icon={<AddCircleOutlineOutlined />}
                        handleClick={() => {
                            setInfoCreateType("stack");
                            setIsInfoModalOpen(true);
                        }}
                    />
                </Stack>

                {infoStacks.length > 0 ? (
                    infoStacks.map((infoStack, stackIndex) => (
                        <Box>
                            <Stack direction="row" gap={2} alignItems="center">
                                <Typography fontSize={15} fontWeight={500} my="10px" color="#11142D">
                                    Stack {stackIndex + 1}
                                </Typography>
                                <IconButton 
                                    aria-label="close" 
                                    onClick={() => {
                                        setStackIndex(stackIndex);
                                        setInfoCreateType("card");
                                        setIsInfoModalOpen(true);
                                    }}
                                >
                                    <AddCircleOutlineOutlined />
                                </IconButton>
                            </Stack>
                            <FormControl sx={{ width: "100%" }}>
                                <FormHelperText sx={{ fontWeight: 400, margin: "10px 0", fontSize: 14, color: "#11142D" }}>
                                    Checkpoint Text
                                </FormHelperText>
                                <TextField
                                    fullWidth
                                    required
                                    size="small"
                                    id="outlined-basic"
                                    color="info"
                                    variant="outlined"
                                    placeholder="Checkpoint text.."
                                    value={infoStack.checkpoint}
                                    onChange={(e) => {
                                        let temp = [...infoStacks]; 
                                        temp[stackIndex].checkpoint = e.target.value;
                                        setInfoStacks(temp);
                                    }}
                                />
                            </FormControl>
                            <Box mt="10px" sx={{ display: "flex", justifyContent: "flex-start" }}>
                                {infoStack.cards.length > 0 ? (
                                    <Box sx={{ 
                                        overflowX: "scroll", 
                                        overflowY: "hidden", 
                                        whiteSpace: "nowrap", 
                                        maxWidth: "1000px", 
                                        '&::-webkit-scrollbar': {
                                            width: '2px',
                                            backgroundColor: '#F9F9F9'
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: '#000000',
                                            borderRadius: '10px',
                                            '&:hover': {
                                                backgroundColor: '#1A1A1A'
                                            }
                                        },
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: '#000000 #F5F5F5'
                                    }}>
                                        {infoStack.cards.map((infoCard, index) => (
                                            <InfoCard
                                                key={index}
                                                index={index}
                                                stackIndex={stackIndex}
                                                title={infoCard.title}
                                                paragraphTitle={infoCard.paragraphTitle}
                                                paragraph={infoCard.paragraph}
                                                removeInfoCard={removeInfoCard}
                                            />
                                        ))}
                                    </Box>
                                ) : <Typography fontSize={14} fontWeight={500} color="#808191">No info cards in this stack</Typography>}
                            </Box>
                        </Box>
                    ))
                ) : <Typography fontSize={14} fontWeight={500} color="#808191">No info stacks</Typography>}
                
            </Stack>


            <CustomButton
                type="submit"
                title={formLoading ? "Submitting..." : "Submit"}
                backgroundColor="#475be8"
                color="#fcfcfc"
            />
            </form>
        </Box>
        </Box>
    );
}

export default CreateLearningContent;