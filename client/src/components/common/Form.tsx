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

import { FormProps } from "interfaces/common";
import { ContentCard2 } from "components";
import CustomButton from "./CustomButton";

interface Card {
  _id: number;
  title: string;
  paragraphTitle: string;
  paragraph: string;
}

const Form = ({ type, register, handleSubmit, handleImageChange, formLoading, onFinishHandler, contentImage }: FormProps) => {
  const [prevCards, setPrevCards] = useState<Card[]>([]);
  const [newCards, setNewCards] = useState<Card[]>([]);

  useEffect(() => {
    const cards: Card[] = [{ _id: 1, title: "Card 1", paragraphTitle: "Paragraph Title", paragraph: "Card paragraph" }];
    setPrevCards(cards);
  }, []);

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
          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
              Enter Content Description
            </FormHelperText>
            <TextareaAutosize 
              minRows={5}
              required
              placeholder="Write description here..."
              color="info"
              style={{ width: "100%", background: "transparent", fontSize: "16px", borderColor: "rgba(0, 0, 0, 0.23)",
              borderRadius: 6, padding: 10, color: "#919191" }}
              {...register("description", { required: true })}
            />
          </FormControl>

          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                Select Content Type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue="quinky"
                {...register("contentType", { required: true })}
              >
                <MenuItem value="quinky">Quinky</MenuItem>
                <MenuItem value="cute">Cute</MenuItem>
                <MenuItem value="kinky">Kinky</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142D" }}>
                Select Content Layout
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue="bullet"
                {...register("contentType", { required: true })}
              >
                <MenuItem value="bullet">Bullet Points</MenuItem>
                <MenuItem value="imgDescription">Image/ Description</MenuItem>
                <MenuItem value="text">Text</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography fontSize={16} fontWeight={500} my="10px" color="#11142D">
                Content Image
              </Typography>

              <Button component="label" sx={{ width: "fit-content", color: "#2ed480", textTransform: "capitalize",
              fontSize: 16 }}>
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    // @ts-ignore
                    handleImageChange(e.target.files[0])
                  }}
                />
              </Button>
            </Stack>
            <Typography fontSize={14} color="#808191" sx={{ wordBreak: "break-all" }}>
              {contentImage?.name}
            </Typography>
          </Stack>

          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography fontSize={16} fontWeight={500} my="10px" color="#11142D">
                  Cards
              </Typography>
              <CustomButton
                  title="Create Card"
                  backgroundColor="#475BE8"
                  color="#FCFCFC"
                  fullWidth={false}
                  icon={<AddCircleOutlineOutlined />}
                  handleClick={() => {
                    return;
                  }}
              />
            </Stack>

            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {prevCards.map((content) => (
                <ContentCard2
                  key={content._id}
                  id={content._id}
                  title={content.title}
                  paragraphTitle={content.paragraphTitle}
                  paragraph={content.paragraph}
                />
              ))}
            </Box>
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
  )
}

export default Form;