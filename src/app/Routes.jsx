import React from "react";
import { Route, Routes} from "react-router-dom";
// import withRouter from "../hooks/withRouter"
import { useLocation } from 'react-router-dom';
import { Home } from "../pages/home/Index.jsx";
import { Portfolio } from "../pages/portfolio/Index.jsx";
import { ContactUs } from "../pages/contact/Index.jsx";
import { About } from "../pages/about/Index.jsx";
import Socialicons from "../components/Socialicons.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";


// const AnimatedRoutes = withRouter(({ useLocation }) => (
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
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<ContactUs />} />
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
