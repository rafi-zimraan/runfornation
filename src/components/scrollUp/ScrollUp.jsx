import React, { useEffect } from "react";
import "../../App.css";

const ScrollUp = () => {
  useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector(".scrollup");
      if (!el) return;
      if (window.scrollY > 400) el.classList.add("show-scroll");
      else el.classList.remove("show-scroll");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a href="#home" className="scrollup" aria-label="Scroll to top">
      <i className="uil uil-arrow-up scrollup__icon"></i>
    </a>
  );
};

export default ScrollUp;
