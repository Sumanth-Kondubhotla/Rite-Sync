import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddConnectionDialog = (props: any) => {
  const {
    open,
    title,
    addConnectionFormState,
    onHandleInputChange,
    triggerError,
    onHandleDialogSave,
    onHandleDialogClose,
  } = props;

  return (
    <Dialog
      open={open}
      maxWidth={false}
      sx={{
        "& .MuiDialog-paper": {
          width: "350px !important",
        },
      }}
    >
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onHandleDialogClose}>
            <CloseIcon sx={{ color: "red" }} />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          alignItems={"center"}
          sx={{ marginTop: "1px" }}
          rowSpacing={1.5}
        >
          <Grid item xs={12}>
            <TextField
              autoFocus
              id="connectionName"
              name="connectionName"
              label="Connection Name"
              type="text"
              fullWidth
              variant="outlined"
              error={triggerError && !addConnectionFormState.connectionName}
              helperText={
                triggerError && !addConnectionFormState.connectionName
                  ? "This field is required"
                  : undefined
              }
              value={addConnectionFormState.connectionName}
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              onChange={onHandleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="connectionType"
              name="connectionType"
              label="Connection Type"
              type="text"
              fullWidth
              variant="outlined"
              error={triggerError && !addConnectionFormState.connectionType}
              helperText={
                triggerError && !addConnectionFormState.connectionType
                  ? "This field is required"
                  : undefined
              }
              value={addConnectionFormState.connectionType}
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              onChange={onHandleInputChange}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          paddingLeft: "15px",
          paddingRight: "15px",
          paddingBottom: "15px",
        }}
      >
        <Button variant="contained" onClick={onHandleDialogSave}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddConnectionDialog;
