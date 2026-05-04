import { PhotoIcon } from "../admin/AdminIcons";

function ServiceCreateSection({
  fileInputRef,
  fileSummary,
  newTitle,
  newDescription,
  newImageUrl,
  error,
  actionLoading,
  onOpenFilePicker,
  onDrop,
  onBrowse,
  onTitleChange,
  onDescriptionChange,
  onImageUrlChange,
  onCreate,
}) {
  return (
    <>
      <h2 className="mt-10 text-xl font-semibold text-slate-600">Upload New Service</h2>

      <section className="mt-4 rounded-2xl bg-slate-50 p-6">
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.3fr_2fr]">
          <div
            role="button"
            tabIndex={0}
            onClick={onOpenFilePicker}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") onOpenFilePicker();
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={onDrop}
            className="flex h-60 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white"
            aria-label="Upload service photo"
          >
            <div className="flex flex-col items-center gap-2 text-center text-xs text-slate-400">
              <span className="mb-5 mr-10 grid h-10 w-10 place-items-center text-slate-400">
                <PhotoIcon className="h-15 w-15" />
              </span>

              <div className="mt-6 text-center text-sm text-slate-500">
                Drag and drop your image here or{" "}
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

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Service Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter title of the service"
                value={newTitle}
                onChange={(event) => onTitleChange(event.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600">
                Service Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your service Description"
                value={newDescription}
                onChange={(event) => onDescriptionChange(event.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600">Service Image URL (optional)</label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={newImageUrl}
                onChange={(event) => onImageUrlChange(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              />
            </div>

            {error ? (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            ) : null}

            <div className="flex justify-center lg:justify-end">
              <button
                type="button"
                onClick={onCreate}
                disabled={actionLoading || !newTitle.trim() || !newDescription.trim()}
                className="group w-full max-w-[540px] rounded-full bg-[#1f4f64] p-[2px] shadow-sm transition hover:bg-[#234f66] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex w-full items-stretch overflow-hidden rounded-full bg-[#2c6480] transition group-hover:bg-[#2a5f79]">
                  <span className="flex-1 py-4 text-center text-base font-semibold text-white transition group-hover:text-[#8dcf22]">
                    {actionLoading ? "Uploading..." : "Upload Service"}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceCreateSection;