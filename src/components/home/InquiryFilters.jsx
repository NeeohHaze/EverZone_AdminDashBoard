import { CalendarIcon, ChevronDownIcon, SearchIcon, StarIcon } from "./homeIcons";

function InquiryFilters({
  filter,
  monthOptions,
  searchQuery,
  selectedMonth,
  showStarredOnly,
  onFilterChange,
  onMonthChange,
  onSearchChange,
  onToggleStarredOnly,
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onToggleStarredOnly}
        aria-pressed={showStarredOnly}
        className={[
          "inline-flex h-11 shrink-0 items-center gap-1 rounded-full border px-4 text-sm font-medium shadow-sm transition",
          showStarredOnly
            ? "border-transparent bg-[#8dcf22] text-[#1f2a12]"
            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700",
        ].join(" ")}
      >
        <span>Starred</span>
        <StarIcon filled={showStarredOnly} className="h-4 w-4" />
      </button>

      <div className="flex min-w-[240px] flex-1 items-center rounded-full border border-slate-200 bg-white shadow-sm">
        <label className="relative min-w-0 flex-1">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name"
            className="h-11 w-full bg-transparent pl-11 pr-4 text-sm text-slate-700 outline-none"
          />
        </label>
      </div>

      <div className="flex shrink-0 items-center rounded-full border border-slate-200 bg-white pr-2 shadow-sm">
        <label className="relative inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm font-medium text-slate-500 transition hover:text-slate-700">
          <CalendarIcon className="h-4 w-4" />
          <select
            value={selectedMonth}
            onChange={(event) => onMonthChange(event.target.value)}
            className="h-11 appearance-none bg-transparent pl-2 pr-8 text-sm font-medium text-slate-500 outline-none"
            aria-label="Filter inquiries by month"
          >
            <option value="all">All Time</option>
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-4 h-4 w-4" />
        </label>
      </div>

      <div
        className="flex items-center rounded-full bg-[#2c6480] p-1 shadow-sm"
        role="group"
        aria-label="Filter inquiries"
      >
        {["All", "Unread", "Read"].map((value) => {
          const isActive = filter === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => onFilterChange(value)}
              aria-pressed={isActive}
              className={[
                "min-w-[74px] rounded-full px-4 py-2 text-[11px] font-semibold transition",
                isActive
                  ? "bg-[#8dcf22] text-[#1f2a12]"
                  : "bg-transparent text-white/85 hover:text-white",
              ].join(" ")}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default InquiryFilters;