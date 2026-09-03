import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastContainer } from 'react-toastify';
import ProtuctedRoute from './Components/ProtuctedRoute/ProtuctedRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import CountryPage from './Pages/CountryPage';
import HandlingAgentsCompanyPage from './Pages/HandlingAgentsCompanyPage';
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
          path: 'countryPage',
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
