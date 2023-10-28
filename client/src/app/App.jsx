import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";

import AppRoutes from "./Routes.jsx";
import Headermain from "../header/Index.jsx";
import "./App.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import enAU from 'date-fns/locale/en-AU';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}

export default function App() {
  return (
    // <Router basename={process.env.PUBLIC_URL}>
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enAU}>
        <Router>
          <_ScrollToTop>
            <Headermain />
            <AppRoutes />
          </_ScrollToTop>
        </Router>
      </LocalizationProvider>
    </ApolloProvider>
  );
}
