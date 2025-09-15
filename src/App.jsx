import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./components/about/About";

import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import ScrollUp from "./components/scrollUp/ScrollUp";
import Aos from "aos";
import "aos/dist/aos.css";
import Payments from "./components/payment/Payments";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import PaymentDetail from "./components/payment/PaymentDetail";
import ScrollToHash from "./components/scrollToHash/ScrollToHash";
import Size from "./components/size/Size";

const App = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  const routes = createBrowserRouter([
    {
      path: "",
      element: (
        <>
          <Header />
          <ScrollToHash />
          <Outlet />
          <Footer />
          <ScrollUp />
        </>
      ),
      children: [
        {
          index: true,
          element: (
            <main className="main">
              <Home />
              <About />
              <Size />
              <Contact />
              <Payments />
            </main>
          ),
        },
        {
          path: "/payment",
          element: <PaymentDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
