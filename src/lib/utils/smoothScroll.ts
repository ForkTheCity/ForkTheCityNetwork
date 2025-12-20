// Smooth scroll utility for anchor links
export const setupSmoothScroll = () => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLAnchorElement;
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(target.getAttribute('href')!);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  document.addEventListener('click', handleClick);
  
  return () => document.removeEventListener('click', handleClick);
};
