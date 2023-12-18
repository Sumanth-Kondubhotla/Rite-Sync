import { FC } from "react";
import CircularStatus from "../shared/components/CircularStatus/CircularStatus";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const centerLabel = "Process";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledDiv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "between",
  alignItems: "center",
}));

const data1 = [{ label: "Job Scheduler", value: 100 }];
const data2 = [{ label: "Application", value: 100 }];

const Statistics: FC = () => {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            color={theme.palette.primary.main}
            sx={{ fontSize: "18px", fontWeight: 700 }}
          >
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <PieChart
              series={[
                {
                  innerRadius: 0,
                  outerRadius: 30,
                  data: data1,
                },
                {
                  innerRadius: 40,
                  outerRadius: 70,
                  data: data2,
                },
              ]}
              slotProps={{
                legend: { hidden: true },
              }}
              width={350}
              height={500}
            />
          </Item>
        </Grid>
        <Grid item xs={8} style={{ height: "fit-content" }}>
          <Item style={{ marginBottom: "20px" }}>
            <CircularStatus percentage={77} centerLabel={centerLabel} />
            <CircularStatus percentage={20} centerLabel={centerLabel} />
            <CircularStatus percentage={3} centerLabel={centerLabel} />
          </Item>
          <Item>
            <StyledDiv>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Rite Software"],
                  },
                ]}
                series={[{ data: [1] }]}
                width={250}
                height={300}
              />
              <div>
                <StyledDiv>
                  <img
                    src="images/status-marker-green.png"
                    alt="Status marker green"
                  />
                  Processed
                </StyledDiv>
                <StyledDiv>
                  <img
                    src="images/status-marker-yellow.png"
                    alt="Status marker yellow"
                  />
                  Un Processed
                </StyledDiv>
                <StyledDiv>
                  <img
                    src="images/status-marker-red.png"
                    alt="Status marker red"
                  />
                  Error
                </StyledDiv>
              </div>
            </StyledDiv>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
