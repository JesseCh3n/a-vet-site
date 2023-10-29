import React, { useState } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { logotext ,socialprofils } from "../content_option.js";
import Themetoggle from "../components/themetoggle";
import { Alert } from "react-bootstrap";

import Auth from '../utils/auth';

const Headermain = () => {
  const [isActive, setActive] = useState("false");

  const [alertData, setAlertdata] = useState({
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleAlert = (e) => {
    e.preventDefault();
    setAlertdata({
      loading: false,
      alertmessage: `Please login on "Contact" page to book an appointment !`,
      variant: "login",
      show: true,
    });
  }

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  return (
    <>
      <header className="fixed-top site__header">
        <div className="d-flex align-items-center justify-content-between">
          <Link  className="navbar-brand nav_ac" to="/">
            {logotext}
          </Link>
          <div className="d-flex align-items-center">
          <Themetoggle />
          <button className="menu__button  nav_ac" onClick={handleToggle}>
            {!isActive ? <VscClose /> : <VscGrabber />}
          </button>
          
          </div>
        </div>

        <div className={`site__navigation ${!isActive ? "menu__opend" : ""}`}>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                  <li className="menu_item ">
                    <Link  onClick={handleToggle} to="/" className="my-3">Home</Link>
                  </li>
                  <li className="menu_item">
                    <Link  onClick={handleToggle} to="/ourvets" className="my-3">Our Vets</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/services" className="my-3">Our Services</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/contact" className="my-3">Contact Us</Link>
                  </li>
                  <li className="menu_item">
                    {Auth.loggedIn() ? (
                      <>
                      <Link onClick={handleToggle} to="/booking" className="my-3">Booking</Link>
                      </>
                    ) : (
                      <> 
                      <Link onClick={handleAlert} to="/contact" className="my-3">Booking</Link> 
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
                      </> 
                    )}
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/today" className="my-3">Today's Appointments</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="menu_footer d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3">
            <div className="d-flex">
            <a href={socialprofils.linkedin}>LinkedIn</a>
            <a href={socialprofils.github}>Github</a>
            </div>
            <p className="copyright m-0">copyright {logotext}</p>
          </div>
        </div>
      </header>
      <div className="br-top"></div>
      <div className="br-bottom"></div>
      <div className="br-left"></div>
      <div className="br-right"></div>
      
    </>
  );
};

export default Headermain;
