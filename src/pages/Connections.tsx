import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditCalendarOutlined";
import { visuallyHidden } from "@mui/utils";
import theme from "../theme/custom-theme";
import { ChangeEvent, useMemo, useState } from "react";
import { GridProps } from "@mui/system";
import AddConnectionDialog from "./components/add-connection-dialog/AddConnectionDialog";

const steps = [
  "Connections",
  "Select Adapter",
  "Create Connection",
  "Save Connection",
];

const adapterValues = [
  "MS-SQL Database",
  "Oracle Database",
  "Oracle ERP Cloud",
  "AWS S3 Cloud (Bucket)",
];

const roleValues = ["Trigger and invoke"];

const securityPolicyValues = ["Login"];

const defaultRows = [
  {
    id: 1,
    name: "Oracle",
    type: "DB Connector",
    creationDate: new Date().toLocaleString(),
  },
];

const defaultAddConnectionFormValues: {
  connectionName: string;
  connectionType: string;
} = {
  connectionName: "",
  connectionType: "",
};

type Order = "asc" | "desc";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

const StyledGridItem = styled(Grid)<GridProps>({
  padding: 12,
  display: "flex",
  marginTop: 20,
  backgroundColor: "#E6F1F7",
  borderRadius: 4,
});

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "CONNECTION NAME",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "CONNECTION TYPE",
  },
  {
    id: "create_date",
    numeric: false,
    disablePadding: true,
    label: "CREATION DATE",
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead
      sx={{
        backgroundColor: "#8ABFDC",
      }}
    >
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all connections",
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontWeight: 600 }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right" sx={{ fontWeight: 600 }}>
          ACTIONS
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const Connections = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("name");
  const [rows, setRows] = useState(defaultRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [addConnectionFormState, setAddConnectionFormState] = useState<{
    connectionName: string;
    connectionType: string;
  }>(defaultAddConnectionFormValues);
  const [addConnectionDialogOpen, setAddConnectionDialogOpen] =
    useState<boolean>(false);
  const [triggerError, setTriggerError] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    adapter: "",
    databaseName: "",
    databaseIdentifier: "",
    databaseKeywords: "",
    connectionRole: "",
    description: "",
    host: "",
    port: "",
    database: "",
    serviceName: "",
    securityPolicy: "",
  });

  const handleNext = () => {
    if (activeStep === 1) {
      if (!formState.adapter) {
        setTriggerError(true);
      } else {
        setTriggerError(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 2) {
      if (
        !formState.databaseName ||
        !formState.databaseIdentifier ||
        !formState.databaseKeywords ||
        !formState.connectionRole
      ) {
        setTriggerError(true);
      } else {
        setTriggerError(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 3) {
      if (!formState.securityPolicy || !formState.database) {
        setTriggerError(true);
      } else {
        setTriggerError(false);
      }
    } else {
      setTriggerError(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected: readonly number[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddConnectionFormState({
      ...addConnectionFormState,
      [e.target.id]: e.target.value,
    });
  };

  const handleDialogSave = () => {
    if (
      !addConnectionFormState.connectionName ||
      !addConnectionFormState.connectionType
    ) {
      setTriggerError(true);
    } else {
      setTriggerError(false);
      const entry = {
        id: rows[rows.length - 1].id + 1,
        name: addConnectionFormState.connectionName,
        type: addConnectionFormState.connectionType,
        creationDate: new Date().toLocaleString(),
      };
      const r = [...rows];
      r.push(entry);
      setRows(r);
      setAddConnectionFormState(defaultAddConnectionFormValues);
      setAddConnectionDialogOpen(false);
    }
  };

  const handleDialogClose = () => {
    if (triggerError) setTriggerError(false);
    setAddConnectionFormState(defaultAddConnectionFormValues);
    setAddConnectionDialogOpen(false);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  return (
    <>
      <Grid container alignItems={"center"}>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            color={theme.palette.primary.main}
            sx={{ fontSize: "18px", fontWeight: 700 }}
          >
            Connections
          </Typography>
        </Grid>
        <StyledGridItem item xs={12} justifyContent={"center"}>
          <Stepper activeStep={activeStep} sx={{ width: "80%" }}>
            {steps.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </StyledGridItem>
        <Grid item xs={12} sx={{ marginTop: "15px" }}>
          {activeStep === 0 && (
            <Grid container alignItems={"center"}>
              <Grid item xs={12} sx={{ marginBottom: "15px" }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Select Connection
                </Typography>
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                <Card sx={{ width: "85%" }}>
                  <CardContent sx={{ paddingBottom: "0px !important" }}>
                    <Grid container alignItems={"center"}>
                      <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", marginBottom: "15px" }}
                        justifyContent={"flex-end"}
                      >
                        <Button
                          variant="contained"
                          onClick={() => setAddConnectionDialogOpen(true)}
                        >
                          Create
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <TableContainer>
                          <Table aria-labelledby="tableTitle" size="small">
                            <EnhancedTableHead
                              numSelected={selected.length}
                              order={order}
                              orderBy={orderBy}
                              onSelectAllClick={handleSelectAllClick}
                              onRequestSort={handleRequestSort}
                              rowCount={rows.length}
                            />
                            <TableBody>
                              {visibleRows.length > 0 &&
                                visibleRows.map((row, index) => {
                                  // const isItemSelected = isSelected(row.id);
                                  const labelId = `enhanced-table-checkbox-${index}`;

                                  return (
                                    <TableRow
                                      hover
                                      // onClick={(event) =>
                                      //   handleClick(event, row.id)
                                      // }
                                      // role="checkbox"
                                      // aria-checked={isItemSelected}
                                      tabIndex={-1}
                                      key={row.id}
                                      // selected={isItemSelected}
                                      sx={{ cursor: "pointer" }}
                                    >
                                      {/* <TableCell padding="checkbox">
                                        <Checkbox
                                          color="primary"
                                          checked={isItemSelected}
                                          inputProps={{
                                            "aria-labelledby": labelId,
                                          }}
                                        />
                                      </TableCell> */}
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                      >
                                        {row.name}
                                      </TableCell>
                                      <TableCell>{row.type}</TableCell>
                                      <TableCell>{row.creationDate}</TableCell>
                                      <TableCell align="right">
                                        <Grid container alignItems={"center"}>
                                          <Grid
                                            item
                                            xs={6}
                                            display={"flex"}
                                            justifyContent={"flex-end"}
                                          >
                                            <IconButton
                                              aria-label="edit"
                                              size="small"
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <EditIcon fontSize="small" />
                                            </IconButton>
                                          </Grid>
                                          <Grid
                                            item
                                            xs={6}
                                            display={"flex"}
                                            justifyContent={"flex-end"}
                                          >
                                            <IconButton
                                              aria-label="delete"
                                              size="small"
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <DeleteIcon fontSize="small" />
                                            </IconButton>
                                          </Grid>
                                        </Grid>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          {activeStep === 1 && (
            <Grid container alignItems={"center"}>
              <Grid item xs={12} sx={{ marginBottom: "15px" }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Select Adapter
                </Typography>
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                <Card sx={{ width: "85%" }}>
                  <CardContent>
                    <Grid
                      container
                      alignItems={"center"}
                      sx={{ marginTop: "15px" }}
                    >
                      <Grid item xs={6}>
                        <FormControl
                          fullWidth
                          required
                          error={triggerError && !formState.adapter}
                          sx={{
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                        >
                          <InputLabel id="adapter-label">
                            Select Adapter
                          </InputLabel>
                          <Select
                            labelId="adapter-label"
                            id="adapter"
                            name="adapter"
                            label="Select Adapter"
                            onChange={handleSelectChange}
                            value={formState.adapter}
                          >
                            {adapterValues.map((value, index) => {
                              return (
                                <MenuItem key={index} value={value}>
                                  {value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {triggerError && !formState.adapter && (
                            <FormHelperText>
                              This field is required
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          {activeStep === 2 && (
            <Grid container alignItems={"center"}>
              <Grid item xs={12} sx={{ marginBottom: "15px" }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Create Connection
                </Typography>
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                <Card sx={{ width: "85%" }}>
                  <CardContent>
                    <Grid
                      container
                      sx={{ marginTop: "15px" }}
                      columnSpacing={1.25}
                    >
                      <Grid item xs={12}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Database
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, fontSize: "14px" }}
                        >
                          What is it called?
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 400, fontSize: "14px" }}
                        >
                          *{" "}
                          <i>
                            The Name can be changed later, The identifier can be
                            set only now and it must be unique.{" "}
                          </i>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ marginTop: "10px" }}>
                        <TextField
                          id="databaseName"
                          name="databaseName"
                          label="Database Name"
                          type="text"
                          fullWidth
                          variant="outlined"
                          value={formState.databaseName}
                          onChange={handleChange}
                          required
                          error={triggerError && !formState.databaseName}
                          helperText={
                            triggerError && !formState.databaseName
                              ? "This field is required"
                              : undefined
                          }
                          sx={{
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} sx={{ marginTop: "10px" }}>
                        <TextField
                          id="databaseIdentifier"
                          name="databaseIdentifier"
                          label="Identifier"
                          type="text"
                          fullWidth
                          variant="outlined"
                          value={formState.databaseIdentifier}
                          onChange={handleChange}
                          required
                          error={triggerError && !formState.databaseIdentifier}
                          helperText={
                            triggerError && !formState.databaseIdentifier
                              ? "This field is required"
                              : undefined
                          }
                          sx={{
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ marginTop: "15px" }}>
                        <TextField
                          id="databaseKeywords"
                          name="databaseKeywords"
                          label="Keywords"
                          type="text"
                          fullWidth
                          variant="outlined"
                          value={formState.databaseKeywords}
                          onChange={handleChange}
                          required
                          error={triggerError && !formState.databaseKeywords}
                          helperText={
                            triggerError && !formState.databaseKeywords
                              ? "This field is required"
                              : undefined
                          }
                          sx={{
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      alignItems={"center"}
                      sx={{ marginTop: "30px" }}
                      columnSpacing={1}
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, fontSize: "14px" }}
                        >
                          Select what role the connections will play in
                          integrations
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ marginTop: "15px" }}>
                        <FormControl
                          fullWidth
                          required
                          error={triggerError && !formState.connectionRole}
                          sx={{
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                        >
                          <InputLabel id="role-label">Role</InputLabel>
                          <Select
                            labelId="role-label"
                            id="connectionRole"
                            name="connectionRole"
                            label="Role"
                            onChange={(e: SelectChangeEvent) =>
                              setFormState({
                                ...formState,
                                [e.target.name]: e.target.value,
                              })
                            }
                            value={formState.connectionRole}
                          >
                            {roleValues.map((value, index) => {
                              return (
                                <MenuItem key={index} value={value}>
                                  {value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {triggerError && !formState.connectionRole && (
                            <FormHelperText>
                              This field is required
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sx={{ marginTop: "15px" }}>
                        <TextField
                          id="description"
                          name="description"
                          label="Description"
                          type="text"
                          fullWidth
                          variant="outlined"
                          value={formState.description}
                          onChange={handleChange}
                          multiline
                          rows={4}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          {activeStep === 3 && (
            <Grid container alignItems={"center"}>
              <Grid item xs={12} sx={{ marginBottom: "15px" }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Save Connection
                </Typography>
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                <Card sx={{ width: "85%" }}>
                  <CardContent>
                    <Grid
                      container
                      sx={{ marginTop: "15px" }}
                      columnSpacing={1.25}
                    >
                      <Grid item xs={12}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {formState.adapter}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 400, fontSize: "14px" }}
                        >
                          <i>
                            Configure Connection details including connection
                            Properties and login credentials, Then test your
                            connection to ensure it works.
                          </i>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sx={{ marginTop: "30px" }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, fontSize: "14px" }}
                        >
                          Role:
                          <span
                            style={{ fontSize: "14px", fontWeight: "normal" }}
                          >
                            &nbsp;{formState.connectionRole}
                          </span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sx={{ marginTop: "30px" }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, fontSize: "14px" }}
                        >
                          Connection Properties
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 400, fontSize: "14px" }}
                        >
                          <i>
                            Connection to specify information to connect to your
                            application/endpoint and process requests.
                          </i>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ marginTop: "10px" }}>
                        <TextField
                          id="host"
                          name="host"
                          label="Host (Optional)"
                          type="text"
                          fullWidth
                          variant="outlined"
                          value={formState.host}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={6} sx={{ marginTop: "10px" }}>
                        <TextField
                          id="port"
                          name="port"
                          label="Port (Optional)"
                          type="text"
                          fullWidth
                          variant="outlined"
                          value={formState.port}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={6} sx={{ marginTop: "15px" }}>
                        <TextField
                          id="database"
                          name="database"
                          label="Database"
                          type="text"
                          fullWidth
                          variant="outlined"
                          value={formState.database}
                          onChange={handleChange}
                          required
                          error={triggerError && !formState.database}
                          helperText={
                            triggerError && !formState.database
                              ? "This field is required"
                              : undefined
                          }
                          sx={{
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} sx={{ marginTop: "15px" }}>
                        <TextField
                          id="serviceName"
                          name="serviceName"
                          label="Service Name (Optional)"
                          type="text"
                          fullWidth
                          variant="outlined"
                          value={formState.serviceName}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      alignItems={"center"}
                      sx={{ marginTop: "30px" }}
                      columnSpacing={1}
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, fontSize: "14px" }}
                        >
                          Security
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 400, fontSize: "14px" }}
                        >
                          <i>
                            Security to specify the login credentials to access
                            your application/endpoint.
                          </i>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ marginTop: "10px" }}>
                        <FormControl
                          fullWidth
                          required
                          error={triggerError && !formState.securityPolicy}
                          sx={{
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                        >
                          <InputLabel id="security-policy-label">
                            Security Policy
                          </InputLabel>
                          <Select
                            labelId="security-policy-label"
                            id="securityPolicy"
                            name="securityPolicy"
                            label="Security Policy"
                            onChange={(e: SelectChangeEvent) =>
                              setFormState({
                                ...formState,
                                [e.target.name]: e.target.value,
                              })
                            }
                            value={formState.securityPolicy}
                          >
                            {securityPolicyValues.map((value, index) => {
                              return (
                                <MenuItem key={index} value={value}>
                                  {value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {triggerError && !formState.securityPolicy && (
                            <FormHelperText>
                              This field is required
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "15px", marginBottom: "25px" }}>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"flex-end"}
            sx={{ width: "92.5%" }}
          >
            {activeStep > 0 && (
              <Grid item xs={1} display={"flex"} justifyContent={"flex-end"}>
                <Button variant="outlined" onClick={handleBack}>
                  Back
                </Button>
              </Grid>
            )}
            <Grid item xs={1} display={"flex"} justifyContent={"flex-end"}>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Save" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AddConnectionDialog
        open={addConnectionDialogOpen}
        title={"Create Connection"}
        addConnectionFormState={addConnectionFormState}
        onHandleInputChange={handleInputChange}
        triggerError={triggerError}
        onHandleDialogSave={handleDialogSave}
        onHandleDialogClose={handleDialogClose}
      />
    </>
  );
};

export default Connections;
