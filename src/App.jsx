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

    // Tambahkan script Pixel ke <head>
    const script = document.createElement("script");
    script.innerHTML = `
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );
      fbq("init", "1593896754910524");
      fbq("track", "PageView");
    `;
    document.head.appendChild(script);

    // Tambahkan fallback <noscript>
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=1593896754910524&ev=PageView&noscript=1"
      />
    `;
    document.body.appendChild(noscript);
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <ScrollToHash />
          <Outlet />
          <Footer />
          <ScrollUp />
        </>
      ),
      errorElement: (
        <div style={{ padding: 40 }}>⚠️ Terjadi error di route!</div>
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
