import React from 'react'

import Modal from "@mui/material/Modal";

import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddCircleIcon from '@mui/icons-material/AddCircle'

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


  const buttons = [
    <Button key="one" sx={{
      ":hover":{
        bgcolor:'red'
      }
    }}>Task</Button>,
    <Button key="two">Meeting</Button>,
    <Button key="three">Reminder</Button>,
  ];

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
    <IconButton onClick={handleOpenModel} size="large">
      <AddCircleIcon color='primary'   fontSize="inherit" />
    </IconButton>
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
          <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="small" aria-label="small button group" 
     
      >
        {buttons}
      </ButtonGroup>
    </Box> 
          {/* {row.name} */}
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 3 }}
          align="center"
        >
          <Button color="error" onClick={handleCloseModel}>
            Cancel
          </Button>
          

          
            <Button 
              onClick={handleClickSnack}
            >
             Confiram
            </Button>
            <Snackbar
              open={openSnack}
              autoHideDuration={300}
              onClose={handleCloseSnack}
              message="Event Added"
              action={action}
            />
          
        </Typography>
      </Box>
    </Modal>
  </div>
  )
}
