/* eslint-disable no-restricted-globals */
import { Typography, Box, Stack, TextField } from '@pankod/refine-mui';
import { useDelete, useGetIdentity, useShow } from '@pankod/refine-core';
import { useParams, useNavigate } from '@pankod/refine-react-router-v6';
import { ChatBubble, Delete, Edit, Phone, Place, SourceOutlined, Star } from '@mui/icons-material';

import { CustomButton } from 'components';
import IntroCardDetails from 'components/common/IntroCardDetails';
import InfoCardDetails from 'components/common/InfoCardDetails';

interface IntroCard {
  index: number;
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

function checkImage(url: any) {
  let img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const ContentDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();
  const { mutate } = useDelete();
  const { id } = useParams();

  const { data, isLoading, isError } = queryResult;

  const contentDetails = data?.data ?? {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const isCurrentUser = user.email === contentDetails.creator.email;
  
  const handleDeleteContent = () => {
    const response = confirm('Are you sure you want to delete this content?');
    if (response) {
      mutate({
        resource: 'content',
        id: id as string,
      }, {
        onSuccess: () => {
          navigate('/content');
        },
      });
    }
  };

  console.log("Content Details:", contentDetails)

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#FCFCFC"
      width="fit-content"
    >
      <Typography fontSize={25} fontWeight={700} color="#11142D">Details</Typography>

      <Box mt="20px" display="flex" flexDirection="column" gap={4}>

        <Box flex={1} maxWidth={764}>

          <Box mt="15px">
            <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2} width="100%">
              <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={5} width="100%">
                <Typography fontSize={22} fontWeight={600} mt="10px" color="#11142D">{contentDetails.title}</Typography>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <SourceOutlined sx={{ color: '#808191' }} />
                  <Typography fontSize={14} color="#808191" textTransform="capitalize">{contentDetails.contentCategory}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box width="100%" flex={1} maxWidth={326} display="flex" flexDirection="column" gap="20px">
          <Stack mt="25px" mb="25px" direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">Intro Cards</Typography>
              <Typography fontSize={14} fontWeight={400} color="#11142D" sx={{ margin: "10px 0" }}>
                Checkpoint Text
              </Typography>
              <TextField
                  fullWidth
                  disabled
                  size="small"
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  placeholder="Checkpoint text.."
                  value={contentDetails.introCards.checkpoint}
                  InputProps={{
                    style: {
                      color: '#11142D',
                    },
                  }}
              />
              <Box mt="10px" sx={{ display: "flex", justifyContent: "flex-start" }}>
                {contentDetails.introCards.cards.length > 0 ? (
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
                            width: '2px',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: '#1A1A1A'
                            }
                        },
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#000000 #F5F5F5'
                    }}>
                        {contentDetails.introCards.cards.map((introCard: IntroCard, index: number) => (
                            <IntroCardDetails
                                key={index}
                                index={index}
                                title={introCard.title}
                                paragraph={introCard.paragraph}
                            />
                        ))}
                    </Box>
                ) : <Typography fontSize={14} fontWeight={500} color="#808191">No intro cards</Typography>}
                </Box>
          </Stack>

          <Stack mt="25px" mb="25px" direction="column" gap="10px">
          <Typography fontSize={18} color="#11142D">Info Cards</Typography>
          {contentDetails.infoStacks.length > 0 ? (
                    contentDetails.infoStacks.map((infoStack: InfoStack, stackIndex: number) => (
                        <Box>
                            <Stack direction="row" gap={2} alignItems="center">
                                <Typography fontSize={15} fontWeight={500} my="10px" color="#11142D">
                                    Stack {stackIndex + 1}
                                </Typography>
                            </Stack>
                            <Box sx={{ width: "100%" }}>
                                <Typography sx={{ fontWeight: 400, margin: "10px 0", fontSize: 14, color: "#11142D" }}>
                                    Checkpoint Text
                                </Typography>
                                <TextField
                                    fullWidth
                                    disabled
                                    size="small"
                                    id="outlined-basic"
                                    color="info"
                                    variant="outlined"
                                    placeholder="Checkpoint text.."
                                    value={infoStack.checkpoint}
                                />
                            </Box>
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
                                            <InfoCardDetails
                                                key={index}
                                                index={index}
                                                stackIndex={stackIndex}
                                                title={infoCard.title}
                                                paragraphTitle={infoCard.paragraphTitle}
                                                paragraph={infoCard.paragraph}
                                            />
                                        ))}
                                    </Box>
                                ) : <Typography fontSize={14} fontWeight={500} color="#808191">No info cards in this stack</Typography>}
                            </Box>
                        </Box>
                    ))
                ) : <Typography fontSize={14} fontWeight={500} color="#808191">No info stacks</Typography>}
          </Stack>
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
          >

            <Stack mt={2} justifyContent="center" alignItems="center" textAlign="center">
              <img
                src={checkImage(contentDetails.creator.avatar) ? contentDetails.creator.avatar : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"}
                alt="avatar"
                width={90}
                height={90}
                style={{ borderRadius: '100%', objectFit: 'cover' }}
              />

              <Box mt="15px">
                <Typography fontSize={18} fontWeight={600} color="#11142D">{contentDetails.creator.name}</Typography>
                <Typography mt="5px" fontSize={14} fontWeight={400} color="#808191">Team member</Typography>
              </Box>

              <Typography mt={1} fontSize={16} fontWeight={600} color="#11142D">{contentDetails.creator.allContent.length} published tasks</Typography>
            </Stack>

            <Stack width="100%" mt="25px" direction="row" flexWrap="wrap" gap={2}>
              <CustomButton
                title={!isCurrentUser ? 'Message' : 'Edit'}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(`/content/edit/${contentDetails._id}`);
                  }
                }}
              />
              <CustomButton
                title={!isCurrentUser ? 'Call' : 'Delete'}
                backgroundColor={!isCurrentUser ? '#2ED480' : '#d42e2e'}
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteContent();
                }}
              />
            </Stack>
          </Stack>

          {/* <Stack>
            <img
              src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
              width="100%"
              height={306}
              style={{ borderRadius: 10, objectFit: 'cover' }}
            />
          </Stack>

          <Box>
            <CustomButton
              title="Book Now"
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
            />
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ContentDetails;