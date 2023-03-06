import { useList } from "@pankod/refine-core";
import { Typography, Box, Stack } from "@pankod/refine-mui";

import {
  PieChart,
  ContentReferrals,
  TotalUsers,
  ContentCard,
  TopUser
} from "components";

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Content tasks"
          value={201}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="App Downloads"
          value={304}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Users"
          value={300}
          series={[60, 40]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Newsletter Subscribers"
          value={78}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
      </Box>

      <Stack mt="25px" width="100%" direction={{ xs: "column", md: "row" }} gap={4}>
        <TotalUsers />
        <ContentReferrals />
      </Stack>
    </Box>
  )
}

export default Home;