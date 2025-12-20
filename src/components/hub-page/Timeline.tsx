import React, { useRef, useState, useEffect, useCallback } from 'react';
import { timelineItems } from '@/data/hubPageContent';

const PHASE_COUNT = 5;
const MIN_OPACITY = 0.3;
const OPACITY_FADE_FACTOR = 0.7;

const Timeline: React.FC = () => {
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const sectionElementRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(0);

  // Calculate and update timeline item opacities based on scroll position
  const updateItemOpacities = useCallback((scrollContainer: HTMLDivElement) => {
    const timelineItemElements = scrollContainer.querySelectorAll('.timeline-item');
    const containerRect = scrollContainer.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;

    timelineItemElements.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      const maxDistance = containerRect.height / 2;
      
      const opacity = Math.max(MIN_OPACITY, 1 - (distance / maxDistance) * OPACITY_FADE_FACTOR);
      (item as HTMLElement).style.opacity = opacity.toString();
    });
  }, []);

  // Handle internal timeline scrolling
  useEffect(() => {
    const scrollContainer = timelineScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const maxScroll = scrollHeight - clientHeight;
      
      // Update progress bar
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      // Update active phase
      const phaseHeight = maxScroll / PHASE_COUNT;
      const currentPhase = Math.min(Math.floor(scrollTop / phaseHeight), PHASE_COUNT - 1);
      setActivePhase(currentPhase);

      // Update item opacities
      updateItemOpacities(scrollContainer);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [updateItemOpacities]);

  // Handle viewport lock/unlock behavior
  useEffect(() => {
    const section = sectionElementRef.current;
    const scrollContainer = timelineScrollRef.current;
    if (!section || !scrollContainer) return;

    let isHovering = false;
    let isLocked = false;

    const lockScroll = () => {
      if (!isLocked) {
        isLocked = true;
        document.body.style.overflow = 'hidden';
      }
    };

    const unlockScroll = () => {
      isHovering = false;
      isLocked = false;
      document.body.style.overflow = '';
    };

    // Detect when entire section is fully visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 1.0) {
            lockScroll();
          }
        });
      },
      { threshold: [1.0] }
    );

    observer.observe(section);

    const handleMouseEnter = () => {
      isHovering = true;
      lockScroll();
    };

    const handleMouseLeave = unlockScroll;

    const handleWheel = (e: WheelEvent) => {
      if (!isHovering) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const maxScroll = scrollHeight - clientHeight;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop >= maxScroll - 1;
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;

      // Unlock at boundaries to allow natural page navigation
      if ((scrollingDown && isAtBottom) || (scrollingUp && isAtTop)) {
        unlockScroll();
        return;
      }

      // Prevent page scroll, allow only timeline scroll
      e.preventDefault();
      scrollContainer.scrollTop += e.deltaY;
    };

    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      observer.disconnect();
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
    };
  }, []);

  const scrollToPhase = (phaseIndex: number) => {
    const scrollContainer = timelineScrollRef.current;
    if (!scrollContainer) return;

    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const targetScroll = (maxScroll / PHASE_COUNT) * phaseIndex;
    scrollContainer.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const getInteractiveElement = (index: number) => {
    const item = timelineItems[index];
    
    // Special interactive element for items with CTA
    if (item.hasCTA && item.ctaContent) {
      return (
        <div className="timeline-interactive-element fork-button-container">
          <div className="fork-cta-box">
            <div className="fork-icon">{item.ctaContent.emoji}</div>
            <h4>{item.ctaContent.title}</h4>
            <a href={item.ctaContent.buttonUrl} className="fork-now-button" target="_blank" rel="noopener noreferrer">
              {item.ctaContent.buttonText}
            </a>
            <p className="fork-hint">{item.ctaContent.hint}</p>
          </div>
        </div>
      );
    }
    
    // Images for other items
    return (
      <div className="timeline-interactive-element timeline-image-container">
        <div className="timeline-side-image">
          {item.emoji}
        </div>
      </div>
    );
  };

  return (
    <section className="timeline-section" ref={sectionElementRef}>
      <div className="timeline-header">
        <h2>Our Story</h2>
        <p>Scroll through the journey from frustration to action</p>
        <div className="scroll-hint">⬇ Scroll down ⬇</div>
      </div>

      <div className="timeline-content-wrapper">
        <div className="timeline-scroll-container" ref={timelineScrollRef}>
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {timelineItems.map((item, index) => {
              const isLeft = index % 2 === 0;
              const contentNode = (
                <div className="timeline-content card-dynamic">
                  <div className="timeline-icon">{item.icon}</div>
                  <div className="timeline-phase">{item.phase}</div>
                  <h3>{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                  <ul className="timeline-details">
                    {item.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>{detail}</li>
                    ))}
                  </ul>
                </div>
              );

              return (
                <div key={index} className={`timeline-item ${isLeft ? 'left' : 'right'}`}>
                  {isLeft ? (
                    <>
                      {contentNode}
                      <div className="timeline-dot"></div>
                      {getInteractiveElement(index)}
                    </>
                  ) : (
                    <>
                      {getInteractiveElement(index)}
                      <div className="timeline-dot"></div>
                      {contentNode}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Navigator */}
        <div className="timeline-progress-navigator">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ height: `${scrollProgress}%` }}
            />
          </div>
          <div className="phase-markers">
            {timelineItems.map((item, index) => (
              <button
                key={index}
                className={`phase-marker ${activePhase === index ? 'active' : ''}`}
                onClick={() => scrollToPhase(index)}
                title={item.title}
                aria-label={`Go to ${item.title}`}
              >
                <span className="phase-number">{index + 1}</span>
                <span className="phase-label">{item.phase}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
