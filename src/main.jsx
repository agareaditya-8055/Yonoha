import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/header/about/About";
import Error from "./components/errorPage/Error";
import Body from "./components/body/Body";
import RestaurantMenu from "./components/body/resMenu/RestaurantMenu";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Signin from "./components/body/signin/Signin";
import Signup from "./components/body/signup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const show = ReactDOM.createRoot(document.getElementById("root"));

const Cart = lazy(() => import("./components/header/navItems/cart/Cart"));

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<h1>Loading.....</h1>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
    errorElement: <Error />,
  },
]);

show.render(
  <Provider store={appStore}>
    <ToastContainer
      position="top-center"
      theme="colored"
      autoClose={2500}
      bodyClassName="toastBody"
    />
    <RouterProvider router={appRoute} />
  </Provider>
);
