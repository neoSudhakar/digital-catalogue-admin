import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Dashboard from "./components/menu/dashboard/Dashboard";
import MasterDesign from "./components/menu/master-design/MasterDesign";
import ViewDesign from "./components/menu/view-designs/ViewDesign";
import OrderForm from "./components/menu/order-form/OrderForm";
import Customers from "./components/menu/customers/Customers";
import "./styles.css";
import AuthForm from "./components/Register/AuthForm";
import { ToastProvider, useToasts } from 'react-toast-notifications';

import { action as logoutAction } from "./components/Register/Logout";
import { authTokenLoader } from "./util/auth";
import MasterCreation from "./components/menu/master-design/MasterCreation";

const router= createBrowserRouter([
  {
    path: "/", element:<RootLayout/>,
    id: "root",
    loader: authTokenLoader,
    children: [
      {
        index: true, element: <Dashboard/>,
      },
      {
        path: "/master-design", element: <MasterDesign/>,
      },
      {
        path: "/view-designs", element: <ViewDesign/>,
      },
      {
        path: "/order-form", element: <OrderForm/>,
      },
      {
        path: "/customers", element: <Customers/>,
      },
      {
        path:"/auth", element:<AuthForm/>,
      },
      {
        path:"/logout", action: logoutAction,
      },
      {
        path:"/master-design/creation",  element:<MasterCreation/>,
      },
    ]
  },
])

export default function App() {
  return (    
    <RouterProvider router={router}/>   
  );
}
