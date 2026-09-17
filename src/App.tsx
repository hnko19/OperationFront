import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

<<<<<<< HEAD
import { ToastContainer } from "react-toastify";
import ProtuctedRoute from "./Components/ProtuctedRoute/ProtuctedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import CountryPage from "./Pages/CountryPage";
import HandlingAgentsCompanyPage from "./Pages/HandlingAgentsCompanyPage";
import AircraftType from "./Pages/AircraftType/AircraftType";
=======
import { ToastContainer } from 'react-toastify';
import ProtuctedRoute from './Components/ProtuctedRoute/ProtuctedRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import CountryPage from './Pages/CountryPage';
import HandlingAgentsCompanyPage from './Pages/HandlingAgentsCompanyPage';
import AircraftRegistrationPage from './Pages/AircraftRegistrationPage';
import CompanyInfoPage from './Pages/CompanyInfoPage';
import AircraftSizePage from './Pages/AircraftSizePage';
>>>>>>> 2abc54ee12977f298d30bd23b0160e2bbeab55fd
const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        // { index: true, element:   < <Login /> </ProtuctedRoute> },
        //  { index: true, element: <ProtuctedRoute>  <Home/> </ProtuctedRoute>  },
        // { index: true, path: 'login', element: <Login /> },

        { path: '*', element: <NotFoundPage /> },
        {
          index: true,

          element: (
            <ProtuctedRoute>
              <CountryPage />
            </ProtuctedRoute>
          ),
        },

        {
          path: 'handlingAgentsCompany',
          element: (
            <ProtuctedRoute>
              <HandlingAgentsCompanyPage />
            </ProtuctedRoute>
          ),
        },

        {
<<<<<<< HEAD
          path: "AircraftType",
          element: (
            <ProtuctedRoute>
              <AircraftType />
=======
          path: 'aircraftRegistration',
          element: (
            <ProtuctedRoute>
              <AircraftRegistrationPage />
            </ProtuctedRoute>
          ),
        },

        {
          path: 'companyInfo',
          element: (
            <ProtuctedRoute>
              <CompanyInfoPage />
            </ProtuctedRoute>
          ),
        },
        {
          path: 'aircraftSize',
          element: (
            <ProtuctedRoute>
              <AircraftSizePage />
>>>>>>> 2abc54ee12977f298d30bd23b0160e2bbeab55fd
            </ProtuctedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <AuthContextProvider> */}
        <ToastContainer />
        <RouterProvider router={router} />
        {/* </AuthContextProvider> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
