import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Dashboard from "./components/menu/dashboard/Dashboard";
import MasterDesign from "./components/menu/master-design/MasterDesign";
import ViewDesign from "./components/menu/view-designs/ViewDesign";
import OrderForm from "./components/menu/order-form/OrderForm";
import Customers from "./components/menu/customers/Customers";
import "./styles.css";
import AuthForm from "./components/Register/AuthForm";

import { action as logoutAction } from "./components/Register/Logout";
import { authTokenLoader, checkAuthLoader, checkManufacturerAuthLoader, checkRetailerAuthLoader, getAccountLoader } from "./util/auth";
import MasterCreation from "./components/menu/master-design/MasterCreation";
import CatalogueDesigns from "./components/menu/catalogue/CatalogueDesigns";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientObj } from "./util/http";
import Settings from "./components/menu/settings/Settings";
import Reports from "./components/menu/reports/Reports";
import Orders from "./components/menu/orders/Orders";
import OrdersMenu from "./components/menu/order-form/OrdersMenu";

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
        path: "/master-design", element: <MasterDesign/>, loader: checkManufacturerAuthLoader
      },
      {
        path: "/view-designs", element: <ViewDesign/>, loader: checkManufacturerAuthLoader
      },
      {
        path: "/order-form", element: <OrdersMenu/>, loader: checkManufacturerAuthLoader
      },
      {
        path:"/auth", element:<AuthForm/>,
      },
      {
        path:"/logout", action: logoutAction,
      },
      {
        path:"/master-design/creation",  element:<MasterCreation/>, loader: checkManufacturerAuthLoader
      },
      {
        path: "catalogue", element: <CatalogueDesigns/>, loader: checkRetailerAuthLoader,
      },
      {
        path: "/settings", element:<Settings/>,
      },
      {
        path: "/reports", element: <Reports/>, loader: checkAuthLoader,
      },
      {
        path: "/orders", element: <Orders/>, loader: checkRetailerAuthLoader,
      }
    ]
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClientObj}>
        <RouterProvider router={router}/>
    </QueryClientProvider>
  );
}
