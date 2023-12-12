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
import Orders from "./components/menu/orders/Orders";
import OrdersMenu from "./components/menu/order-form/OrdersMenu";
import Reports from "./components/menu/reports/Reports";
import AccountAndUser from "./components/menu/account-and-user/AccountAndUser";
import Permissions from "./components/menu/permissions/Permissions";
import Packages from "./components/menu/packages/Packages";

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
        path: "/reports", element: <Reports/>,
      },
      {
        path: "/orders", element: <Orders/>, loader: checkRetailerAuthLoader,
      },
      {
        path: "/account-and-user", element: <AccountAndUser/>, loader: checkRetailerAuthLoader,
      },
      {
        path: "/permissions", element: <Permissions/>, loader: checkRetailerAuthLoader,
      },
      {
        path: "/packages", element: <Packages/>, loader: checkRetailerAuthLoader,
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
