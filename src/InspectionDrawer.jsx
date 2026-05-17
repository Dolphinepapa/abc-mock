import { X } from "lucide-react";

export default function InspectionDrawer({
  open,
  onClose,
  title,
  methodologyDescription,
  tableHeaders = [],
  tableRows = [],
  columnWidths,
  definitionsList,
  definitionsLabel = "Definitions",
  footer,
  bodyOverride,
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/40"
      onClick={onClose}
    >
      <div
        className="h-full bg-white border-l border-slate-200 shadow-xl flex flex-col"
        style={{ width: "min(720px, 78vw)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
          <div className="text-sm font-semibold text-slate-900 tracking-tight">
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!bodyOverride && methodologyDescription && (
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/40 flex-shrink-0">
            <div className="text-11 text-slate-600 leading-relaxed">
              {methodologyDescription}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {bodyOverride && (
            <div className="px-5 py-4">{bodyOverride}</div>
          )}
          {!bodyOverride && tableRows.length > 0 && (
            <div className="px-5 py-4">
              <table
                className={`w-full text-xs ${columnWidths ? "table-fixed" : ""}`}
              >
                {columnWidths && (
                  <colgroup>
                    {columnWidths.map((w, i) => (
                      <col key={i} style={{ width: w }} />
                    ))}
                  </colgroup>
                )}
                <thead>
                  <tr className="border-b border-slate-200">
                    {tableHeaders.map((h, i) => (
                      <th
                        key={i}
                        className="text-left py-2 px-2 text-10 uppercase tracking-wider text-slate-500 font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, ri) => (
                    <tr
                      key={ri}
                      className="border-b border-slate-100 hover:bg-slate-50/50"
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="py-2 px-2 text-slate-700 align-top"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!bodyOverride && definitionsList && definitionsList.length > 0 && (
            <div className="px-5 py-4 border-t border-slate-200">
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-2">
                {definitionsLabel}
              </div>
              <dl className="space-y-3 text-xs">
                {definitionsList.map((d, i) => (
                  <div key={i}>
                    <dt className="font-medium text-slate-900">{d.term}</dt>
                    <dd className="text-slate-600 leading-relaxed mt-0.5">
                      {d.definition}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {footer && (
          <div className="border-t border-slate-200 px-5 py-4 bg-slate-50/50 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
