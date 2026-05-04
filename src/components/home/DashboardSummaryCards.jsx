const ArrowUpRightIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 14L14 6" />
    <path d="M8 6h6v6" />
  </svg>
);

function DashboardSummaryCards({ items, onNavigate }) {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onNavigate(item.to)}
          className="group flex min-w-[150px] cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-[#2c6480] hover:bg-slate-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c6480]/30"
        >
          <span className="text-lg font-semibold text-slate-900">{item.value}</span>
          <span className="text-sm font-medium text-slate-600">{item.label}</span>
          <span className="ml-auto text-slate-700 transition-transform duration-150 group-hover:translate-x-0.5">
            <ArrowUpRightIcon />
          </span>
        </button>
      ))}
    </div>
  );
}

export default DashboardSummaryCards;