function InquiryDetailDrawer({ inquiry, onClose, onToggleRead, onToggleStarred, formatDateTime, formatRelativeTime }) {
  if (!inquiry) return null;

  const parts = formatDateTime(inquiry.receivedAt);

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close inquiry detail"
        onClick={onClose}
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-[520px] bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 px-10 py-8">
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">Inquiry Detail</h3>

            <div className="mt-8">
              <div className="text-base font-bold text-slate-700">{inquiry.subject}</div>
              <div className="mt-3 text-base font-semibold leading-tight text-slate-600">
                <div>{parts.dateTimeLine}</div>
                <div>{formatRelativeTime(inquiry.receivedAt)}</div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-black text-xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="px-10 pb-10">
          <h4 className="text-2xl font-extrabold text-slate-900">Inquired Person</h4>

          <div className="mt-6 grid grid-cols-2 gap-y-5">
            <div className="text-base font-semibold text-slate-600">Name</div>
            <div className="text-base font-semibold text-slate-700">{inquiry.name}</div>

            <div className="text-base font-semibold text-slate-600">Email</div>
            <div className="text-base font-semibold text-slate-700">{inquiry.email}</div>

            <div className="text-base font-semibold text-slate-600">Phone Number</div>
            <div className="text-base font-semibold text-slate-700">{inquiry.phone}</div>
          </div>

          <h4 className="mt-10 text-2xl font-extrabold text-slate-900">Message</h4>
          <p className="mt-4 text-base font-semibold text-slate-600">{inquiry.message}</p>

          <button
            type="button"
            className="mt-8 border border-black bg-white px-4 py-2 text-sm font-semibold"
            onClick={() => onToggleRead(inquiry.id)}
          >
            Mark as {inquiry.read ? "Unread" : "Read"}
          </button>

          <button
            type="button"
            className="ml-3 mt-8 border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            onClick={() => onToggleStarred(inquiry.id)}
          >
            {inquiry.starred ? "Remove Star" : "Star Inquiry"}
          </button>
        </div>
      </aside>
    </div>
  );
}

export default InquiryDetailDrawer;