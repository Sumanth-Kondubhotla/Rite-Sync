import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CircularStatusTracker = ({ percentage = 0 }) => {
  const getBorderColor = (percentage: number) => {
    if (percentage >= 60) {
      return "rgba(31, 166, 54, 1)";
    } else if (percentage >= 25) {
      return "rgba(248, 198, 45, 1)";
    } else {
      return "rgba(235, 0, 0, 1)";
    }
  };

  const borderColor = getBorderColor(percentage);

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={percentage}
        style={{ color: borderColor, height: "250px", width: "250px" }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"

        // sx={{
        //   height: "150px",
        //   width: "150px",
        // }}
      >
        <Typography variant="caption" component="div" color="textSecondary">
          <p>Process</p>
          {`${Math.round(percentage)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularStatusTracker;
