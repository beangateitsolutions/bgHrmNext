"use client";
import * as React from "react";
import dayjs from 'dayjs';
import Box from "@mui/material/Box";

import AddShedule from "../Components/AddShedule";
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';


import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VideocamIcon from "@mui/icons-material/Videocam";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary[theme.palette.mode],
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));


const isInSameWeek = (dayA, dayB) => {
  if (dayB == null) {
    return false;
  }
  return dayA.isSame(dayB, 'week');
};

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />

  );
}



function createData(time, sunday, monday, tuesday, wednesday , thursday, friday, saturday ) {
  return { time, sunday, monday, tuesday, wednesday , thursday, friday, saturday  };
}
// Monday, Tuesday, Wednesday, Thursday, and Friday; while Saturday and Sunday are part of the weekend.
const rows = [
  createData('10 AM',"Hollyday", 'Meeting', ' ',' ' , ' ' , ' ','Hollyday'),
  createData('11 AM',"Hollyday", '', 'Reminder',''  , ' ' , ' ','Hollyday'),
  createData('12 PM',"Hollyday", '', '',''  , ' ' , ' ','Hollyday'),
  createData('01 PM',"Hollyday", '', '',''  , ' ' , ' ','Hollyday'),
  createData('02 PM',"Hollyday", '', '',''  , 'V-Com' , ' ','Hollyday'),
  createData('03 PM',"Hollyday", '', '','Task'  , ' ' , ' ','Hollyday'),
  createData('04 PM',"Hollyday", '', '',''  , ' ' , ' ','Hollyday'),
  createData('05 PM',"Hollyday", '', 'V-Com',''  , ' ' , ' ','Hollyday'),
  createData('06 PM',"Hollyday", '', '',''  , ' ' , 'Meeting ','Hollyday'),
  createData('07 PM',"Hollyday", '', '',''  , ' ' , ' ','Hollyday'),

];



export default function DateCalendarServerRequest() {

  const [hoveredDay, setHoveredDay] = React.useState(null);
  const [value, setValue] = React.useState(dayjs());

  return (
    <div style={{ position: "relative",display:'flex', gap:25 }}>
      <Box>

      
      <Box>
        {/* <Week /> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}
    
    localeText={{
        calendarWeekNumberHeaderText: 'No.',
        calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
    }}
    >
        

      <DateCalendar
      
        value={value}
        onChange={(newValue) => setValue(newValue)}
        showDaysOutsideCurrentMonth
        displayWeekNumber
        slots={{ day: Day }}
        slotProps={{
          day: (ownerState) => ({
            selectedDay: value,
            hoveredDay,
            onPointerEnter: () => setHoveredDay(ownerState.day),
            onPointerLeave: () => setHoveredDay(null),
          }),
        }}
      />
    </LocalizationProvider>
      </Box>

      <Divider></Divider>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Events</Typography>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            }
            label="Hollydays"
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<BookmarkBorderIcon />}
                checkedIcon={<BookmarkIcon />}
              />
            }
            label="Reminders"
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<FolderZipOutlinedIcon />}
                checkedIcon={<FolderZipIcon />}
              />
            }
            label="Task"
          />

          <FormControlLabel
            control={
              <Checkbox
                icon={<WorkspacesOutlinedIcon />}
                checkedIcon={<WorkspacesIcon />}
              />
            }
            label="Meetings"
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<VideocamOutlinedIcon />}
                checkedIcon={<VideocamIcon />}
              />
            }
            label="Video Confrence"
          />
        </FormGroup>
      </Box>
            

      </Box>
      <Box>
<Box component={Paper} sx={{display:'flex', justifyContent:'space-between',alignItems:'center',my:2,}}>

        <Typography variant="h5"   sx={{my:2, p:0.5}}> 
          Schedule
           
        </Typography>
        <Box>
        <AddShedule sx={{fontSize:30}}  />
        
        </Box>
</Box>

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,width:'70vw' }} size="large" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{p:5}}>
            <TableCell>TIME</TableCell>
            <TableCell align="center">SUN,{`${dayjs(value).day(0).date()}`}</TableCell>
            <TableCell align="center">MON,{`${dayjs(value).day(1).date()}`}</TableCell>
            <TableCell align="center">TUE,{`${dayjs(value).day(2).date()}`}</TableCell>
            <TableCell align="center">WED,{`${dayjs(value).day(3).date()}`}</TableCell>
            <TableCell align="center">THU,{`${dayjs(value).day(4).date()}`}</TableCell>
            <TableCell align="center">FRI,{`${dayjs(value).day(5).date()}`}</TableCell>
            <TableCell align="center">SAT,{`${dayjs(value).day(6).date()}`}</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.time}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="center" sx={{ color:'rgba(255,0,0,0.8)'}}>
                {row.sunday}
                {/* <Paper  sx={{color:'rgba(255,0,0,0.8)',p:1}}>

                </Paper> */}
                
                
                </TableCell>
              <TableCell align="center">{row.monday}</TableCell>
              <TableCell align="center">{row.tuesday}</TableCell>
              <TableCell align="center">{row.wednesday}</TableCell>
              <TableCell align="center">{row.thursday}</TableCell>
              <TableCell align="center">{row.friday}</TableCell>
              <TableCell align="center" sx={{ color:'rgba(255,0,0,0.8)'}}>{row.saturday}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 
            </Box>

    </div>
  );
}
