import { useEffect, useState } from "react";

/**
 * Returns true when the user has expressed a preference for reduced motion
 * (`prefers-reduced-motion: reduce`). Returns false on the server and during
 * the first client render, then updates on mount and on preference changes.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return reduced;
}
