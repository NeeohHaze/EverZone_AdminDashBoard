function ConfirmActionModal({
  open,
  title,
  lines,
  onCancel,
  onConfirm,
  confirmLabel,
  confirmIcon,
  confirmDisabled = false,
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-[90] flex items-center justify-center bg-black/85 px-4">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close confirmation"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-[424px] rounded-2xl bg-white px-10 py-9 shadow-2xl">
        <h2 className="text-[30px] font-semibold tracking-tight text-slate-700">{title}</h2>

        <div className="mt-9 space-y-2 text-[17px] leading-8 text-slate-500">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="min-w-[142px] rounded-full border border-slate-200 bg-white px-8 py-4 text-[17px] font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={confirmDisabled}
            className="inline-flex min-w-[142px] items-center justify-center gap-2 rounded-full border border-[#ff7f79] bg-[#fff3f2] px-8 py-4 text-[17px] font-semibold text-[#ff6b63] transition hover:bg-[#ffe8e5] disabled:pointer-events-none disabled:opacity-60"
          >
            {confirmIcon}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmActionModal;