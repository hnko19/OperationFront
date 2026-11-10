import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import ProtuctedRoute from "./Components/ProtuctedRoute/ProtuctedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import CountryPage from "./Pages/Country/CountryPage";
import HandlingAgentsCompanyPage from "./Pages/HandlingAgentsCompany/HandlingAgentsCompanyPage";
import AircraftType from "./Pages/AircraftType/AircraftType";
import AircraftRegistrationPage from "./Pages/AircraftRegistration/AircraftRegistrationPage";
import CompanyInfoPage from "./Pages/CompanyInfo/CompanyInfoPage";
import AircraftSizePage from "./Pages/AircraftSize/AircraftSizePage";
import AirlineAgentPage from "./Pages/AirlineAgent/AirlineAgent";
import UserContextProvider from "./Context/UserContextProvider";
import FlightAgentPage from "./Pages/OfficerData/FlightAgentPage";
import { Login } from "./Components/Login/Login";
import OfficerFlightSearch from "./Pages/OfficerData/OfficerFlightSearch";
import OfficerDataDetailsPage from "./Pages/OfficerData/OfficerDataDetailsPage";
import FilghtNotComplate from "./Pages/OfficerData/FilghtNotComplate";
import OfficerDataPage from "./Pages/OfficerData/OfficerDataPage";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "*", element: <NotFoundPage /> },

        {
          index: true,
          element: (
            <ProtuctedRoute>
              <CountryPage />
            </ProtuctedRoute>
          ),
        },

        {
          path: "handlingAgentsCompany",
          element: (
            <ProtuctedRoute>
              <HandlingAgentsCompanyPage />
            </ProtuctedRoute>
          ),
        },

        {
          path: "AircraftType",
          element: (
            <ProtuctedRoute>
              <AircraftType />
            </ProtuctedRoute>
          ),
        },

        {
          path: "aircraftRegistration",
          element: (
            <ProtuctedRoute>
              <AircraftRegistrationPage />
            </ProtuctedRoute>
          ),
        },

        {
          path: "companyInfo",
          element: (
            <ProtuctedRoute>
              <CompanyInfoPage />
            </ProtuctedRoute>
          ),
        },

        {
          path: "aircraftSize",
          element: (
            <ProtuctedRoute>
              <AircraftSizePage />
            </ProtuctedRoute>
          ),
        },
        {
          path: "airlineAgent",
          element: (
            <ProtuctedRoute>
              <AirlineAgentPage />
            </ProtuctedRoute>
          ),
        },

        {
          path: "officerData",
          element: (
            <ProtuctedRoute>
              <OfficerDataPage />
            </ProtuctedRoute>
          ),
        },
        {
          path: "filghtNotComplate",
          element: (
            <ProtuctedRoute>
              <FilghtNotComplate />
            </ProtuctedRoute>
          ),
        },

        {
          path: "flightagentPage",
          element: (
            <ProtuctedRoute>
              <FlightAgentPage />
            </ProtuctedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <ProtuctedRoute>
              <Login />
            </ProtuctedRoute>
          ),
        },
        {
          path: "officerFlightSearch",
          element: (
            <ProtuctedRoute>
              <OfficerFlightSearch />
            </ProtuctedRoute>
          ),
        },
        {
          path: "officer-details/:id",
          element: (
            <ProtuctedRoute>
              <OfficerDataDetailsPage />
            </ProtuctedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
