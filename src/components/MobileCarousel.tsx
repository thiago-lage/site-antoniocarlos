import { Children, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface Props {
  /** Layout classes used on tablet/desktop; below 640px the same element becomes a swipe carousel. */
  className?: string;
  /** Color classes for the dots (they use currentColor). */
  dotsClassName?: string;
  label: string;
  children: ReactNode;
}

/** Swipeable carousel on phones (CSS scroll-snap + dots); plain children layout from 640px up. */
export const MobileCarousel = ({ className = '', dotsClassName = '', label, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  const onScroll = () => {
    const scroller = ref.current;
    if (!scroller) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = 0, bestDistance = Infinity;
    Array.from(scroller.children).forEach((child, index) => {
      const el = child as HTMLElement;
      const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (distance < bestDistance) { best = index; bestDistance = distance; }
    });
    setActive(best);
  };

  const goTo = (index: number) => {
    const scroller = ref.current;
    const el = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !el) return;
    scroller.scrollTo({ left: el.offsetLeft - (scroller.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <>
      <div ref={ref} className={`m-carousel ${className}`} onScroll={onScroll} role="group" aria-roledescription="carrossel" aria-label={label}>
        {children}
      </div>
      <div className={`m-carousel-dots ${dotsClassName}`}>
        {Array.from({ length: count }, (_, index) => (
          <button key={index} type="button" aria-label={`${label}: item ${index + 1} de ${count}`} aria-current={active === index} onClick={() => goTo(index)} />
        ))}
      </div>
    </>
  );
};
