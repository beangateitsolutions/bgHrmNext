"use client";
import React from "react";

import {
  Typography,
  Box,
  TextField,
  Paper,
  Avatar,
  Divider,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchBar from "../../Components/SearchBar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AddEmployess() {
  // const employees = {
  //     Name,
  //     Registration,
  //     DOB,
  //     Position,
  //     Department,
  //     Email,
  //     MobileNumber,
  //     Gender,
  //     createdAt,
  //     updatedAt,
  //     lastLogout,
  //     emailOtp,
  //     emailOtpExpiry,
  //     disabled,
  //     disableReason,
  //     disabledAt,
  //     houseNo,
  //     street,
  //     district,
  //     city,
  //     country,
  //     pincode,
  //     state,
  //   }

  // const emp = [

  //     {label:'registration',
  //     value:''}
  // ]

  return (
    <>
      {/* AddEmployess */}
      <SearchBar />
      {/* <Paper sx={{p:1}}>
            <Typography variant='h4'> Add Employee</Typography>
            <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'start',flexGrow:1,flexBasis:1, mt:3}}>
              <Box sx={{boxShadow:3,p:2,borderRadius:'10px'}}>
              <Avatar sx={{ width: "150px", height: "150px", m:'auto' }} color="primary" alt="Uplode Profile Pic" src="" />

                <Box sx={{display:'flex',flexDirection:'column', gap:2, justifyContent:'center', alignItems:'center ', mt:3}}>
                 <TextField      id="outlined-basic"  label="Name" variant="outlined" size='small' required sx={{bgcolor:"rgba(0, 0, 0, 0.07)"}} />
                 <TextField      id="outlined-basic"  label="Name" variant="outlined" size='small' required sx={{bgcolor:"rgba(0, 0, 0, 0.07)"}} />
                 <TextField      id="outlined-basic"  label="Name" variant="outlined" size='small' required sx={{bgcolor:"rgba(0, 0, 0, 0.07)"}} />
                 <TextField      id="outlined-basic"  label="Name" variant="outlined" size='small' required sx={{bgcolor:"rgba(0, 0, 0, 0.07)"}} />

                </Box>

              </Box>
              <Box  sx={{boxShadow:3,p:2, borderRadius:'10px'}}>
                <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'start',gap:2}}>
                  <Typography variant='h5'>Basic Details</Typography>
                  <Divider/>
                 <TextField      id="outlined-basic" label="Name" variant="outlined" size='small' required sx={{bgcolor:"rgba(0, 0, 0, 0.07)"}} />
                 <TextField      id="outlined-basic" label="Name" variant="outlined" size='small' required sx={{bgcolor:"rgba(0, 0, 0, 0.07)"}} />
                 <TextField      id="outlined-basic" label="Name" variant="outlined" size='small' required sx={{bgcolor:"rgba(0, 0, 0, 0.07)"}} />
                 <TextField      id="outlined-basic" label="Name" variant="outlined" size='small' required sx={{bgcolor:"rgba(0, 0, 0, 0.07)"}} />
                                 
                </Box>

              </Box>
              
            </Box>
        </Paper> */}
 <Typography variant="h5" align="start" sx={{m:'3'}} >
                {" "}
                Add Employee
              </Typography>
      <Paper sx={{ p: 1.5,mt:2 }}>
     
        <Grid container spacing={2}>
        
          {/* <Grid item xs={12} sm={12} md={12} lg={12}>
            <Item>
              
            </Item>
          </Grid> */}
          <Grid item xs={12} sm={12} md={4} lg={3}>
          <Typography variant="h6" align="start" color='primary' >
                {" "}
                Department Details
              </Typography>
            <Item sx={{boxShadow:0}}>
              <Box sx={{ p: 2, borderRadius: "10px" }}>
                <Avatar
                  sx={{ width:{sm:'110px',md:'125px', lg:"150px"}, height: {sm:'110px',md:'125px',lg:"150px"}, m: "auto" }}
                  color="primary"
                  alt="Uplode Profile Pic"
                  src=""
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center ",
                    mt: 3,
                  }}
                >
                 <TextField  fullWidth  
                    id="outlined-basic"
                    label="Department"
                    variant="outlined"
                    size="small"
                    required
                    sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
                  />
                 <TextField  fullWidth  
                    id="outlined-basic"
                    label="Designation"
                    variant="outlined"
                    size="small"
                    required
                    sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
                  />
                 <TextField  fullWidth  
                    id="outlined-basic"
                    label="Roll"
                    variant="outlined"
                    size="small"
                    required
                    sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
                  />
                 <TextField  fullWidth  
                    id="outlined-basic"
                    label="Employee ID"
                    variant="outlined"
                    size="small"
                    required
                    sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
                  />
                </Box>
              </Box>
              
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={8}  lg={9} >
          <Typography variant="h6" align="start" color='primary'>
                {" "}
                Personal Details 
              </Typography>
            <Item sx={{boxShadow:0}}>


                      <Box sx={{display: "flex",
                    flexDirection:{ xs:"column",md:'row'},
                    gap: 2,
                    justifyContent: "space-around",
                    alignItems: "center ",
                    
                    p:2}}>

                     
             <TextField  fullWidth  
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
              <TextField  fullWidth  
                id="outlined-basic"
                label="DOB"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
             <TextField  fullWidth  
                id="outlined-basic"
                label="Age"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
             <TextField  fullWidth  
                id="outlined-basic"
                label="Gender"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
              </Box>
            </Item>

            <Typography variant="h6" align="start" sx={{mt:3}} color='primary'>
                
                Contact Details 
              </Typography>
            <Item  sx={{boxShadow:0}}>

                      <Box sx={{display: "flex",
                    flexDirection:{ xs:"column",md:'row'},
                    gap: 2,
                    justifyContent: "space-around",
                    alignItems: "center ",
                   
                    p:2}}>

                     
             <TextField  fullWidth  
                id="outlined-basic"
                label="Mobile"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
                
              />
              <TextField  fullWidth  
                id="outlined-basic"
                label="Alt Mobile"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
             <TextField  fullWidth  
                id="outlined-basic"
                label="Email"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
             <TextField  fullWidth  
                id="outlined-basic"
                label="Alt Email"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
            
               </Box>
               <Box sx={{display: "flex",
                    flexDirection:{ xs:"column",md:'row'},
                    gap: 2,
                    justifyContent: "space-around",
                    alignItems: "center ",
                   
                    p:2}}>

                     
             <TextField  fullWidth  
                id="outlined-basic"
                label="House No"
                variant="outlined"
                size="small"
                
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
                
              />
              <TextField  fullWidth  
                id="outlined-basic"
                label="Street"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
             <TextField  fullWidth  
                id="outlined-basic"
                label="Landmark"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
             <TextField  fullWidth  
                id="outlined-basic"
                label="Ctiy"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
            
               </Box>
               <Box sx={{display: "flex",
                    flexDirection:{ xs:"column",md:'row'},
                    gap: 2,
                    justifyContent: "space-around",
                    alignItems: "center ",
                   
                    p:2}}>

                     
             <TextField  fullWidth  
                id="outlined-basic"
                label="District"
                variant="outlined"
                size="small"
                
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
                
              />
              <TextField  fullWidth  
                id="outlined-basic"
                label="State"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
             <TextField  fullWidth  
                id="outlined-basic"
                label="Country"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
             <TextField  fullWidth  
                id="outlined-basic"
                label="Zip Code"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: "rgba(0, 0, 0, 0.07)" }}
              />
            
               </Box>
            </Item>


          </Grid>

          
        </Grid>
      </Paper>
    </>
  );
}
