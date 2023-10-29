import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Row, Col, Container, Alert } from "react-bootstrap";
import {
  meta,
} from "../../content_option.js";

import getDay from 'date-fns/getDay';
import format from 'date-fns/format';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_CHECK_USER } from '../../utils/queries';
import { ADD_APPOINTMENT, UPDATE_APPOINTMENT, REMOVE_APPOINTMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

function disableWeekends(date) {
  return getDay(date) === 0 || getDay(date) === 6;
}

//Define rows
class tableRow{
  constructor(id, appointmentDate, appointmentTime, appointmentText, vet) {
    this.id = id;
    this.appointmentDate = appointmentDate;
    this.appointmentTime = appointmentTime;
    this.appointmentText = appointmentText;
    this.vet = vet;
  }
}

//Export React component
export const Booking = () => {

  const currentDate = new Date();

  const [rows, setRows] = useState([]);

  const [alertData, setAlertdata] = useState({
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  //Fetch data for rows
  let initialRows = [];

  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || [];

  useEffect(() => {
    if (data) {
      for (let i=0; i<userData.appointments.length; i++) {
        const tableData = new tableRow(
          userData.appointments[i]._id,
          userData.appointments[i].appointmentDate,
          userData.appointments[i].appointmentTime,
          userData.appointments[i].appointmentText,
          userData.appointments[i].vet,
        );
        initialRows = [...initialRows, tableData];
      }
      console.log(initialRows);
      setRows(initialRows);
    }
  }, [userData]);
  
  //Handle date selection
  const [addAppointment, { error }] = useMutation(ADD_APPOINTMENT);
  const [selectedDate, setselectedDate] = useState(null);
  let DateX = "";
  if (selectedDate) {
    DateX = format(selectedDate, 'dd-MM-yyyy');
  }

  //Handle vet selection
  const [selectedVet, setselectedVet] = useState('');

  const handleVetChange = (event) => {
    setselectedVet(event.target.value);
  };

  //Handle time slot selection
  const [selectedTime, setselectedTime] = useState('');

  const handleTimeChange = (event) => {
    setselectedTime(event.target.value);
  };

  //Handle appointment text input
  const [selectedText, setselectedText] = useState('');
  const handleTextChange = (event) => {
    setselectedText(event.target.value);
  };


  //Check if the time slot is available
  if ((DateX != null) && (selectedTime != null)) {
    const { data } = useQuery(QUERY_CHECK_USER, {
      variables: { appDate: DateX, appTime: selectedTime },
    });
    if (data) {
      if (data.checkUsers.count > 0){
        console.log(data.checkUsers.count);
        // setAlertdata({
        //   loading: false,
        //   alertmessage: "This time slot is not available — please book another time!",
        //   variant: "booked",
        //   show: true,
        // });
        window.alert("This time slot is not available — please book another time!");
        window.location.reload();
      }
    }
  }
  
  //Handle additions of new appointment
  const handleSubmit = (e) => {
    e.preventDefault();

    const { data } = addAppointment({
      variables: { 
        userId: Auth.getProfile().data._id, 
        vetData: selectedVet, 
        appDate: format(selectedDate, 'dd-MM-yyyy'), 
        appTime: selectedTime,
        appText: selectedText
      },
    });
    window.location.reload();
  };

  //Handle existing appointment editing.
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setRows(rows);
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  
  //Handle appointment removal
  const [removeAppointment] = useMutation(REMOVE_APPOINTMENT);

  const handleDeleteClick = (id) => async () => {
    setRows(rows.filter((row) => row.id !== id));
    try {
      const { data } = await removeAppointment({
        variables: { appointmentId: id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  //Handle appointment update
  const [updateAppointment] = useMutation(UPDATE_APPOINTMENT);

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    const appText = updatedRow.appointmentText;
    const appId = updatedRow.id;

    const { data } = updateAppointment({
      variables: { appointmentId: appId, appointmentText: appText },
    });

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  //Define columns
  const columns = [
    {
      field: 'appointmentDate',
      headerName: 'Existing Booking Date',
      type: 'text',
      width: 200,
      editable: false,
    },
    {
      field: 'appointmentTime',
      headerName: 'Existing Booking Time',
      type: 'text',
      width: 200,
      editable: false,
    },
    {
      field: 'appointmentText',
      headerName: 'Descriptions',
      width: 500,
      editable: true,
      type: 'text',
    },
    {
      field: 'vet',
      headerName: 'Vets',
      width: 100,
      editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Booking | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Booking</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
          <Col lg="12">
            <Alert
              //show={formData.show}
              variant={alertData.variant}
              className={`rounded-0 co_alert ${
                alertData.show ? "d-block" : "d-none"
              }`}
              onClose={() => setAlertdata({ show: false })}
              dismissible
            >
              <p className="my-0">{alertData.alertmessage}</p>
            </Alert>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="4">
          <DemoContainer
            components={[
              'DatePicker',
            ]}
          >
              <DatePicker
                hintText="Weekends Disabled" 
                shouldDisableDate={disableWeekends}
                defaultValue={currentDate}
                orientation='landscape'
                value={selectedDate}
                minDate={currentDate}
                onChange={(newValue) => {
                  setselectedDate(newValue)
                }}
              />
          </DemoContainer>
          </Col>
          <Col lg="4" className="d-flex align-items-center justify-content-center">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Time</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedTime}
              onChange={handleTimeChange}
              label="Time"
            >
              <MenuItem value={"8:30 AM"}>8:30 AM</MenuItem>
              <MenuItem value={"9:00 AM"}>9:00 AM</MenuItem>
              <MenuItem value={"9:30 AM"}>9:30 AM</MenuItem>
              <MenuItem value={"10:00 AM"}>10:00 AM</MenuItem>
              <MenuItem value={"10:30 AM"}>10:30 AM</MenuItem>
              <MenuItem value={"11:00 AM"}>11:00 AM</MenuItem>
              <MenuItem value={"11:30 AM"}>11:30 AM</MenuItem>
              <MenuItem value={"12:00 PM"}>12:00 PM</MenuItem>
              <MenuItem value={"12:30 PM"}>12:30 PM</MenuItem>
              <MenuItem value={"1:00 PM"}>1:00 PM</MenuItem>
              <MenuItem value={"1:30 PM"}>1:30 PM</MenuItem>
              <MenuItem value={"2:00 PM"}>2:00 PM</MenuItem>
              <MenuItem value={"2:30 PM"}>2:30 PM</MenuItem>
              <MenuItem value={"3:00 PM"}>3:00 PM</MenuItem>
              <MenuItem value={"3:30 PM"}>3:30 PM</MenuItem>
              <MenuItem value={"4:00 PM"}>4:00 PM</MenuItem>
              <MenuItem value={"4:30 PM"}>4:30 PM</MenuItem>
            </Select>
          </FormControl>
          </Col>
          <Col lg="4" className="d-flex align-items-center justify-content-center">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Vet</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedVet}
              onChange={handleVetChange}
              label="Vet"
            >
              <MenuItem value={"Michael"}>Michael</MenuItem>
              <MenuItem value={"Suki"}>Suki</MenuItem>
              <MenuItem value={"Candice"}>Candice</MenuItem>
            </Select>
          </FormControl>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="8">
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '80ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="standard-basic" label="Please leave a message." variant="standard" onChange={handleTextChange}/>
          </Box>
          </Col>
          <Col lg="4" className="d-flex align-items-center justify-content-center">
            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Box
            sx={{
              height: 500,
              width: '100%',
              '& .actions': {
                color: 'text.secondary',
              },
              '& .textPrimary': {
                color: 'text.primary',
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
            />
          </Box>
        </Row>
      </Container>
    </HelmetProvider>
  );
};


