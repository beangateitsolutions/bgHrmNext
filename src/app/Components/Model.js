import React from 'react'
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

export default function Model() {

    
        const [openSnack, setOpenSnack] = React.useState(false);
      
        const handleClickSnack = () => {
          setOpenSnack(true);
        };
      
        const handleCloseSnack = (event, reason) => {
          if (reason === "clickaway") {
            return;
          }
      
          setOpenSnack(false);
        };
      
        const action = (
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleCloseSnack}>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnack}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        );
      

    const [openModel, setOpenModel] = React.useState(false);
    const handleOpenModel = () => setOpenModel(true);
    const handleCloseModel = () => setOpenModel(false);
  return (
    <div>
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
          Delete 
          {/* {row.name} */}
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
  </div>
  )
}
