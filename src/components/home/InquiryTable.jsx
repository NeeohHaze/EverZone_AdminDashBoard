import { StarIcon } from "./homeIcons";

function InquiryTable({
  error,
  inquiryCount,
  loading,
  pagedInquiries,
  onOpenInquiry,
  onToggleStarred,
  formatDateTime,
  formatRelativeTime,
}) {
  return (
    <div className="border-t border-slate-200">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50 text-xs font-semibold text-slate-500">
              <th className="border-b border-slate-200 px-6 py-3">Name</th>
              <th className="border-b border-slate-200 px-6 py-3">Email</th>
              <th className="border-b border-slate-200 px-6 py-3">Phone</th>
              <th className="border-b border-slate-200 px-6 py-3">Date and Time Received</th>
              <th className="border-b border-slate-200 px-6 py-3">Received</th>
              <th className="border-b border-slate-200 px-4 py-3" />
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-sm font-medium text-slate-500">
                  Loading inquiries...
                </td>
              </tr>
            ) : error && inquiryCount === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-sm font-medium text-red-500">
                  {error}
                </td>
              </tr>
            ) : pagedInquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-sm font-medium text-slate-500">
                  No inquiries found.
                </td>
              </tr>
            ) : (
              pagedInquiries.map((item) => {
                const dateParts = formatDateTime(item.receivedAt);

                return (
                  <tr
                    key={item.id}
                    className="cursor-pointer border-b border-slate-200 bg-white transition hover:bg-slate-50"
                    onClick={() => onOpenInquiry(item.id)}
                    title="Click to view details"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label={item.starred ? "Remove star" : "Star inquiry"}
                          onClick={(event) => {
                            event.stopPropagation();
                            onToggleStarred(item.id);
                          }}
                          className={[
                            "grid h-7 w-7 place-items-center rounded-full transition",
                            item.starred
                              ? "text-[#7ac943]"
                              : "text-slate-300 hover:text-slate-500",
                          ].join(" ")}
                        >
                          <StarIcon filled={item.starred} className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.email}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.phone}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-700">{dateParts.dateTimeLine}</div>
                      <div className="text-xs text-slate-400">{formatRelativeTime(item.receivedAt)}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      <div className="flex flex-col gap-1">
                        <span>{formatRelativeTime(item.receivedAt)}</span>
                        {!item.read ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-500">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500" aria-hidden="true" />
                            <span>Unread</span>
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        className="text-xl font-bold text-slate-400"
                        aria-label="Open inquiry"
                        onClick={(event) => {
                          event.stopPropagation();
                          onOpenInquiry(item.id);
                        }}
                      >
                        ›
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InquiryTable;