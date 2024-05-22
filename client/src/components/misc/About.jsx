import React , { useEffect } from 'react';
import "./About.scss";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {FaLinkedin, FaGithub} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useEffect(() => {
        const textElements = gsap.utils.toArray('.about-text');
    
        textElements.forEach((text) => {
          gsap.to(text, {
            backgroundSize: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: text,
              start: 'center 80%',
              end: 'center 20%',
              scrub: true,
            },
          });
        });
     
      }, []);
    
  return (
    <div className='abtmc'>
      <div className='cardabt'>
      </div>
      <p className='abtp'>Sneakerhead. is a Project by Sujay Arun Panda</p>
    <div class="containerabt">
  <h1 class="textabt about-text">It's a Cool<span id='spanabt'>0°C</span></h1>
  <h1 class="textabt about-text">Shoe Store<span id='spanabt'>it's not</span></h1>
  <h1 class="textabt about-text">CRAZYY RIGHT?<span id='spanabt'>You are Crazier</span></h1>
  <h1 class="textabt about-text">HOVER ON ME<span id='spanabt'><a id='abta' href="https://github.com/Sujayz22" target="_blank">SOURCE<FaGithub style={{ padding: '15px' }} /></a></span></h1>
  <h1 class="textabt about-text">LIKE THIS?<span id='spanabt'><a id='abta' href="https://www.linkedin.com/in/sujaypandajsx/" target="_blank">CONNECT<FaLinkedin style={{ padding: '15px' }} /></a></span></h1>
</div></div>
  );
};

export default About;
