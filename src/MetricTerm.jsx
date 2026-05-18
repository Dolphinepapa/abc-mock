import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

export default function MetricTerm({ definition, children }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top,
      left: rect.left + rect.width / 2,
    });
  }, [open]);

  return (
    <>
      <span
        ref={triggerRef}
        className="border-b border-dashed border-slate-400 cursor-help"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        tabIndex={0}
      >
        {children}
      </span>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <span
            role="tooltip"
            style={{
              position: "fixed",
              top: coords.top - 8,
              left: coords.left,
              transform: "translate(-50%, -100%)",
              maxWidth: "280px",
            }}
            className="z-50 w-max bg-slate-900 text-white text-xs leading-relaxed rounded-md shadow-lg px-3 py-2 pointer-events-none"
          >
            {definition}
            <span
              aria-hidden="true"
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900"
            />
          </span>,
          document.body,
        )}
    </>
  );
}
