import { useState } from "react";

export default function MetricTerm({ definition, children }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <span
        className="border-b border-dashed border-slate-400 cursor-help"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        tabIndex={0}
      >
        {children}
      </span>
      {open && (
        <span
          role="tooltip"
          style={{ maxWidth: "280px" }}
          className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-slate-900 text-white text-xs leading-relaxed rounded-md shadow-lg px-3 py-2 pointer-events-none"
        >
          {definition}
          <span
            aria-hidden="true"
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900"
          />
        </span>
      )}
    </span>
  );
}
