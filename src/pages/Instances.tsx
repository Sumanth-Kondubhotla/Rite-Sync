import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";

interface InstancesState {
  sourceInstance: string;
  targetInstance: string;
}

// const choices = [
//   { label: "Option-1", value: "1" },
//   { label: "Option-2", value: "2" },
//   { label: "Option-3", value: "3" },
// ];

const StyledHeader = styled("h2")(() => ({
  color: "#272727",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "20px",
}));

const StyledFormControl = styled(FormControl)(() => ({
  borderRadius: "8px",
  borderColor: "#9D9D9D",
  width: "100%",
}));

const Instances: FC = () => {
  const theme = useTheme();
  const [instances, setInstances] = useState<InstancesState>({
    sourceInstance: "",
    targetInstance: "",
  });
  const [choices, setChoices] = useState<any[]>([]);

  const onFormControlChange = (event: SelectChangeEvent) => {
    const { name } = event.target;
    const { value } = event.target;
    setInstances((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(instances);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setChoices(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography
          variant="body2"
          color={theme.palette.primary.main}
          sx={{ fontSize: "18px", fontWeight: 700 }}
        >
          Instances
        </Typography>
      </Grid>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <StyledHeader>Select Instances</StyledHeader>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <StyledFormControl>
                <InputLabel id="source-instance-select-label">
                  Source Instance
                </InputLabel>
                <Select
                  name="sourceInstance"
                  labelId="source-instance-label-id"
                  id="source-instance-id"
                  value={instances.sourceInstance}
                  label="Source Instance"
                  onChange={onFormControlChange}
                >
                  {choices?.map((choice) => (
                    <MenuItem key={choice?.id} value={choice?.title}>
                      {choice?.title}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={4}>
              <StyledFormControl>
                <InputLabel id="target-instance-select-label">
                  Target Instance
                </InputLabel>
                <Select
                  name="targetInstance"
                  labelId="target-instance-label-id"
                  id="target-instance-id"
                  value={instances.targetInstance}
                  label="Target Instance"
                  onChange={onFormControlChange}
                >
                  {choices?.map((choice) => (
                    <MenuItem key={choice?.id} value={choice?.title}>
                      {choice?.title}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} textAlign="end">
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleSubmit}
              >
                Select
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Instances;
