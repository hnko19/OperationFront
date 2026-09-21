import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import ProtuctedRoute from './Components/ProtuctedRoute/ProtuctedRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import CountryPage from './Pages/Country/CountryPage';
import HandlingAgentsCompanyPage from './Pages/HandlingAgentsCompany/HandlingAgentsCompanyPage';
import AircraftType from './Pages/AircraftType/AircraftType';
import AircraftRegistrationPage from './Pages/AircraftRegistration/AircraftRegistrationPage';
import CompanyInfoPage from './Pages/CompanyInfo/CompanyInfoPage';
import AircraftSizePage from './Pages/AircraftSize/AircraftSizePage';
import AirlineAgentPage from './Pages/AirlineAgent/AirlineAgent';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
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
          path: 'AircraftType',
          element: (
            <ProtuctedRoute>
              <AircraftType />
            </ProtuctedRoute>
          ),
        },

        {
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
            </ProtuctedRoute>
          ),
        },
        {
          path: 'airlineAgent',
          element: (
            <ProtuctedRoute>
              <AirlineAgentPage />
            </ProtuctedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
