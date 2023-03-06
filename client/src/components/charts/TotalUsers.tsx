import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { ArrowCircleUpRounded } from '@mui/icons-material';

import { TotalUsersOptions, TotalUsersSeries } from './chart.config';

const TotalUsers = () => {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Total Users
      </Typography>

      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize={28} fontWeight={700} color="#11142d">
          300 Users
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: 25, color: "#475be8" }} />
          <Stack>
            <Typography fontSize={15} color="#475be8">
              8.2%
            </Typography>
            <Typography fontSize={12} color="#808191">
              Than Last Month
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ReactApexChart
        options={TotalUsersOptions}
        series={TotalUsersSeries}
        type="bar"
        height={310}
      />
    </Box>
  )
}

export default TotalUsers;