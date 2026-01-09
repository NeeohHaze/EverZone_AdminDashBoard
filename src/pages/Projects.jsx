const PlusIcon = ({ className = 'h-6 w-6' }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M19 11H13V5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2z" />
  </svg>
)

const projectsMock = [
  {
    id: 'project-1',
    title: 'Project',
    fields: ['Location-', 'Details-', 'Details-', 'Details-', 'Scope- text text texts text'],
  },
  {
    id: 'project-2',
    title: 'Project',
    fields: ['Location-', 'Details-', 'Details-', 'Details-', 'Scope- text text texts text'],
  },
]

function Projects() {
  return (
    <div className="w-full max-w-5xl p-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Projects
      </h1>

      <div className="mt-6 space-y-8">
        <section className="bg-slate-200 p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-900">
              Service Name
            </div>
            <div className="bg-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-900">
              Description
            </div>
          </div>

          <div className="mt-4 bg-slate-300 px-4 py-10">
            <div className="flex items-center justify-center gap-4 text-sm font-semibold text-slate-900">
              <span>Add Photo</span>
              <span className="inline-flex items-center justify-center text-slate-900">
                <PlusIcon className="h-7 w-7" />
              </span>
            </div>
          </div>
        </section>

        {/* All Projects list mock */}
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            All Projects
          </h2>

          <div className="mt-4 space-y-6">
            {projectsMock.map((p) => (
              <article key={p.id} className="grid grid-cols-1 overflow-hidden sm:grid-cols-2">
                <div className="bg-slate-300 px-6 py-16">
                  <div className="text-center text-sm font-semibold text-slate-900">
                    Image
                  </div>
                </div>

                <div className="bg-slate-200 px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                        {p.title}
                      </div>
                      <div className="mt-3 space-y-2 text-sm text-slate-900">
                        {p.fields.map((t, idx) => (
                          <div key={idx}>{t}</div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                    >
                      View and Edit
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Projects