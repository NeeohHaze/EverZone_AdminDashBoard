import ConfirmActionModal from "../admin/ConfirmActionModal";
import { TrashIcon } from "../admin/AdminIcons";

function ProjectEditorDrawer({
  activeProject,
  editDraft,
  categories,
  editImages,
  projectImageUrl,
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
  if (!activeProject || !editDraft) return null;

  const imageItems = editImages.length
    ? editImages
    : [projectImageUrl, projectImageUrl, projectImageUrl, projectImageUrl];

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close project editor"
        onClick={onClose}
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-[760px] bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4 px-10 py-8">
            <h3 className="text-4xl font-semibold tracking-tight text-slate-700">Edit Project</h3>

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
              aria-label="Edit project images"
            >
              <div className="flex flex-wrap items-start justify-center gap-5">
                {imageItems.map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                    className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-[78px] w-[120px] object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onRemoveImage(index);
                      }}
                      className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-sm font-semibold text-slate-600 shadow"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
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
              multiple
              className="hidden"
              onChange={onBrowse}
            />

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-600">Project title</label>
                <input
                  type="text"
                  value={editDraft.title}
                  onChange={(event) => onDraftChange("title", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">Owner Name</label>
                <input
                  type="text"
                  value={editDraft.name}
                  onChange={(event) => onDraftChange("name", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">Category</label>
                <select
                  value={editDraft.category_id}
                  onChange={(event) => onDraftChange("category_id", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
                >
                  {(categories ?? []).length ? (
                    (categories ?? []).map((category) => (
                      <option key={category.id} value={String(category.id)}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No categories</option>
                  )}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">Location</label>
                <input
                  type="text"
                  value={editDraft.location}
                  onChange={(event) => onDraftChange("location", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">Project Duration</label>
                <input
                  type="text"
                  value={editDraft.duration}
                  onChange={(event) => onDraftChange("duration", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">Area</label>
                <input
                  type="text"
                  value={editDraft.area}
                  onChange={(event) => onDraftChange("area", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Description</label>
                <textarea
                  rows={5}
                  value={editDraft.description}
                  onChange={(event) => onDraftChange("description", event.target.value)}
                  className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Project Image URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={editDraft.image}
                  onChange={(event) => onDraftChange("image", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-slate-100 px-10 py-8">
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-full border border-[#ff7f79] bg-[#fff3f2] px-6 py-3 text-sm font-semibold text-[#ff6b63] transition hover:bg-[#ffe8e5] disabled:pointer-events-none disabled:opacity-60"
              onClick={onShowDelete}
              disabled={actionLoading}
            >
              <TrashIcon className="h-5 w-5" />
              Delete Project
            </button>

            <button
              type="button"
              className="rounded-full bg-[#2c6480] px-10 py-3 text-sm font-semibold text-white"
              onClick={onSave}
              disabled={actionLoading}
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

export default ProjectEditorDrawer;