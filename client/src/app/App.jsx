import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
// import withRouter from "../hooks/withRouter";
import AppRoutes from "./Routes.jsx";
import Headermain from "../header/Index.jsx";
import "./App.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import enAU from 'date-fns/locale/en-AU';

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
// const ScrollToTop = withRouter(_ScrollToTop);
// console.log(_ScrollToTop);
// console.log(ScrollToTop);

export default function App() {
  return (
    // <Router basename={process.env.PUBLIC_URL}>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enAU}>
    <Router>
      <_ScrollToTop>
        <Headermain />
        <AppRoutes />
      </_ScrollToTop>
    </Router>
    </LocalizationProvider>
  );
}
