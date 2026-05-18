export default function MetricDelta({ current, prior, goodDirection = "up" }) {
  if (
    typeof current !== "number" ||
    typeof prior !== "number" ||
    !Number.isFinite(current) ||
    !Number.isFinite(prior) ||
    prior === 0
  ) {
    return null;
  }
  const delta = ((current - prior) / Math.abs(prior)) * 100;
  if (Math.abs(delta) < 0.05) {
    return <span className="text-10 font-mono text-slate-400">—</span>;
  }
  const isUp = delta > 0;
  const isGood =
    (isUp && goodDirection === "up") || (!isUp && goodDirection === "down");
  const tone = isGood ? "text-emerald-600" : "text-rose-600";
  return (
    <span className={`text-10 font-mono ${tone}`}>
      {isUp ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
    </span>
  );
}
