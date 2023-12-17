import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FC } from "react";

interface CircularStatusProps {
  percentage: number;
  centerLabel?: string;
}

const CircularStatus: FC<CircularStatusProps> = ({
  percentage = 0,
  centerLabel,
}) => {
  const getBorderColor = (percentage: number) => {
    if (percentage >= 60) {
      return "rgba(31, 166, 54, 1)";
    } else if (percentage >= 15) {
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
        style={{ color: borderColor, height: "150px", width: "150px" }}
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
      >
        <Typography variant="caption" component="div" color="textSecondary">
          <p>{centerLabel}</p>
          <p>{`${Math.round(percentage)}%`}</p>
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularStatus;
