"use client";
import * as React from "react";

import jsPDFInvoiceTemplate from "jspdf-invoice-template";

// const outputTypes = jsPDFInvoiceTemplate.OutputType;
// const jsPDF = jsPDFInvoiceTemplate.jsPDF();

// jsPDFInvoiceTemplate.default( propsObject );

import { CChart } from "@coreui/react-chartjs";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

import {
  Box,
  Typography,
  Avatar,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TextField,
} from "@mui/material";

const lables = [
  "ID",
  "Name",
  "Department",
  "Designation",
  "Total Working Days",
  "LOP Days",
  "Paid Days",
  "Gross Sallry",
  "Date Of Joining",
  "AC No.",
];
const EmployeeDetails = [
  "BG012",
  "Sachin Pawar",
  "Development",
  "Fron End Developer",
  22,
  0,
  22,
  8000,
  "01-09-2022",
  3786254891,
];

const lables1 = [
  "Basic Salry",
  "House Rent Allowances ",
  "Conveyance Allowances",
  "Medical Allowances ",
  "Special Allowances",
  "EPF",
  "Health Insurance/ESI",
  "Professional Tax",
  "Total Deductions",
  "Gross Sallry",
];
const EmployeeDetails1 = [3600, 1440, 1600, 1250, 110, 0, 0, 0, 0, 8000];

const labelsName = ["Earnings", "Deductions", "HA"];
// const data =[2950,1000]

const data = [3977, 1023, 1200];

//  Calendar finctions

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "💚" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function Page({ params }) {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };



  // PDF Maker

  function genratePaySlip(){

    // var pdfObject = jsPDFInvoiceTemplate.default(props);
    document.getElementById("payslip").innerHTML = props.fileName
    console.log("test",props)

    
  }


  var props = {
    outputType: jsPDFInvoiceTemplate.Save,
    returnJsPDFDocObject: true,
    fileName: "Invoice 2021",
    orientationLandscape: false,
    compress: true,
    logo: {
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
        type: 'PNG', //optional, when src= data:uri (nodejs case)
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    stamp: {
        inAllPages: true, //by default = false, just in the last page
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
        type: 'JPG', //optional, when src= data:uri (nodejs case)
        width: 20, //aspect ratio = width/height
        height: 20,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    business: {
        name: "Business Name",
        address: "Albania, Tirane ish-Dogana, Durres 2001",
        phone: "(+355) 069 11 11 111",
        email: "email@example.com",
        email_1: "info@example.al",
        website: "www.example.al",
    },
    contact: {
        label: "Invoice issued for:",
        name: "Client Name",
        address: "Albania, Tirane, Astir",
        phone: "(+355) 069 22 22 222",
        email: "client@website.al",
        otherInfo: "www.website.al",
    },
    invoice: {
        label: "Invoice #: ",
        num: 19,
        invDate: "Payment Date: 01/01/2021 18:12",
        invGenDate: "Invoice Date: 02/02/2021 10:17",
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: "#", 
            style: { 
              width: 10 
            } 
          }, 
          { 
            title: "Title",
            style: {
              width: 30
            } 
          }, 
          { 
            title: "Description",
            style: {
              width: 80
            } 
          }, 
          { title: "Price"},
          { title: "Quantity"},
          { title: "Unit"},
          { title: "Total"}
        ],
        table: Array.from(Array(10), (item, index)=>([
            index + 1,
            "There are many variations ",
            "Lorem Ipsum is simply dummy text dummy text ",
            200.5,
            4.5,
            "m2",
            400.5
        ])),
        additionalRows: [{
            col1: 'Total:',
            col2: '145,250.50',
            col3: 'ALL',
            style: {
                fontSize: 14 //optional, default 12
            }
        },
        {
            col1: 'VAT:',
            col2: '20',
            col3: '%',
            style: {
                fontSize: 10 //optional, default 12
            }
        },
        {
            col1: 'SubTotal:',
            col2: '116,199.90',
            col3: 'ALL',
            style: {
                fontSize: 10 //optional, default 12
            }
        }],
        invDescLabel: "Invoice Note",
        invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
};


  return (
    <>
      <Box
        component={Paper}
        sx={{
          width: "100%",
          px: 2,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>
          Sallary Slip Of <b>Employee Name</b>
        </Typography>
        <Box>
          <Avatar
            src="../Avtars/profilepic1.jpg"
            // sx={{ width: 24, height: 24 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          component={Paper}
          sx={{
            my: 2,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-around",alignItems:'center',width:'100%' }}>
            <Box>            
            <CChart style={{ width: 300 }}
              type="doughnut"
              data={{
                labels: labelsName,

                datasets: [
                  {
                    backgroundColor: ["#00D8FF", "#DD1", "#B16"],
                    data: data,
                    hoverOffset: 4,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: " rgba(0, 0, 0, 1)",
                      textAlign: "left",
                    },
                  },
                },
              }}
            />
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  defaultValue={initialValue}
                  loading={isLoading}
                  onMonthChange={handleMonthChange}
                  renderLoading={() => <DayCalendarSkeleton />}
                  slots={{
                    day: ServerDay,
                  }}
                  slotProps={{
                    day: {
                      highlightedDays,
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
            <Box>
            <Button variant="contained" endIcon={<SendIcon />} onClick={genratePaySlip}>
  Send
</Button>

<p id="payslip"></p>
            </Box>
          </Box>

          <Box sx={{ m: 2 }}>
            <Typography variant="h6">Details</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box>
                {lables.map((key, index) => {
                  return (
                    <TextField
                      label={key}
                      id="outlined-size-small"
                      defaultValue={EmployeeDetails[index]}
                      size="small"
                      inputProps={{
                        readOnly: true,
                      }}
                      sx={{ m: 2, width: "40%" }}
                    />
                  );
                })}
              </Box>
              <Box>
                {lables1.map((key, index) => {
                  return (
                    <TextField
                      label={key}
                      id="outlined-size-small"
                      defaultValue={EmployeeDetails1[index]}
                      size="small"
                      inputProps={{
                        readOnly: true,
                      }}
                      // fullWidth
                      color={index == 8 ? "error" : "primary"}
                      sx={{ m: 2, width: "40%" }}
                    />
                  );
                })}
              </Box>
            </Box>

            {/* <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>

                  </TableRow>
                </TableHead>
              </Table>

            </TableContainer> */}
          </Box>
        </Box>
      </Box>
    </>
  );
}
