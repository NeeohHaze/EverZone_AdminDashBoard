function InquiryPagination({ currentPage, items, totalPages, onNext, onPrevious, onSelectPage }) {
  return (
    <div className="flex items-center justify-center px-6 py-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentPage <= 1}
          className={[
            "grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-base font-semibold",
            currentPage <= 1 ? "text-slate-300" : "text-slate-700 hover:bg-slate-50",
          ].join(" ")}
          aria-label="Previous page"
        >
          ‹
        </button>

        <div className="flex items-center rounded-xl bg-[#2c6480] p-1" role="group" aria-label="Pagination">
          {items.map((item, index) => {
            if (item === "…") {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold text-white/70"
                  aria-hidden="true"
                >
                  …
                </div>
              );
            }

            const isActive = item === currentPage;

            return (
              <button
                key={item}
                type="button"
                onClick={() => onSelectPage(item)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex h-8 min-w-8 items-center justify-center rounded-lg px-3 text-xs font-semibold transition",
                  isActive ? "bg-[#7ac943] text-white" : "bg-transparent text-white/85 hover:text-white",
                ].join(" ")}
              >
                {item}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage >= totalPages}
          className={[
            "grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-base font-semibold",
            currentPage >= totalPages ? "text-slate-300" : "text-slate-700 hover:bg-slate-50",
          ].join(" ")}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default InquiryPagination;