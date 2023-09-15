// export default function Page({params}) {
//   return <h1>This employee is {params.employeeId}</h1>
// }


"use client"
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import { TabContext, TabList, TabPanel, Tab, Paper } from '@mui/material'
import SearchBar from "../../Components/SearchBar";
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';









export default function Page({ params }) {
  const employees = {
    registration: 'smh2546',
    dob: "20/06/1999",
    position: 'Team Leader',
    department: 'It Sector',


    name: "sandeep",
    email: "abcd@gmail.com",
    number: "1234567890",
    gender: "male",
    createdAt: "today",
    updatedAt: "today",
    lastLogout: "tomorrow",
    emailOtp: "1234",
    emailOtpExpiry: "10min",
    disabled: Boolean,
    disableReason: "string",
    disabledAt: Date,
    houseNo: "56",
    street: "02",
    district: "bhopal",
    city: "Bhopal",
    country: "india",
    pincode: "462003",
    state: 'Madhya Pradesh'
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  return (

    <div>
      <SearchBar />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <Box >
          <Box sx={{ padding: '10px' }}><h2 variant="h1" > Employee Details </h2></Box>
          <Box sx={{ display: 'flex', gap: 5, justifyContent: "space-between" }}>

            <Box>
              <Paper elevation={3} sx={{ paddingTop: "30px", marginTop: "1%" }}>
                <Box>

                  <Box sx={{ justifyContent: "center", alignItems: "center", textAlign: 'center', }}>

                    <Button aria-describedby={id} variant="contained" onClick={handleClick} sx={{
                      bgcolor: '#fff',
                      ":hover": {
                        bgcolor: "#fff"
                      }
                    }}>


                      <Avatar sx={{ width: "150px", height: "150px" }} color="primary" alt="Remy Sharp" src="../Avtars/profilepic1.jpg" />


                    </Button>


                    <Box>
                      <Button component="label" variant="contained" startIcon={<EditIcon />} sx={{ m: 2 }}>
                        Edit
                        <VisuallyHiddenInput type="file" />
                      </Button>

                    </Box>



                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}

                    >
                      <Typography sx={{ p: 2 }}>


                        <Avatar sx={{ width: 400, height: 400 }} variant='rounded' color="primary" alt="Remy Sharp" src="../Avtars/profilepic1.jpg" />


                      </Typography>

                    </Popover>

                  </Box>



                  <Box sx={{ padding: '20px' }}>
                    <Box sx={{ justifyContent: "center", alignItems: "center", bgcolor: "primary", textAlign: 'center', marginBottom: '20px' }}><h5 variant="h5" > Sachin Pawar  </h5></Box>

                    <Box sx={{ justifyContent: "center", alignItems: "center", bgcolor: "primary", textAlign: 'center', }}>
                      <TextField
                        sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                        id="standard"
                        label="Registration"
                        defaultValue={employees.registration}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>

                    <Box >

                      <TextField
                        sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                        id="standard"
                        label="Date of Birth"
                        defaultValue={employees.dob}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>
                    <Box>
                      <TextField
                        sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                        id="standard"
                        label="Position"
                        defaultValue={employees.position}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>
                    <Box>
                      <TextField
                        sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                        id="standard"
                        label="Department"
                        defaultValue={employees.department}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>


                  </Box>


                </Box>
              </Paper>
            </Box>

            <Box sx={{ width: '100%', }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Information" {...a11yProps(0)} />
                  <Tab label="Work data" {...a11yProps(1)} />
                  <Tab label="Aditional Data" {...a11yProps(2)} />
                </Tabs>
              </Box>


              <CustomTabPanel value={value} index={0}>

                <Paper sx={{ padding: "15px", marginLeft: '-20px', marginBottom: '25px' }} elevation={3}>
                  <Box sx={{}}>
                    <Box>

                      <h2 variant="h5" > Personal Details <Badge badgeContent={<EditIcon sx={{ bgcolor: "#fff", borderRadius: '50%', }} />} > </Badge></h2>

                    </Box>


                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>

                      <TextField

                        sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                        id="standard"
                        label="Full Name"
                        defaultValue={employees.name}
                        InputProps={{
                          readOnly: true,
                        }}

                      />


                      <TextField
                        sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                        id="standard"
                        label="Gender"
                        defaultValue={employees.gender}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                        id="standard"
                        label="CreatedAt"
                        defaultValue={employees.createdAt}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                    </Box>




                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <TextField
                        sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                        id="standard"
                        label="UpdatedAt"
                        defaultValue={employees.updatedAt}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField
                        sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                        id="standard"
                        label="Last Logout"
                        defaultValue={employees.lastLogout}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField
                        sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                        id="standard"
                        label="Email Otp"
                        defaultValue={employees.emailOtp}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                    </Box>
                    <Box>
                      {/* <TextField

                id="standard"
                label="EmailOtp Expiry"
                defaultValue={employees.emailOtpExpiry}
               variant="outlined" 
                InputProps={{
                  readOnly: true,
                }}
              /> */}
                    </Box>





                  </Box>
                </Paper>


                <Paper sx={{ padding: "15px", marginLeft: '-20px', marginBottom: '25px' }} elevation={3}>
                  <Box >
                    <Box
                      component="form" sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >


                      <Box>

                        <h2 variant="h5" > Contact Details <Badge badgeContent={<EditIcon sx={{ bgcolor: "#fff", borderRadius: '50%', marginLeft: '50%', alignItems: "end" }} />} > </Badge></h2>

                      </Box>
                      <Box >


                        <Box >
                          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }} >

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard-number"
                              label="Number"
                              type="number"
                              defaultValue={employees.number}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="Email"
                              defaultValue={employees.email}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="House No."
                              defaultValue={employees.houseNo}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }} >


                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="Street"
                              defaultValue={employees.street}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="City"
                              defaultValue={employees.city}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="District"
                              defaultValue={employees.district}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />





                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }} >

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="State"
                              defaultValue={employees.state}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />


                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="Country"
                              defaultValue={employees.country}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="Pin Code"
                              defaultValue={employees.pincode}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Paper>

              </CustomTabPanel>



              <CustomTabPanel value={value} index={1}>
                <Paper sx={{ padding: "15px", marginLeft: '-20px', marginBottom: '25px' }} elevation={3}>
                  <Box>
                    <Box
                      component="form" sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >


                      <Box>

                        <h2 variant="h5" > Working Details <Badge badgeContent={<EditIcon sx={{ bgcolor: "#fff", borderRadius: '50%', marginLeft: '50%', alignItems: "end" }} />} > </Badge></h2>

                      </Box>
                      <Box >


                        <Box >
                          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard-number"
                              label="Number"
                              type="number"
                              defaultValue={employees.number}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="Email"
                              defaultValue={employees.email}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="House No."
                              defaultValue={employees.houseNo}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>


                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="Street"
                              defaultValue={employees.street}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="City"
                              defaultValue={employees.city}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="District"
                              defaultValue={employees.district}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />





                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="State"
                              defaultValue={employees.state}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />


                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="Country"
                              defaultValue={employees.country}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="Pin Code"
                              defaultValue={employees.pincode}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </CustomTabPanel>


              <CustomTabPanel value={value} index={2}>
                <Paper sx={{ padding: "15px", marginLeft: '-20px', marginBottom: '25px' }} elevation={3}>
                  <Box>
                    <Box
                      component="form" sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >


                      <Box>

                        <h2 variant="h5" > Aditional Details <Badge badgeContent={<EditIcon sx={{ bgcolor: "#fff", borderRadius: '50%', marginLeft: '50%', alignItems: "end" }} />} > </Badge></h2>

                      </Box>
                      <Box >


                        <Box >
                          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard-number"
                              label="Number"
                              type="number"
                              defaultValue={employees.number}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="Email"
                              defaultValue={employees.email}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="House No."
                              defaultValue={employees.houseNo}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>


                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="Street"
                              defaultValue={employees.street}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="City"
                              defaultValue={employees.city}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="District"
                              defaultValue={employees.district}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />





                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>

                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="State"
                              defaultValue={employees.state}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />


                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="Country"
                              defaultValue={employees.country}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              sx={{ bgcolor: "rgba(0, 0, 0, 0.07)", border: "none" }}
                              id="standard"
                              label="Pin Code"
                              defaultValue={employees.pincode}
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </CustomTabPanel>
            </Box>


          </Box>
        </Box>



      </Box>















    </div>
  )
}
