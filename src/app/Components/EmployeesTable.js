import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Model from "../Components/Model";

import Popover from "@mui/material/Popover";

import InfoIcon from "@mui/icons-material/Info";
import { Stack } from "@mui/material";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   // border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const columns = [
  {
    id: "empId",
    label: "ID",
    minWidth: 10,
    numeric: true,
  },

  {
    id: "empPic",
    label: "Profile",
    minWidth: 10,
    numeric: false,
  },

  {
    id: "name",
    label: "Name",
    minWidth: 50,
  },

  {
    id: "empEmail",
    label: "Email",
    minWidth: 50,
  },

  {
    id: "empMob",
    label: "Mobile",
    minWidth: 30,
    numeric: true,
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "empTask",
    label: "Task",
    minWidth: 50,
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "empStatus",
    label: "Status",
    minWidth: 20,
  },
  {
    id: "empAction",
    label: "Action",
    minWidth: 10,
    align: "center",
  },
];

function createData(
  empId,
  empPic,
  name,
  empEmail,
  empMob,
  empTask,
  empStatus,
  empAction
) {
  return {
    empId,
    empPic,
    name,
    empEmail,
    empMob,
    empTask,
    empStatus,
    empAction,
  };
}

const rows = [
  createData(
    21,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "Sachin Pawar",
    "exmple@gmail.com",
    1234567890,
    "UI Designing",
    "Active"
  ),
  createData(
    22,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "Sandeep Manjhi",
    "example@gmail.com",
    1234567890,
    9596961,
    "Active"
  ),
  createData(
    23,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "Shrsti Garehwal ",
    "example@gmail.com",
    1234567890,
    301340,
    "Active"
  ),
  createData(
    24,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "Khushbu Kanojiya",
    "example@gmail.com",
    1234567890,
    9833520,
    "Active"
  ),
  createData(
    25,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "nawaz",
    "example@gmail.com",
    1234567890,
    9984670,
    "Active"
  ),
  createData(
    26,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "Australia",
    "example@gmail.com",
    1234567890,
    7692024,
    "Active"
  ),
  createData(
    27,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "Germany",
    "example@gmail.com",
    1234567890,
    357578,
    "Active"
  ),
  createData(
    28,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "Ireland",
    "example@gmail.com",
    1234567890,
    70273,
    "Active"
  ),
  createData(
    29,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "Mexico",
    "example@gmail.com",
    1234567890,
    1972550,
    "Active"
  ),
  createData(
    30,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "Japan",
    "example@gmail.com",
    1234567890,
    377973,
    "Active"
  ),
  createData(
    31,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "France",
    "example@gmail.com",
    1234567890,
    640679,
    "Active"
  ),
  createData(
    32,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "United Kingdom",
    "example@gmail.com",
    1234567890,
    242495,
    "Active"
  ),
  createData(
    33,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "Russia",
    "example@gmail.com",
    1234567890,
    17098246,
    "Active"
  ),
  ,
  createData(
    34,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "Nigeria",
    "example@gmail.com",
    1234567890,
    923768,
    "Active"
  ),
  createData(
    35,
    <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: 24, height: 24 }} />,
    "Brazil",
    "example@gmail.com",
    1234567890,
    8515767,
    "Active"
  ),
];

export default function StickyHeadTable() {
  //   const [openSnack, setOpenSnack] = React.useState(false);

  //   const handleClickSnack = () => {
  //     setOpenSnack(true);
  //   };

  //   const handleCloseSnack = (event, reason) => {
  //     if (reason === "clickaway") {
  //       return;
  //     }

  //     setOpenSnack(false);
  //   };

  //   const action = (
  //     <React.Fragment>
  //       <Button color="secondary" size="small" onClick={handleCloseSnack}>
  //         UNDO
  //       </Button>
  //       <IconButton
  //         size="small"
  //         aria-label="close"
  //         color="inherit"
  //         onClick={handleCloseSnack}
  //       >
  //         <CloseIcon fontSize="small" />
  //       </IconButton>
  //     </React.Fragment>
  //   );

  // const [openModel, setOpenModel] = React.useState(false);
  // const handleOpenModel = () => setOpenModel(true);
  // const handleCloseModel = () => setOpenModel(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={6}>
        <Stack direction="row" sx={{ m: 3 }}>
          <Typography sx={{ flex: "1 1 100%" }} variant="h5">
            Employees
          </Typography>

          <Button href="Employees/AddEmployees" variant="contained" align="center" sx={{
            ":hover":{
              color:'white'
            }
          }} endIcon={<AddCircleIcon />}>
            ADD
          </Button>
        </Stack>

        <TableContainer sx={{ maxHeight: 440, maxWidth: "89vw", mx: 2 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      align={row.align}
                      key={row.empEmail}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        let getLink;
                        if (column.id == "empId") {
                          getLink = value;
                        }

                        if (column.id == "empAction") {
                          const [anchorEl, setAnchorEl] = React.useState(null);
                          const open = Boolean(anchorEl);
                          const handleClick = (event) => {
                            setAnchorEl(event.currentTarget);
                          };
                          const handleClose = () => {
                            setAnchorEl(null);
                          };

                          return (
                            <TableCell key={column.id}>
                              <div align="center">
                                <Button
                                  aria-describedby={id}
                                  // variant="ouylined"
                                  onClick={handleClick}
                                >
                                  <MoreVertIcon sx={{ color: "#000" }} />
                                </Button>
                                <Popover
                                  id={id}
                                  open={open}
                                  anchorEl={anchorEl}
                                  onClose={handleClose}
                                  anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                  }}
                                  transformOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                  }}
                                >
                                  <Paper variant="outlined">
                                    <Button color="primary">
                                      <EditIcon />
                                    </Button>
                                    {/* <div>
                                      <Button onClick={handleOpenModel}>
                                        <DeleteIcon sx={{ color: "red" }} />
                                      </Button>
                                      <Modal
                                        open={openModel}
                                        onClose={handleCloseModel}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                      >
                                        <Box sx={style}>
                                          <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            align="center"
                                          >
                                            Delete {row.name}
                                          </Typography>
                                          <Typography
                                            id="modal-modal-description"
                                            sx={{ mt: 3 }}
                                            align="center"
                                          >
                                            <Button onClick={handleCloseModel}>
                                              Cancel
                                            </Button>
                                            

                                            
                                              <Button color="error"
                                                onClick={handleClickSnack}
                                              >
                                               Confiram
                                              </Button>
                                              <Snackbar
                                                open={openSnack}
                                                autoHideDuration={300}
                                                onClose={handleCloseSnack}
                                                message="Employee Deleted"
                                                action={action}
                                              />
                                            
                                          </Typography>
                                        </Box>
                                      </Modal>
                                    </div> */}
                                    <Model />

                                    <Button href={`Employees/${row.empId}`}>
                                      <InfoIcon sx={{ color: "green" }} />
                                    </Button>
                                  </Paper>
                                </Popover>
                              </div>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
