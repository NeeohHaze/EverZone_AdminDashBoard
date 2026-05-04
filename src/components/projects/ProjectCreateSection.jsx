import { PhotoIcon } from "../admin/AdminIcons";

function ProjectCreateSection({
  newDraft,
  categories,
  error,
  categoriesError,
  fileInputRef,
  fileSummary,
  actionLoading,
  canCreate,
  onDraftChange,
  onOpenFilePicker,
  onDrop,
  onBrowse,
  onCreate,
}) {
  return (
    <>
      <h2 className="mt-10 text-xl font-semibold text-slate-600">Upload New Project</h2>

      <section className="mt-4 rounded-2xl bg-slate-50 p-6">
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-600">
                Project title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter title of the project"
                value={newDraft.title}
                onChange={(event) => onDraftChange("title", event.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Owner Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter owner's name"
                value={newDraft.name}
                onChange={(event) => onDraftChange("name", event.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={newDraft.category_id}
                onChange={(event) => onDraftChange("category_id", event.target.value)}
                required
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
                placeholder="Enter project location"
                value={newDraft.location}
                onChange={(event) => onDraftChange("location", event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">Project Duration</label>
              <input
                type="text"
                placeholder="e.g. 1 Jan 2025 to 31 Dec 2025"
                value={newDraft.duration}
                onChange={(event) => onDraftChange("duration", event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">Area</label>
              <input
                type="text"
                placeholder="e.g. 500 square meters"
                value={newDraft.area}
                onChange={(event) => onDraftChange("area", event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-600">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Enter description of the project"
                value={newDraft.description}
                onChange={(event) => onDraftChange("description", event.target.value)}
                required
                className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-600">Project Image URL (optional)</label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={newDraft.image}
                onChange={(event) => onDraftChange("image", event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-slate-300 focus:outline-none"
              />
            </div>

            {error || categoriesError ? (
              <div className="sm:col-span-2 rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error || categoriesError}</div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <div
              role="button"
              tabIndex={0}
              onClick={onOpenFilePicker}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") onOpenFilePicker();
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={onDrop}
              className="flex min-h-[300px] items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white px-6 sm:min-h-[360px] lg:min-h-[420px]"
              aria-label="Upload project photos"
            >
              <div className="flex flex-col items-center gap-2 text-center text-sm text-slate-400">
                <span className="mb-10 mr-10 grid h-12 w-12 place-items-center text-slate-400">
                  <PhotoIcon className="h-20 w-20" />
                </span>
                <p className="text-sm text-slate-400">
                  Drag and drop your images here or{" "}
                  <button
                    type="button"
                    onClick={onOpenFilePicker}
                    className="inline text-[#7ac943] underline"
                  >
                    browse
                  </button>
                </p>
                {fileSummary ? (
                  <p className="mt-2 max-w-[28ch] truncate text-[11px] text-slate-500">{fileSummary}</p>
                ) : null}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onBrowse}
            />

            <button
              type="button"
              onClick={onCreate}
              disabled={actionLoading || !canCreate || !(categories ?? []).length}
              className="group flex w-full items-stretch overflow-hidden rounded-full border border-[#1f4f64] bg-[#2c6480] shadow-sm transition hover:bg-[#2a5f79] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex-1 py-4 text-center text-base font-semibold text-white transition group-hover:text-[#8dcf22]">
                {actionLoading ? "Uploading..." : "Upload Project"}
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProjectCreateSection;