import { useEffect, useRef, useState } from 'react';

export const useSmoothInfiniteScroll = (callback) => {
  const observerTarget = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          callback().finally(() => setIsLoading(false));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [callback, isLoading]);

  return { observerTarget, isLoading };
};

export default useSmoothInfiniteScroll;
