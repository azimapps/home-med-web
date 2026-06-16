"use client";

import { useEffect } from "react";

function formatCount(target: number): string {
  if (target % 1 !== 0) return target.toFixed(1);
  return Math.round(target).toLocaleString("en-US").replace(/,/g, " ");
}

export default function RevealController() {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let stats = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]")
    );

    const animated = new WeakSet<HTMLElement>();

    function animateCount(el: HTMLElement) {
      if (animated.has(el)) return;
      animated.add(el);
      const target = parseFloat(el.getAttribute("data-count") || "0");
      const suffix = el.getAttribute("data-suffix") || "";
      if (reduce) {
        el.textContent = formatCount(target) + suffix;
        return;
      }
      const dur = 1400;
      let start: number | null = null;
      function step(ts: number) {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        const out =
          target % 1 !== 0
            ? val.toFixed(1)
            : Math.round(val).toLocaleString("en-US").replace(/,/g, " ");
        el.textContent = out + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    let ticking = false;
    function check() {
      ticking = false;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (let i = reveals.length - 1; i >= 0; i--) {
        const r = reveals[i];
        if (r.getBoundingClientRect().top < vh * 0.92) {
          r.classList.add("in");
          reveals.splice(i, 1);
        }
      }
      for (let j = stats.length - 1; j >= 0; j--) {
        const s = stats[j];
        if (s.getBoundingClientRect().top < vh * 0.95) {
          animateCount(s);
          stats.splice(j, 1);
        }
      }
    }
    function onTick() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    }
    check();
    window.addEventListener("scroll", onTick, { passive: true });
    window.addEventListener("resize", onTick);
    window.addEventListener("load", check);
    return () => {
      window.removeEventListener("scroll", onTick);
      window.removeEventListener("resize", onTick);
      window.removeEventListener("load", check);
    };
  }, []);

  return null;
}
