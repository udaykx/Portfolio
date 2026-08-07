import React, {useEffect} from 'react'
import gsap from "gsap";
import {ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";


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
    
    </>
  )
  

}

export default App
