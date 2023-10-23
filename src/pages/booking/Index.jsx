import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Row, Col, Container } from "react-bootstrap";
import {
  meta,
} from "../../content_option.js";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export const Booking = () => {

  const currentDate = new Date();
  
  const [selectedDate, setselectedDate] = useState(null);
  console.log({ selectedDate });
  // const [selectedTime, setselectedTime] = useState('');
  // console.log({ selectedTime });
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
      </Container>
    </HelmetProvider>
  );
};
