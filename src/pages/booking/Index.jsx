import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Row, Col, Container } from "react-bootstrap";
import {
  meta,
} from "../../content_option.js";
import BasicDateCalendar from "../../components/mycal";
import FullFeaturedCrudGrid from "../../components/form";

export const Booking = () => {
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
          <Col lg="5">
            <BasicDateCalendar>
            </BasicDateCalendar>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
          <FullFeaturedCrudGrid>
          </FullFeaturedCrudGrid>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
