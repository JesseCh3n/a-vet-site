import React from "react";
import { Route, Routes} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Home } from "../pages/home/Index.jsx";
import { OurVets } from "../pages/ourvets/Index.jsx";
import { ContactUs } from "../pages/contact/Index.jsx";
import { Services } from "../pages/services/Index.jsx";
import { Booking } from "../pages/booking/Index.jsx";
import { Today } from "../pages/today/Index.jsx";
import Socialicons from "../components/Socialicons.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Auth from '../utils/auth.js';

const AnimatedRoutes = () => {
  let location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={{
          enter: 400,
          exit: 400,
        }}
        classNames="page"
        unmountOnExit
      >
        <Routes location={location}>
          <Route exact path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ourvets" element={<OurVets />} />
          <Route path="/contact" element={<ContactUs />} />
          {Auth.loggedIn() ? (
            <>
            <Route path="/booking" element={<Booking />} />
            </>
          ) : (
            <>
            </>
          )}
          {Auth.loggedIn() ? (
            <>
            {Auth.getProfile().data.isAdmin ? (
              <>
              <Route path="/today" element={<Today />} />
              </>
            ) : (
              <>
              </>
            )}
            </>
          ) : (
            <>
            </>
          )}
          <Route path="*" element={<Home />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function AppRoutes() {
  return (
    <div className="s_c">
      <AnimatedRoutes />
      <Socialicons />
    </div>
  );
}

export default AppRoutes;
