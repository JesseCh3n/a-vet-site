import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Row, Col, Container } from "react-bootstrap";
import {
  meta,
} from "../../content_option.js";

import getDay from 'date-fns/getDay'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function disableWeekends(date) {
  return getDay(date) === 0 || getDay(date) === 6;
}

const roles = ['The cat is vomitting', 'My dog pees randomly', 'My cat is having a fever'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];


export const Booking = () => {

  const currentDate = new Date();
  
  const [selectedDate, setselectedDate] = useState(null);
  console.log({ selectedDate });

  const [vet, setVet] = useState('');

  const handleChange = (event) => {
    setVet(event.target.value);
  };

  const [selectedText, setselectedText] = useState('');
  const handleChange2 = (event) => {
    setselectedText(event.target.value);
  };
  console.log({ selectedText });

  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
    console.log({ selectedDate, selectedText});
  }

  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
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

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };


  const columns = [
    {
      field: 'joinDate',
      headerName: 'Existing Booking',
      type: 'date',
      width: 280,
      editable: false,
    },
    {
      field: 'role',
      headerName: 'Descriptions',
      width: 500,
      editable: true,
      type: 'text',
    },
    {
      field: 'vet',
      headerName: 'Vets',
      width: 200,
      editable: true,
      type: 'singleSelect',
      valueOptions: ["Michael", "Suki", "Candice"]
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
        </Row>
        <Row className="sec_sp">
          <Col lg="8">
          <DemoContainer
            components={[
              'DateTimePicker',
            ]}
          >
              <DateTimePicker
                hintText="Weekends Disabled" 
                shouldDisableDate={disableWeekends}
                defaultValue={currentDate}
                orientation='landscape'
                value={selectedDate}
                minDate={currentDate}
                minutesStep={30}
                minTime={new Date(0, 0, 0, 8)}
                maxTime={new Date(0, 0, 0, 16, 30)}
                onChange={(newValue) => {
                  setselectedDate(newValue)
                }}
              />
          </DemoContainer>
          </Col>
          <Col lg="4" className="d-flex align-items-center justify-content-center">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Vet</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={vet}
              onChange={handleChange}
              label="Vet"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
            <TextField id="standard-basic" label="Please leave a message." variant="standard" onChange={handleChange2}/>
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


