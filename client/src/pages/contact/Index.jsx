import React, { useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option.js";
import { Container, Row, Col } from "react-bootstrap";
import { contactConfig } from "../../content_option.js";
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

export const ContactUs = () => {
  //Login Form
  const [form1State, setForm1State] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setForm1State({
      ...form1State,
      [name]: value,
    });
  };

  const handleForm1Submit = async (event) => {
    event.preventDefault();
    console.log(form1State);
    try {
      const { data } = await login({
        variables: { ...form1State },
      });

      Auth.login(data.login.token);   
    } catch (e) {
      console.error(e);
    }

    setForm1State({
      email: '',
      password: '',
    });
  };

  //Sign Up Form
  const [form2State, setForm2State] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [addUser] = useMutation(ADD_USER);

  const handleSignupChange = (event) => {
    const { name, value } = event.target;

    setForm2State({
      ...form2State,
      [name]: value,
    });
  };

  const handleForm2Submit = async (event) => {
    event.preventDefault();
    console.log(form2State);

    try {
      const { data } = await addUser({
        variables: { ...form2State },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  //Logout button
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Contact</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Contact Us</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="4" className="mb-5">
            <h3 className="color_sec py-4">Get in touch</h3>
            <address>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                {contactConfig.YOUR_EMAIL}
              </a>
              <br />
              <strong>Contact Number:</strong>{" "}
              <p>
                {contactConfig.YOUR_PHONE}
              </p>
              <br />
            </address>
            <p>{contactConfig.description}</p>
          </Col>
        </Row>
        <Row className="sec_sp">
        <div>

        </div>
        {Auth.loggedIn() ? (
          <>
          <Col lg="12" className="form-group">
            <button className="btn ac_btn" onClick={logout}>
              Logout
            </button>
          </Col>
          </>
        ) : (
          <>
          <Col lg="4" className="mb-5 me-5">
            <h3 className="color_sec py-4">Sign In</h3>
            <form onSubmit={handleForm1Submit} className="contact__form w-80">
                <Row lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email1"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={form1State.email || ""}
                    required
                    onChange={handleLoginChange}
                  />
                </Row>
                <Row lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="password1"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form1State.password || ""}
                    required
                    onChange={handleLoginChange}
                  />
                </Row>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit">
                    Login
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
          <Col lg="4" className="mb-5 me-5">
          <h3 className="color_sec py-4">Sign Up</h3>
            <form onSubmit={handleForm2Submit} className="contact__form w-80">
                <Row lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={form2State.firstName || ""}
                    type="text"
                    required
                    onChange={handleSignupChange}
                  />
                </Row>
                <Row lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={form2State.lastName || ""}
                    type="text"
                    required
                    onChange={handleSignupChange}
                  />
                </Row>
                <Row lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email2"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={form2State.email || ""}
                    required
                    onChange={handleSignupChange}
                  />
                </Row>
                <Row lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="password2"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form2State.password || ""}
                    required
                    onChange={handleSignupChange}
                  />
                </Row>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit">
                    Submit
                    {/* {formData.loading ? "Sending..." : "Send"} */}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
          </>
        )}
        </Row>
      </Container>
      {/* <div className={formData.loading ? "loading-bar" : "d-none"}></div> */}
    </HelmetProvider>
  );
};
