import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useNavigate } from "@pankod/refine-react-router-v6";

import Form from "components/common/Form";
import CreateLearningContent from "components/common/CreateLearningContent";

interface IntroCard {
  title: string;
  paragraph: string;
}

interface IntroCardsContainer {
  cards: IntroCard[];
  checkpoint: string;
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

const CreateContent = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const [contentImage, setContentImage]  = useState({ name: "", url: "" });
  const [introCards, setIntroCards] = useState<IntroCardsContainer>({ cards: [], checkpoint: "" });
  const [infoStacks, setInfoStacks] = useState<InfoStack[]>([]);
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setContentImage({ name: file?.name, url: result }));
  };
  
  const onFinishHandler = async (data: FieldValues) => {
    
    await onFinish({ ...data, introCards, infoStacks, email: user.email })
  };

  return (
    <CreateLearningContent
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      contentImage={contentImage}
      introCards={introCards}
      setIntroCards={setIntroCards}
      infoStacks={infoStacks}
      setInfoStacks={setInfoStacks}
    />
  )
}

export default CreateContent;