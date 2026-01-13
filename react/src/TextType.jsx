import React, { useState, useEffect, useRef } from 'react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
  }

  .timeline-container {
    min-height: 80vh;
    background: linear-gradient(to bottom, #020617, #0f172a, #020617);
    position: relative;
    overflow: hidden;
  }

  .bg-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.3;
    pointer-events: none;
    animation: pulse 4s ease-in-out infinite;
  }

  .bg-orb-1 {
    top: 25%;
    left: -12rem;
    width: 24rem;
    height: 24rem;
    background: rgba(59, 130, 246, 0.4);
  }

  .bg-orb-2 {
    bottom: 25%;
    right: -12rem;
    width: 24rem;
    height: 24rem;
    background: rgba(168, 85, 247, 0.4);
    animation-delay: 1s;
  }

  .bg-orb-3 {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24rem;
    height: 24rem;
    background: rgba(236, 72, 153, 0.2);
    animation-delay: 2s;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.4;
    }
  }

  .content-wrapper {
    position: relative;
    z-index: 10;
    padding: 5rem 1rem;
    max-width: 90rem;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 8rem;
  }

  .header-badge {
    display: inline-block;
    padding: 0.5rem 1.5rem;
    background: linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2));
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 9999px;
    backdrop-filter: blur(10px);
    margin-bottom: 1.5rem;
  }

  .header-badge-text {
    color: #60a5fa;
    font-weight: 600;
    letter-spacing: 0.1em;
    font-size: 0.875rem;
  }

  .header-title {
    font-size: 4rem;
    font-weight: bold;
    background: linear-gradient(to right, #60a5fa, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 1.5rem;
    animation: titlePulse 3s ease-in-out infinite;
  }

  @keyframes titlePulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  .header-subtitle {
    color: #94a3b8;
    font-size: 1.25rem;
    max-width: 42rem;
    margin: 0 auto;
    line-height: 1.75;
  }

  .timeline-wrapper {
    position: relative;
  }

  .timeline-line-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
  }

  .timeline-line-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent, #334155, transparent);
  }

  .timeline-line-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to bottom, #3b82f6, #a855f7, #ec4899);
    transition: height 0.3s ease-out;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }

  .timeline-item {
    display: flex;
    gap: 0;
    margin-bottom: 8rem;
    position: relative;
    align-items: center;
  }

  .timeline-content {
    width: 41.666667%;
    padding: 0 3rem;
  }

  .timeline-content-left {
    padding-right: 3rem;
    padding-left: 0;
  }

  .timeline-content-right {
    padding-left: 3rem;
    padding-right: 0;
    order: 3;
  }

  .timeline-card-wrapper {
    position: relative;
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  .timeline-card-wrapper.visible {
    opacity: 1;
    transform: translateX(0) !important;
  }

  .timeline-card-wrapper.hidden-left {
    transform: translateX(-5rem);
  }

  .timeline-card-wrapper.hidden-right {
    transform: translateX(5rem);
  }

  .timeline-card-glow {
    position: absolute;
    inset: -4px;
    background: linear-gradient(to right, #2563eb, #9333ea, #ec4899);
    border-radius: 1rem;
    opacity: 0;
    filter: blur(20px);
    transition: opacity 0.5s;
  }

  .timeline-card-wrapper:hover .timeline-card-glow {
    opacity: 0.75;
  }

  .timeline-card {
    position: relative;
    background: linear-gradient(to bottom right, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9));
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    padding: 2rem;
    border: 1px solid rgba(71, 85, 105, 0.5);
    transition: all 0.5s;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .timeline-card-wrapper:hover .timeline-card {
    border-color: rgba(59, 130, 246, 0.5);
  }

  .timeline-card-accent {
    position: absolute;
    top: 0;
    right: 0;
    width: 8rem;
    height: 8rem;
    background: linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), transparent);
    border-radius: 0 1rem 0 100%;
    opacity: 0;
    transform: scale(1);
    transition: all 0.7s;
  }

  .timeline-card-wrapper:hover .timeline-card-accent {
    opacity: 1;
    transform: scale(1.5);
  }

  .timeline-icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.75rem;
    background: linear-gradient(to bottom right, #3b82f6, #9333ea);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    transition: all 0.5s;
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.5);
    position: relative;
    z-index: 10;
  }

  .timeline-card-wrapper:hover .timeline-icon {
    transform: rotate(12deg) scale(1.1);
  }

  .timeline-year-badge {
    display: inline-block;
    padding: 0.25rem 1rem;
    border-radius: 9999px;
    background: rgba(59, 130, 246, 0.2);
    border: 1px solid rgba(59, 130, 246, 0.3);
    margin-bottom: 1rem;
  }

  .timeline-year {
    color: #60a5fa;
    font-size: 0.875rem;
    font-weight: bold;
    letter-spacing: 0.05em;
  }

  .timeline-title {
    font-size: 1.875rem;
    font-weight: bold;
    color: white;
    margin-bottom: 1rem;
    transition: all 0.5s;
    position: relative;
    z-index: 10;
  }

  .timeline-card-wrapper:hover .timeline-title {
    background: linear-gradient(to right, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .timeline-description {
    color: #94a3b8;
    font-size: 1rem;
    line-height: 1.75;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 10;
  }

  .timeline-image-container {
    border-radius: 0.75rem;
    overflow: hidden;
    position: relative;
  }

  .timeline-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.6), transparent);
    z-index: 10;
  }

  .timeline-image {
    width: 100%;
    height: 14rem;
    object-fit: cover;
    transition: transform 0.7s;
  }

  .timeline-card-wrapper:hover .timeline-image {
    transform: scale(1.1);
  }

  .timeline-image-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, 
      rgba(59, 130, 246, 0), 
      rgba(59, 130, 246, 0.2), 
      rgba(59, 130, 246, 0)
    );
    transform: translateX(-100%);
    transition: transform 1s;
  }

  .timeline-card-wrapper:hover .timeline-image-shimmer {
    transform: translateX(100%);
  }

  .timeline-center {
    width: 16.666667%;
    display: flex;
    justify-content: center;
    position: relative;
    order: 2;
  }

  .timeline-connector {
    position: absolute;
    top: 50%;
    width: 50%;
    height: 2px;
    background: linear-gradient(to right, rgba(59, 130, 246, 0.5), transparent);
    transition: all 1s;
    transform: scaleX(0);
  }

  .timeline-connector.visible {
    transform: scaleX(1);
  }

  .timeline-connector-left {
    left: 0;
    transform-origin: right;
  }

  .timeline-connector-right {
    right: 0;
    transform-origin: left;
    background: linear-gradient(to left, rgba(59, 130, 246, 0.5), transparent);
  }

  .timeline-dot-container {
    position: relative;
  }

  .timeline-dot {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: linear-gradient(to bottom right, #3b82f6, #9333ea);
    position: relative;
    z-index: 20;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
    transition: all 0.7s;
    transform: scale(0) rotate(180deg);
  }

  .timeline-dot.visible {
    transform: scale(1) rotate(0deg);
  }

  .timeline-card-wrapper:hover ~ .timeline-center .timeline-dot,
  .timeline-center:has(~ .timeline-content .timeline-card-wrapper:hover) .timeline-dot {
    transform: scale(1.5) rotate(0deg);
  }

  .timeline-dot-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #3b82f6;
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    opacity: 0.75;
  }

  @keyframes ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .timeline-dot-ring-2 {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #9333ea;
    animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    opacity: 0.5;
  }

  @keyframes pulse-ring {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.8;
    }
  }

  .timeline-dot-outer {
    position: absolute;
    inset: -0.75rem;
    border-radius: 50%;
    border: 2px solid rgba(96, 165, 250, 0.3);
    transition: all 0.5s;
  }

  .timeline-card-wrapper:hover ~ .timeline-center .timeline-dot-outer,
  .timeline-center:has(~ .timeline-content .timeline-card-wrapper:hover) .timeline-dot-outer {
    transform: scale(1.5);
    opacity: 0;
  }

  .timeline-spacer {
    width: 41.666667%;
  }

  .timeline-spacer-left {
    order: 3;
  }

  .timeline-spacer-right {
    order: 1;
    padding-right: 3rem;
  }

  .footer-cta {
    text-align: center;
    margin-top: 8rem;
    padding-bottom: 5rem;
  }

  .cta-button-wrapper {
    display: inline-block;
    position: relative;
    cursor: pointer;
  }

  .cta-button-glow {
    position: absolute;
    inset: -4px;
    background: linear-gradient(to right, #2563eb, #9333ea);
    border-radius: 9999px;
    opacity: 0.75;
    filter: blur(10px);
    transition: all 0.5s;
  }

  .cta-button-wrapper:hover .cta-button-glow {
    opacity: 1;
  }

  .cta-button {
    position: relative;
    padding: 1rem 3rem;
    background: #0f172a;
    border-radius: 9999px;
    color: white;
    font-weight: 600;
    font-size: 1.125rem;
    border: 1px solid #334155;
    transition: all 0.5s;
    cursor: pointer;
  }

  .cta-button-wrapper:hover .cta-button {
    transform: scale(1.05);
    border-color: transparent;
  }

  @media (max-width: 768px) {
    .header-title {
      font-size: 2.5rem;
    }

    .timeline-item {
      flex-direction: column;
      margin-bottom: 4rem;
    }

    .timeline-content,
    .timeline-center,
    .timeline-spacer {
      width: 100%;
    }

    .timeline-content-left,
    .timeline-content-right {
      order: 1;
      padding: 0 1rem;
    }

    .timeline-center {
      order: 2;
      margin: 1rem 0;
    }

    .timeline-spacer {
      display: none;
    }

    .timeline-line-container {
      left: 1rem;
    }
  }
`;

const TimelineItem = ({ year, title, description, image, index, icon }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [index]);

  const isLeft = index % 2 === 0;

  return (
    <div ref={itemRef} className="timeline-item">
      <div className={`timeline-content ${isLeft ? 'timeline-content-left' : 'timeline-content-right'}`}>
        <div 
          className={`timeline-card-wrapper ${isVisible ? 'visible' : isLeft ? 'hidden-left' : 'hidden-right'}`}
          style={{ transitionDelay: `${index * 100}ms` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="timeline-card-glow"></div>
          
          <div className="timeline-card">
            <div className="timeline-card-accent"></div>
            
            <div className="timeline-icon">{icon}</div>
            
            <div className="timeline-year-badge">
              <span className="timeline-year">{year}</span>
            </div>
            
            <h3 className="timeline-title">{title}</h3>
            
            <p className="timeline-description">{description}</p>
            
            {image && (
              <div className="timeline-image-container">
                <div className="timeline-image-overlay"></div>
                <img src={image} alt={title} className="timeline-image" />
                <div className="timeline-image-shimmer"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="timeline-center">
        <div className={`timeline-connector ${isLeft ? 'timeline-connector-left' : 'timeline-connector-right'} ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: `${index * 100 + 300}ms` }}
        ></div>
        
        <div className="timeline-dot-container">
          <div className={`timeline-dot ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 100 + 400}ms` }}
          >
            <div className="timeline-dot-ring"></div>
            <div className="timeline-dot-ring-2"></div>
            <div className="timeline-dot-outer"></div>
          </div>
        </div>
      </div>

      <div className={`timeline-spacer ${isLeft ? 'timeline-spacer-left' : 'timeline-spacer-right'}`}></div>
    </div>
  );
};

