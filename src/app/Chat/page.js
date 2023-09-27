"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Badge, badgeClasses,  } from '@mui/base/Badge';
import MailIcon from '@mui/icons-material/Mail';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';


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

export default function BasicGrid() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    const blue = {
        500: '#007FFF',
    };

    const grey = {
        300: '#afb8c1',
        900: '#24292f',
    };

    const StyledBadge = styled(Badge)(
        ({ theme }) => `
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 14px;
        list-style: none;
        font-family: IBM Plex Sans, sans-serif;
        position: relative;
        display: inline-block;
        line-height: 1;
      
        & .${badgeClasses.badge} {
          z-index: auto;
          position: absolute;
          top: 0;
          right: 0;
          min-width: 22px;
          height: 22px;
          padding: 0 6px;
          color: #fff;
          font-weight: 600;
          font-size: 12px;
          line-height: 22px;
          white-space: nowrap;
          text-align: center;
          border-radius: 12px;
          background: ${blue[500]};
          box-shadow: 0px 4px 6x ${theme.palette.mode === 'dark' ? grey[900] : grey[300]};
          transform: translate(50%, -50%);
          transform-origin: 100% 0; 
        }
        `,
    );

  
    const [showMe, setShowMe] = useState(false);

    function openChat(){
    setShowMe(!showMe);
  }


    return (
        <Box sx={{ p:0, m:0,}}>
            <Grid container sx={{p:0}}>

                <Grid item xs={12} sm={12} md={3} sx={{p:{sm:"0px", xm:"0px"}}} >
                  
                        <Item sx={{padding:{sm:"0px", xm:"0px", }, }}>
                            <AvatarGroup spacing={5} total={15} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt:3, m:1 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>

                            <Paper elevation={3} sx={{p:0.2, m: 1, mt: 3 }} onClick={openChat}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, m: 1 }}>

                                    <Box>
                                        <Avatar alt="Remy Sharp" src="../Avtars/profilepic1.jpg" />
                                    </Box>

                                    <Box >
                                        <Typography variant="h6" component="h6">
                                            Sandeep
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="p" component="h6">
                                            10:05
                                        </Typography>
                                    </Box>

                                </Box>
                            </Paper>
                            <Paper elevation={3} sx={{p:0.2, m: 1, }} onClick={openChat}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, m: 1 }}>

                                    <Box>
                                        <Avatar alt="Remy Sharp" src="../Avtars/profilepic1.jpg" />
                                    </Box>

                                    <Box >
                                        <Typography variant="h6" component="h6">
                                            Sandeep
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="p" component="h6">
                                            10:05
                                        </Typography>
                                    </Box>

                                </Box>
                            </Paper>
                            <Paper elevation={3} sx={{ p: 0.2, m: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, m: 1 }}>

                                    <Box>
                                        <Avatar alt="Remy Sharp" src="../Avtars/profilepic1.jpg" />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" component="h6">
                                            Sachin
                                        </Typography>

                                    </Box>
                                    <Box>
                                        <Typography variant="p" component="h6">
                                            10:05
                                        </Typography>
                                    </Box>


                                </Box>
                            </Paper>
                            <Paper elevation={3} sx={{ p: 0.2, m: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, m: 1 }}>

                                    <Box>
                                        <Avatar alt="Remy Sharp" src="#" />
                                    </Box>
                                    <Box> <Typography variant="h6" component="h6">
                                        Srishti
                                    </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="p" component="h6">
                                            10:05
                                        </Typography>
                                    </Box>


                                </Box>
                            </Paper>
                            <Paper elevation={3} sx={{ p: 0.2, m: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, m: 1 }}>

                                    <Box>
                                        <Avatar alt="Remy Sharp" src="#" />
                                    </Box>
                                    <Box> <Typography variant="h6" component="h6">
                                        Srishti
                                    </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="p" component="h6">
                                            10:05
                                        </Typography>
                                    </Box>


                                </Box>
                            </Paper>
                            
                            <Paper elevation={3} sx={{ p: 0.2, m: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, m: 1 }}>

                                    <Box>
                                        <Avatar alt="Remy Sharp" src="../Avtars/profilepic1.jpg" />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" component="h6">
                                            Sachin
                                        </Typography>

                                    </Box>
                                    <Box>
                                        <Typography variant="p" component="h6">
                                            10:05
                                        </Typography>
                                    </Box>


                                </Box>
                            </Paper>
                            <Paper elevation={3} sx={{ p: 0.2, m: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, m: 1 }}>

                                    <Box>
                                        <Avatar alt="Remy Sharp" src="#" />
                                    </Box>
                                    <Box> <Typography variant="h6" component="h6">
                                        Srishti
                                    </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="p" component="h6">
                                            10:05
                                        </Typography>
                                    </Box>


                                </Box>
                            </Paper>
                            <Paper elevation={3} sx={{ p: 0.2, m: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, m: 1 }}>

                                    <Box>
                                        <Avatar alt="Remy Sharp" src="#" />
                                    </Box>
                                    <Box> <Typography variant="h6" component="h6">
                                        Srishti
                                    </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="p" component="h6">
                                            10:05
                                        </Typography>
                                    </Box>


                                </Box>
                            </Paper>
                            
                        </Item>
                 

                </Grid>


                <Grid id="chat" item xs={12} sm={12} md={9}  sx={{display:{md: showMe?"none":"block",xs: showMe?"block":"none", sm: showMe?"block":"none"}}}>
                    <Item  sx={{p:0}}>
                        <Box sx={{height:'100%',}}>
                            <Paper elevation={1} sx={{ p: 0.2,  }}>
                                <Box sx={{ display: 'flex', justifyContent: 'start', gap: 2, m: 1 }}>

                                    <Box>
                                        <Avatar alt="Remy Sharp" src="../Avtars/profilepic1.jpg" />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" component="h6">
                                            Sachin
                                        </Typography>

                                    </Box>
                                    

                                </Box>
                            </Paper>
                            
                            {/* </Box> */}

                            {/* chat content */}

                            <Box sx={{height:{ lg:'65.5vh', md:'65.5vh', sm:'100%', xs:'100%',},  mt:3}}>

                                <Box>
                                    
                                    <Box sx={{display:'flex', justifyContent:'start', alignItems:'center'}}>
                                        <Box sx={{ml:2}} >
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </Box>

                                        <Box sx={{m:1,p:2, borderRadius:4, width:{ lg:'45%', md:'45%', sm:'100%', xs:'100%',}, boxShadow: 3, backgroundColor:"rgba(229, 228, 226, 0.3)"}}>
                                                
                                                <Typography variant='p' sx={{display:'flex',textAlign:'start', justifyContent:'start'}} >
                                                    
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.     

                                                </Typography>
                                            
                                        </Box>
                                    </Box>
                                    <Box sx={{display:'flex', justifyContent:'end', alignItems:'center'}}>
                                        

                                        <Box sx={{m:1,p:2, borderRadius:4, width:{ lg:'45%', md:'45%', sm:'100%', xs:'100%',}, boxShadow: 3, backgroundColor:"#1976D2" }}>
                                                
                                                <Typography variant='p' sx={{display:'flex',textAlign:'start', justifyContent:'start', color:"#fff"}}>
                                                    
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.     

                                                </Typography>
                                            
                                        </Box>
                                        <Box sx={{mr:2}} >
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </Box>
                                    </Box>
                                    <Box sx={{display:'flex', justifyContent:'start', alignItems:'center'}}>
                                        <Box sx={{ml:2}} >
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </Box>

                                        <Box sx={{m:1,p:2, borderRadius:4, width:{ lg:'45%', md:'45%', sm:'100%', xs:'100%',}, boxShadow: 3, backgroundColor:"rgba(229, 228, 226, 0.3)"}}>
                                                
                                                <Typography variant='p' sx={{display:'flex',textAlign:'start', justifyContent:'start'}}>
                                                    
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.     

                                                </Typography>
                                            
                                        </Box>
                                    </Box>
                                    
                                    
                                </Box>


                               

                             
                                
                            </Box>

                            {/* chat content */}  

                                <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    
                                    
                                        <Box sx={{width:"100%",  boxShadow: 2, borderRadius:'1', top:"100%", }}>
                                            <TextField
                                                sx={{width:"100%", borderColor:"#fff",}}
                                                fullwidth 
                                                id="input-with-icon-textfield"
                                                placeholder="type Here"
                                                size="large"
                                                
                                                InputProps={{
                                                
                                                    startAdornment: (
                                                        <InputAdornment position="start">
    
                                                        <IconButton sx={{color:"black"}} component="label" variant="contained">
                                                    
                                                            <VisuallyHiddenInput type="file" />
                                                            <AttachmentIcon  />
                                                            </IconButton>
                                                        </InputAdornment>
                                                        
                                                ),
                                                
                                                endAdornment: (
                                                    <InputAdornment position="end">

                                                    <IconButton sx={{color:"black"}} component="label" variant="contained">
                                                
                                                        <VisuallyHiddenInput type="submit" />
                                                        <SendIcon  />
                                                        </IconButton>
                                                    </InputAdornment>
                                                    
                                            ),
                                                }}
                                               
                                            />
                                            
                                            </Box>
                                      
                                   
                                </Grid>


                                
                        </Box>  
                        
                    </Item>
                </Grid>

                {/* <Grid item xs={12} sm={12} md={3}>
                    <Item>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar src="../Avtars/profilepic1.jpg" sx={{ width: "150px", height: "150px",mb: 2 }} color="primary" alt="Remy Sharp" />
                        </Box>
                        <Box sx={{ padding: '10px', mb: 3 }}><h3 variant="h3" >  Sachin Pawar </h3>
                        </Box>
                        <Box ><h6 variant="P" >  Team Member </h6>
                        </Box>
                        <Box>
                            <Stack spacing={4} direction="row" sx={{ display:'flex',alignItems:'center', justifyContent:'center', p:1, mb: 3}}>
                                <StyledBadge badgeContent={9}>
                                    <MailIcon />
                                </StyledBadge>
                                <StyledBadge badgeContent={21}>
                                    <PhoneCallbackIcon />
                                </StyledBadge>
                            </Stack>
                            <Box sx={{p:1}}>
                       
                            
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',  mb: 3 }}>

                                    <Box >
                                        <Typography variant="P" component="h6">
                                            Working Project
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="P" component="h6">
                                            BeanGate HRM
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 3 }}>

                                    <Box >
                                        <Typography variant="P" component="h6">
                                        Allotted Project
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="P" component="h6">
                                            BeanGate HRM
                                        </Typography>
                                    </Box>
                                </Box>
                      
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 3 }}>

                                    
                                    <Box>
                                        <Typography variant="P" component="h6">
                                            Department
                                        </Typography>

                                    </Box>
                                    <Box>
                                        <Typography variant="P" component="h6">
                                            Product Division
                                        </Typography>
                                    </Box>
                                </Box>
                        
                          
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 3 }}>

                                    <Box> <Typography variant="P" component="h6">
                                        Mobile No.
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="P" component="h6">
                                        93403261142
                                        </Typography>
                                    </Box>
                                </Box>
                           
                           
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 3 }}>

                                    <Box> <Typography variant="P" component="h6">
                                        Mail Box 
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="P" component="h6">
                                        xyz@gmail.com
                                        </Typography>
                                    </Box>
                                </Box>
                         
                            
                       
                    </Box>
                        </Box>
                    </Item>
                </Grid> */}

            </Grid>
        </Box>
    );
}