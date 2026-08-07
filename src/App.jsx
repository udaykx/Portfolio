import React, {useEffect} from 'react'
import gsap from "gsap";
import {ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";

import Wrap from './components/Wrap/Wrap.jsx'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

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
    </>
  )
  

}

export default App
