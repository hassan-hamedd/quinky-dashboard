import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useNavigate } from "@pankod/refine-react-router-v6";

import Form from "components/common/Form";

const CreateGames = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const [contentImage, setContentImage]  = useState({ name: "", url: "" });
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();

  const [gameCards, setGameCards] = useState<any[]>([]);

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setContentImage({ name: file?.name, url: result }));
  };
  
  const onFinishHandler = async (data: FieldValues) => {
    if(!contentImage.name) return alert('Please select an image');
    if(user.email === "" || user.email === undefined) return alert('Please refresh your session to create a game');
    
    const tags = data.unfilteredTags.split(',').map((tag: string) => tag.trim());
    await onFinish({ ...data, cards: gameCards, tags, photo: contentImage.url, email: user.email })
  };

  return (
    <Form 
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      contentImage={contentImage}
      gameCards={gameCards}
      setGameCards={setGameCards}
    />
  )
}

export default CreateGames;