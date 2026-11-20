import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

export interface UseCarouselScrollReturn {
  trackRef: RefObject<HTMLDivElement | null>;
  prevBtnRef: RefObject<HTMLButtonElement | null>;
  nextBtnRef: RefObject<HTMLButtonElement | null>;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  statusText: string;
  scrollByStep: (direction: -1 | 1) => void;
}

export function useCarouselScroll(itemCount: number): UseCarouselScrollReturn {
  const trackRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const pendingIndexRef = useRef<number | null>(null);
  const settledIndexRef = useRef<number>(0);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(itemCount > 1);
  const [statusText, setStatusText] = useState("");

  const getNearestSlideIndex = useCallback((track: HTMLDivElement): number => {
    const slides = Array.from(track.children) as HTMLElement[];
    if (slides.length === 0) return 0;

    const baseOffset = slides[0].offsetLeft;
    let nearestIdx = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < slides.length; i += 1) {
      const slideStart = slides[i].offsetLeft - baseOffset;
      const distance = Math.abs(track.scrollLeft - slideStart);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIdx = i;
      }
    }
    return nearestIdx;
  }, []);

  const syncScrollControls = useCallback(
    (announceChange: boolean) => {
      const track = trackRef.current;
      if (!track) return;

      const nextCanPrev = track.scrollLeft > 2;
      const nextCanNext =
        track.scrollLeft + track.clientWidth < track.scrollWidth - 2;

      if (
        !nextCanPrev &&
        typeof document !== "undefined" &&
        document.activeElement === prevBtnRef.current &&
        nextCanNext
      ) {
        nextBtnRef.current?.focus();
      } else if (
        !nextCanNext &&
        typeof document !== "undefined" &&
        document.activeElement === nextBtnRef.current &&
        nextCanPrev
      ) {
        prevBtnRef.current?.focus();
      }

      setCanScrollPrev(nextCanPrev);
      setCanScrollNext(nextCanNext);

      const currentIdx = getNearestSlideIndex(track);
      if (announceChange) {
        pendingIndexRef.current = null;
        if (currentIdx !== settledIndexRef.current && itemCount > 0) {
          settledIndexRef.current = currentIdx;
          setStatusText(`Producto ${currentIdx + 1} de ${itemCount}`);
        }
      } else {
        settledIndexRef.current = currentIdx;
      }
    },
    [getNearestSlideIndex, itemCount],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    syncScrollControls(false);

    let scrollTimer: ReturnType<typeof setTimeout> | undefined;
    const supportsScrollEnd =
      typeof window !== "undefined" && "onscrollend" in window;

    const handleScrollEnd = () => {
      syncScrollControls(true);
    };

    const handleDebouncedScroll = () => {
      if (scrollTimer !== undefined) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(() => {
        syncScrollControls(true);
      }, 150);
    };

    if (supportsScrollEnd) {
      track.addEventListener("scrollend", handleScrollEnd, { passive: true });
    } else {
      track.addEventListener("scroll", handleDebouncedScroll, { passive: true });
    }

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            syncScrollControls(false);
          })
        : null;
    resizeObserver?.observe(track);

    return () => {
      if (supportsScrollEnd) {
        track.removeEventListener("scrollend", handleScrollEnd);
      } else {
        track.removeEventListener("scroll", handleDebouncedScroll);
      }
      if (scrollTimer !== undefined) {
        clearTimeout(scrollTimer);
      }
      resizeObserver?.disconnect();
    };
  }, [syncScrollControls, itemCount]);

  const scrollByStep = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;

      const slides = Array.from(track.children) as HTMLElement[];
      if (slides.length === 0) return;

      const currentIdx =
        pendingIndexRef.current !== null
          ? pendingIndexRef.current
          : getNearestSlideIndex(track);
      const targetIdx = Math.max(
        0,
        Math.min(slides.length - 1, currentIdx + direction),
      );
      pendingIndexRef.current = targetIdx;

      const baseOffset = slides[0].offsetLeft;
      const targetOffset = slides[targetIdx].offsetLeft - baseOffset;
      const delta = targetOffset - track.scrollLeft;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      track.scrollBy({
        left: delta,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [getNearestSlideIndex],
  );

  return {
    trackRef,
    prevBtnRef,
    nextBtnRef,
    canScrollPrev,
    canScrollNext,
    statusText,
    scrollByStep,
  };
}
