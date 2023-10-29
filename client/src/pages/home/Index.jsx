import React, { useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option.js";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

import Auth from '../../utils/auth';

export const Home = () => {

  const [alertData, setAlertdata] = useState({
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleAlert = (e) => {
    e.preventDefault();
    console.log("hello there");
    setAlertdata({
      loading: false,
      alertmessage: `Please login on "Contact" page to book an appointment !`,
      variant: "login",
      show: true,
    });
    console.log(alertData.show);
  }

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div
            className="h_bg-image order-1 order-lg-2 h-100 "
            style={{ backgroundImage: `url(${introdata.your_img_url})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
                <h2 className="mb-1x">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x typewriter-text">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                        introdata.animated.fourth,
                        introdata.animated.fifth,
                        introdata.animated.sixth,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className="mb-1x">{introdata.description}</p>
                <div className="intro_btn-action pb-5">
                  <Link to="/ourvets" className="text_2">
                    <div id="button_h" className="ac_btn btn ">
                      Vets
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/services">
                    <div id="button_h" className="ac_btn btn">
                      About
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Contact
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  {Auth.loggedIn() ? (
                    <Link to="/booking">
                    <div id="button_h" className="ac_btn btn">
                      Booking
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                    </Link>
                  ) : (
                    <> 
                    <Link onClick={handleAlert}>
                    <div id="button_h" className="ac_btn btn">
                      Booking
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                    </Link>
                    </> 
                  )}
                </div>
                {Auth.loggedIn() ? (
                  <p className="mb-1x">Welcome <strong>{Auth.getProfile().data.firstName}</strong>!</p>
                ) : (
                  <>
                    <Alert
                      variant={alertData.variant}
                      className={`rounded-0 co_alert ${
                        alertData.show ? "d-block" : "d-none"
                      }`}
                      onClose={() => setAlertdata({ show: false })}
                      dismissible
                    >
                      <p className="my-0">{alertData.alertmessage}</p>
                    </Alert>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
