import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Login from "./Pages/Login/Login";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        // { index: true, element:   < <Login /> </ProtuctedRoute> },
        // { index: true, element: <ProtuctedRoute>  <Home/> </ProtuctedRoute>  },
        { path: "login", element: <Login /> },

        { path: "*", element: <NotFoundPage /> },
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
