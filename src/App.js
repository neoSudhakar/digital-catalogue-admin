import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Dashboard from "./components/menu/dashboard/Dashboard";
import MasterDesign from "./components/menu/master-design/MasterDesign";
import ViewDesign from "./components/menu/view-designs/ViewDesign";
import OrderForm from "./components/menu/order-form/OrderForm";
import Customers from "./components/menu/customers/Customers";
import "./styles.css";
import AuthForm from "./components/Register/AuthForm";
import Settings from "./components/menu/settings/Settings";

import { action as logoutAction } from "./components/Register/Logout";
import { authTokenLoader, checkAuthLoader } from "./util/auth";
import MasterCreation from "./components/menu/master-design/MasterCreation";
import CatalogueDesigns from "./components/menu/catalogue/CatalogueDesigns";

const router= createBrowserRouter([
  {
    path: "/", element:<RootLayout/>,
    id: "root",
    loader: authTokenLoader,
    children: [
      {
        index: true, element: <Dashboard/>,  loader: checkAuthLoader,
      },
      {
        path: "/master-design", element: <MasterDesign/>, loader: checkAuthLoader
      },
      {
        path: "/view-designs", element: <ViewDesign/>, loader: checkAuthLoader
      },
      {
        path: "/order-form", element: <OrderForm/>, loader: checkAuthLoader
      },
      {
        path: "/customers", element: <Customers/>, loader: checkAuthLoader
      },
      {
        path:"/auth", element:<AuthForm/>,
      },
      {
        path:"/logout", action: logoutAction,
      },
      {
        path:"/master-design/creation",  element:<MasterCreation/>, loader: checkAuthLoader
      },
      {
        path: "catalogue", element: <CatalogueDesigns/>, loader: checkAuthLoader,
      },
      {
        path: "/settings", element: <Settings/>, loader: checkAuthLoader,
      }
    ]
  },
])

export default function App() {
  return (
    <RouterProvider router={router}/>
  );
}
