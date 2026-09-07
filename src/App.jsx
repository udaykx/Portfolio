import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";

import Wrap from './components/Wrap/Wrap.jsx'
import Cursor from "./ui/cursor/Cursor.jsx";
import Navbar from "./components/NavBar/NavBar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import WhoAmI from "./components/WhoAmI/WhoAmI.jsx";
import Experience from "./components/Experience/Experience.jsx";
import TechStack from "./components/TechStack/TechStack";
import Projects from "./components/Projects.jsx/Projects.jsx";
import Certifications from "./components/Certifications/Certifications.jsx";
import Contact from "./components/Contact/Contact.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const App = () => {
  useEffect(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
      normalizeScroll: true,
    });

    ScrollTrigger.refresh();
  }, []);

  return(
    <>
    <Wrap/>
    <Cursor/>
    <div id="smooth-wrapper">
      <Navbar/>
      <div id="smooth-content">
        <Hero />
        <WhoAmI />
        <Experience />
        <TechStack />
        <Projects />
        <Certifications />
        <Contact />
      </div>
    </div>
    </>
  )
  

};

export default App;
