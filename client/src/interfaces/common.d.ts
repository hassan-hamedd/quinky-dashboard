export interface CustomButtonProps {
    type?: string,
    title: string,
    backgroundColor: string,
    color: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    disabled?: boolean,
    handleClick?: () => void
}

export interface ProfileProps {
    type: string,
    name: string,
    avatar: string,
    email: string,
    properties: Array | undefined
}

export interface PropertyProps {
    _id: string,
    title: string,
    description: string,
    location: string,
    price: string,
    photo: string,
    creator: string
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

export interface FormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleImageChange: (file) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    contentImage: { name: string, url: string },
    gameCards: any[],
    setGameCards: React.Dispatch<SetStateAction<any[]>>,
}

interface IntroCardsContainer {
    cards: IntroCard[];
    checkpoint: string;
}

export interface LearningContentFormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleImageChange: (file) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    contentImage: { name: string, url: string },
    introCards: { cards: IntroCard[], checkpoint: string },
    setIntroCards: Dispatch<SetStateAction<IntroCardsContainer>>,
    infoStacks: InfoStack[],
    setInfoStacks: React.Dispatch<SetStateAction<InfoStack[]>>,
}
