import { RefObject, useEffect, useRef } from "react";

type UseInfiniteScrollTriggerParams = {
  targetRef: RefObject<Element | null>;
  enabled: boolean;
  onIntersect: () => Promise<unknown> | void;
  rootMargin?: string;
};

export function useInfiniteScrollTrigger({
  targetRef,
  enabled,
  onIntersect,
  rootMargin = "160px 0px",
}: UseInfiniteScrollTriggerParams) {
  const isRequestInFlightRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || isRequestInFlightRef.current) return;

        isRequestInFlightRef.current = true;
        Promise.resolve(onIntersect()).finally(() => {
          isRequestInFlightRef.current = false;
        });
      },
      { rootMargin }
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [enabled, onIntersect, rootMargin, targetRef]);
}
