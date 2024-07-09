// HoverMe.js
import React, { useEffect } from 'react';
import './HoverMe.css';
import AnimatedCursor from './AnimatedCursor';

const HoverMe = () => {
  useEffect(() => {
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }

    const cursor = document.getElementById("cursor");
    const amount = 20;
    const sineDots = Math.floor(amount * 0.3);
    const width = 26;
    const idleTimeout = 150;
    let lastFrame = 0;
    let mousePosition = { x: 0, y: 0 };
    let dots = [];
    let timeoutID;
    let idle = false;
    let hoverButton;
    let hoverTL;

    class HoverButton {
      constructor(id) {
        _defineProperty(this, "onMouseEnter", this.onMouseEnter.bind(this));
        _defineProperty(this, "onMouseLeave", this.onMouseLeave.bind(this));
        this.button = document.getElementById(id);
        this.button.addEventListener('mouseenter', this.onMouseEnter);
        this.button.addEventListener('mouseleave', this.onMouseLeave);
        this.hoverTL = gsap.timeline({ paused: true });
        this.hoverTL.to(this.button.querySelector('.bg'), { duration: 0.6, x: 0, ease: 'power3.inOut' }, 0);
        this.hoverTL.to(this.button.querySelector('h1'), { duration: 0.3, x: 10, ease: 'power3.inOut' }, 0);
      }

      onMouseEnter() {
        this.hoverTL.play();
      }

      onMouseLeave() {
        this.hoverTL.reverse();
      }
    }

    const initCursor = () => {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });

      const mouseMove = (e) => {
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;
        gsap.to(cursor, { x: mousePosition.x, y: mousePosition.y, duration: 0.6, ease: 'power3.out' });
      };

      document.addEventListener('mousemove', mouseMove);

      hoverButton = new HoverButton('button');
    };

    initCursor();
  }, []);

  return (
    <div className="page">
      <AnimatedCursor />
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className="page-bg">
        <p>M</p>
        <div className="noise"></div>
      </div>
      <div className="lines">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
        <div className="line4"></div>
        <div className="line5"></div>
      </div>
      <div className="container">
        <div className="child">
          <div className="content">
            <div>
              <div id="button" className="HoverButton">
                <div className="bg"></div>
                <h1>Hover Me</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="images">
        <img src="https://foo-exp.s3.amazonaws.com/morph_mouse/img_big.png" className="big" id="bigImg" alt="big" />
        <img src="https://foo-exp.s3.amazonaws.com/morph_mouse/img_small.png" className="small" id="smallImg" alt="small" />
      </div>
      <div className="stamp">
        <div className="circle">
          <p id="circle-content">EXPERIMENTS . EXPERIMENTS .</p>
        </div>
        <p>2018</p>
      </div>
      <div className="design">
        <p>Best viewed on Chrome</p>
        <a href="https://dribbble.com/eaamst" target="_blank" rel="noopener noreferrer">Designed by: Eder Anaya</a>
      </div>
      <div id="cursor" className="Cursor">
        <span></span>
      </div>
    </div>
  );
};

export default HoverMe;
