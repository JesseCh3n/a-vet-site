import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Row, Col, Container, Alert } from "react-bootstrap";
import {
  meta,
} from "../../content_option.js";

import getDay from 'date-fns/getDay';
import format from 'date-fns/format';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';

import Auth from '../../utils/auth';


//Define rows
class tableRow{
  constructor(id, appointmentTime, firstName, lastName, appointmentText, vet) {
    this.id = id;
    this.appointmentTime = appointmentTime;
    this.firstName = firstName;
    this.lastName = lastName;
    this.appointmentText = appointmentText;
    this.vet = vet;
  }
}

//Export React component
export const Today = () => {

  // const currentDate = format(new Date, 'dd-MM-yyyy');
  const currentDate = '21-11-2023';
  const titleDate = format(new Date, 'dd-MMM-yyyy');

  const [rows, setRows] = useState([]);


  //Fetch data for rows
  let initialRows = [];

  const { loading, data } = useQuery(QUERY_USERS);
  const usersData = data?.getUsers || [];
  console.log(data);
  console.log(usersData);

  useEffect(() => {
    if (usersData) {
      for (let i=0; i<usersData.length; i++) {
        for (let j=0; j<usersData[i].appointments.length; j++) {
            if (usersData[i].appointments[j].appointmentDate == currentDate) {
              // console.log(typeof(usersData[i].appointments[j].appointmentDate));
              const tableData = new tableRow(
                usersData[i].appointments[j]._id,
                usersData[i].appointments[j].appointmentTime,
                usersData[i].firstName,
                usersData[i].lastName,
                usersData[i].appointments[j].appointmentText,
                usersData[i].appointments[j].vet,
              );
              initialRows = [...initialRows, tableData];
            }
        }
      }
      console.log(initialRows);
      setRows(initialRows);
    }
  }, [data]);
  

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Today's Appointments | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">{titleDate}</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Appointment Time</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Vet</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.appointmentTime}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.appointmentTime}
                    </TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.appointmentText}</TableCell>
                    <TableCell>{row.vet}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Row>
      </Container>
    </HelmetProvider>
  );
};


