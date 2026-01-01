'use client';
import { usePathname } from 'next/navigation';
import { memo, useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const TypedText: React.FC = memo(() => {
  const el = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const [typed, setTyped] = useState<Typed | null>(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Skip animation on subsequent renders to prevent lag
    if (!isFirstRender) {
      if (el.current) {
        el.current.textContent = `[dh ~${pathname}]$`;
      }
      return;
    }

    if (typed) {
      typed.destroy();
    }

    const newTyped = new Typed(el.current, {
      strings: [`[dh ~${pathname}]$`],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 300,
      smartBackspace: true,
      showCursor: false,
      onComplete: () => {
        setIsFirstRender(false);
      },
    });

    setTyped(newTyped);

    return () => {
      newTyped.destroy();
    };
  }, [pathname, isFirstRender]);

  return <span ref={el} />;
});

TypedText.displayName = 'TypedText';

export default TypedText;
