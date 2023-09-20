import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Card, Container, Box, Grid, TextField, FormControl, FormControlLabel, Checkbox, Button, checkboxClasses, Divider } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Link from 'next/link';




export default function BasicButtons() {


  return (
    <>
      <Container component="main" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: "100vh", width: '100vw', bgcolor: "#2a2a72", backgroundImage: "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* background-color: #2a2a72; */}
          {/* background-image: linear-gradient(315deg, #2a2a72 0%, #009ffd 74%); */}

          <Card sx={{ padding: 5, width: "60%" }}>

            <Typography component="h1" variant='h5' sx={{ marginBottom: 6,mt:6,  textAlign: "start" }} >
              <b > Login</b>

            </Typography>

            <Box component="form" >
              <Grid Container spacing={1}>

                <Grid item sx={{ marginBottom: 3 }}>
                  <TextField
                    autoComplete='Given_name'
                    name='EmailAddress'
                    required
                    fullWidth
                    Id="EmailAddress"
                    label="EmailAddress"
                    autoFocus
                    size="small"

                  />
                </Grid>
                <Grid item sx={{ marginBottom: 3 }} >
                  <TextField
                    autoComplete='Given_name'
                    name='Password'
                    required
                    fullWidth
                    Id="Password"
                    label="Password"
                    autoFocus
                    size="small"
                  />
                </Grid>

                <Grid item sx={{ marginBottom: 3 }}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Confirm" />
                  <Link href="#" align="right" sx={{ float: "right" }}> Forget Password</Link>
                </Grid>

                <Grid item xs={12} sm={8} sx={{ marginBottom: 3 }}>
                  <Button variant="contained" fullWidth>Login</Button>

                </Grid>


              </Grid>




            </Box>
           <Box sx={{mt:6}}> <Divider fullWidth /></Box>
           <Box>
           <Grid item sx={{ marginTop: 1 }} align='center'>
                  Don't have account
                  <Link href="#" > Sign Up</Link>
                </Grid>
           </Box>
          </Card>


          <Card sx={{ p: 5, width: "100%" }}>

            <Box >

              <ImageListItem sx={{ alignItems: 'center' }}>

                <img src="../Avtars/loginpage.jpg" />

              </ImageListItem>


            </Box>
          </Card>



        </Box>

      </Container>

    </>
  );
}