const Timeline = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        const height = rect.height - window.innerHeight;
        const progress = Math.min(Math.max(scrolled / height, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineData = [
    {
      year: "2024",
      title: "AI Revolution",
      description: "Advanced artificial intelligence systems become mainstream, transforming how we work and create. Machine learning models achieve unprecedented accuracy in natural language processing and creative tasks.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      icon: "🤖"
    },
    {
      year: "2023",
      title: "Quantum Leap",
      description: "Breakthrough in quantum computing enables solving previously impossible problems. New algorithms revolutionize cryptography, drug discovery, and climate modeling with exponential processing power.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
      icon: "⚛️"
    },
    {
      year: "2022",
      title: "Metaverse Expansion",
      description: "Virtual and augmented reality merge into immersive digital experiences. The metaverse becomes a new frontier for social interaction, commerce, and creative expression.",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80",
      icon: "🌐"
    },
    {
      year: "2021",
      title: "Green Energy",
      description: "Revolutionary advances in solar and battery technology make renewable energy more efficient and accessible. Smart grids and energy storage systems transform power distribution worldwide.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      icon: "⚡"
    },
    {
      year: "2020",
      title: "Space Commerce",
      description: "Private companies establish permanent presence in orbit. Commercial space stations and lunar missions open new frontiers for research, tourism, and resource exploration.",
      image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80",
      icon: "🚀"
    }
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="timeline-container">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>

        <div className="content-wrapper">
          <div className="header">
            <div className="header-badge">
              <span className="header-badge-text">OUR STORY</span>
            </div>
            <h1 className="header-title">Journey Through Time</h1>
            <p className="header-subtitle">
              Explore the milestones that shaped our innovation and defined the future
            </p>
          </div>

          <div ref={timelineRef} className="timeline-wrapper">
            <div className="timeline-line-container">
              <div className="timeline-line-bg"></div>
              <div 
                className="timeline-line-progress"
                style={{ height: `${scrollProgress * 100}%` }}
              ></div>
            </div>
            
            {timelineData.map((item, index) => (
              <TimelineItem key={index} {...item} index={index} />
            ))}
          </div>

          <div className="footer-cta">
            <div className="cta-button-wrapper">
              <div className="cta-button-glow"></div>
              <button className="cta-button">Explore More Stories</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;




// 'use client';

// import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
// import { gsap } from 'gsap';
// import './TextType.css';

// const TextType = ({
//   text,
//   as: Component = 'div',
//   typingSpeed = 50,
//   initialDelay = 0,
//   pauseDuration = 2000,
//   deletingSpeed = 30,
//   loop = true,
//   className = '',
//   showCursor = true,
//   hideCursorWhileTyping = false,
//   cursorCharacter = '|',
//   cursorClassName = '',
//   cursorBlinkDuration = 0.5,
//   textColors = [],
//   variableSpeed,
//   onSentenceComplete,
//   startOnVisible = false,
//   reverseMode = false,
//   ...props
// }) => {
//   const [displayedText, setDisplayedText] = useState('');
//   const [currentCharIndex, setCurrentCharIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [currentTextIndex, setCurrentTextIndex] = useState(0);
//   const [isVisible, setIsVisible] = useState(!startOnVisible);
//   const cursorRef = useRef(null);
//   const containerRef = useRef(null);

//   const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

//   const getRandomSpeed = useCallback(() => {
//     if (!variableSpeed) return typingSpeed;
//     const { min, max } = variableSpeed;
//     return Math.random() * (max - min) + min;
//   }, [variableSpeed, typingSpeed]);

//   const getCurrentTextColor = () => {
//     if (textColors.length === 0) return;
//     return textColors[currentTextIndex % textColors.length];
//   };

//   useEffect(() => {
//     if (!startOnVisible || !containerRef.current) return;

//     const observer = new IntersectionObserver(
//       entries => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     observer.observe(containerRef.current);
//     return () => observer.disconnect();
//   }, [startOnVisible]);

//   useEffect(() => {
//     if (showCursor && cursorRef.current) {
//       gsap.set(cursorRef.current, { opacity: 1 });
//       gsap.to(cursorRef.current, {
//         opacity: 0,
//         duration: cursorBlinkDuration,
//         repeat: -1,
//         yoyo: true,
//         ease: 'power2.inOut'
//       });
//     }
//   }, [showCursor, cursorBlinkDuration]);

//   useEffect(() => {
//     if (!isVisible) return;

//     let timeout;
//     const currentText = textArray[currentTextIndex];
//     const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

//     const executeTypingAnimation = () => {
//       if (isDeleting) {
//         if (displayedText === '') {
//           setIsDeleting(false);
//           if (currentTextIndex === textArray.length - 1 && !loop) {
//             return;
//           }

//           if (onSentenceComplete) {
//             onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
//           }

//           setCurrentTextIndex(prev => (prev + 1) % textArray.length);
//           setCurrentCharIndex(0);
//           timeout = setTimeout(() => {}, pauseDuration);
//         } else {
//           timeout = setTimeout(() => {
//             setDisplayedText(prev => prev.slice(0, -1));
//           }, deletingSpeed);
//         }
//       } else {
//         if (currentCharIndex < processedText.length) {
//           timeout = setTimeout(
//             () => {
//               setDisplayedText(prev => prev + processedText[currentCharIndex]);
//               setCurrentCharIndex(prev => prev + 1);
//             },
//             variableSpeed ? getRandomSpeed() : typingSpeed
//           );
//         } else if (textArray.length >= 1) {
//           if (!loop && currentTextIndex === textArray.length - 1) return;
//           timeout = setTimeout(() => {
//             setIsDeleting(true);
//           }, pauseDuration);
//         }
//       }
//     };

//     if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
//       timeout = setTimeout(executeTypingAnimation, initialDelay);
//     } else {
//       executeTypingAnimation();
//     }

//     return () => clearTimeout(timeout);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     currentCharIndex,
//     displayedText,
//     isDeleting,
//     typingSpeed,
//     deletingSpeed,
//     pauseDuration,
//     textArray,
//     currentTextIndex,
//     loop,
//     initialDelay,
//     isVisible,
//     reverseMode,
//     variableSpeed,
//     onSentenceComplete
//   ]);

//   const shouldHideCursor =
//     hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

//   return createElement(
//     Component,
//     {
//       ref: containerRef,
//       className: `text-type ${className}`,
//       ...props
//     },
//     <span className="text-type__content" style={{ color: getCurrentTextColor() || 'inherit' }}>
//       {displayedText}
//     </span>,
//     showCursor && (
//       <span
//         ref={cursorRef}
//         className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
//       >
//         {cursorCharacter}
//       </span>
//     )
//   );
// };

// export default TextType;
