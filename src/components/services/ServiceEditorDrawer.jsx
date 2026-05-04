import { TrashIcon } from "../admin/AdminIcons";
import ConfirmActionModal from "../admin/ConfirmActionModal";

function ServiceEditorDrawer({
  activeService,
  editDraft,
  editImages,
  serviceImageUrl,
  editFileInputRef,
  actionLoading,
  showDeleteModal,
  onClose,
  onOpenFilePicker,
  onDrop,
  onBrowse,
  onRemoveImage,
  onDraftChange,
  onShowDelete,
  onHideDelete,
  onDelete,
  onSave,
}) {
  if (!activeService || !editDraft) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close service editor"
        onClick={onClose}
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-[760px] bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4 px-10 py-8">
            <h3 className="text-4xl font-semibold tracking-tight text-slate-700">Edit Service</h3>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-xl text-slate-700"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-10 pb-10">
            <div
              role="button"
              tabIndex={0}
              onClick={onOpenFilePicker}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") onOpenFilePicker();
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={onDrop}
              className="rounded-2xl border-2 border-dashed border-slate-200 p-6"
              aria-label="Edit service image"
            >
              <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                <img
                  src={editImages[0] ?? editDraft.image ?? serviceImageUrl}
                  alt=""
                  className="h-[180px] w-full object-cover"
                  loading="lazy"
                  draggable={false}
                />

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemoveImage();
                  }}
                  className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-sm font-semibold text-slate-600 shadow"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-slate-500">
                Drag and drop to change your image here or{" "}
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onOpenFilePicker();
                  }}
                  className="text-[#7ac943]"
                >
                  browse
                </button>
              </div>
            </div>

            <input
              ref={editFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onBrowse}
            />

            <div className="mt-10 space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-600">Service Title</label>
                <input
                  type="text"
                  value={editDraft.title}
                  onChange={(event) => onDraftChange("title", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">Service Description</label>
                <textarea
                  rows={6}
                  value={editDraft.description}
                  onChange={(event) => onDraftChange("description", event.target.value)}
                  className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">Service Image URL (optional)</label>
                <input
                  type="url"
                  value={editDraft.image ?? ""}
                  onChange={(event) => onDraftChange("image", event.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-slate-100 px-10 py-8">
            <button
              type="button"
              onClick={onShowDelete}
              disabled={actionLoading}
              className="inline-flex items-center gap-3 rounded-full border border-[#ff7f79] bg-[#fff3f2] px-6 py-3 text-sm font-semibold text-[#ff6b63] transition hover:bg-[#ffe8e5] disabled:pointer-events-none disabled:opacity-60"
            >
              <TrashIcon className="h-5 w-5" />
              Delete Service
            </button>

            <button
              type="button"
              onClick={onSave}
              disabled={actionLoading}
              className="rounded-full bg-[#2c6480] px-10 py-3 text-sm font-semibold text-white"
            >
              {actionLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </aside>

      <ConfirmActionModal
        open={showDeleteModal}
        title="Confirm Delete"
        lines={["Are you sure you want to delete this?", "This cannot be undone."]}
        onCancel={onHideDelete}
        onConfirm={onDelete}
        confirmLabel={actionLoading ? "Deleting..." : "Yes"}
        confirmIcon={<TrashIcon className="h-5 w-5" />}
        confirmDisabled={actionLoading}
      />
    </div>
  );
}

export default ServiceEditorDrawer;