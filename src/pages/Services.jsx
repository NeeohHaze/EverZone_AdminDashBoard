const PencilIcon = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.33H5v-.92l9.06-9.06.92.92L5.92 19.58zM20.71 7.04a1.003 1.003 0 0 0 0-1.42L18.37 3.29a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z" />
  </svg>
)

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

const servicesMock = [
  {
    id: 'road-bridge',
    title: 'Road & Bridge Construction',
    subtitle: 'Short Description',
  },
  {
    id: 'earth-works',
    title: 'Earth Works',
    subtitle: 'Short Description',
  },
  {
    id: 'building-construction',
    title: 'Building Construction (Residential, Commercial, Industrial)',
    subtitle: 'Short Description',
  },
  {
    id: 'steel-structure',
    title: 'Steel Structure Works',
    subtitle: 'Short Description',
  },
]

function Services() {
  return (
    <div className="w-full max-w-5xl p-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Services
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

        <section className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {servicesMock.map((svc) => (
            <article key={svc.id} className="border border-slate-300">
              <div className="bg-slate-300 px-6 py-12">
                <div className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-900">
                  <span>Visual</span>
                  <PencilIcon className="h-5 w-5 text-slate-900" />
                </div>
              </div>

              <div className="bg-slate-200 px-6 py-5">
                <div className="flex items-center justify-center gap-3 text-center text-sm font-semibold text-slate-900">
                  <span>{svc.title}</span>
                  <PencilIcon className="h-5 w-5 text-slate-900" />
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-6">
                <div className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-900">
                  <span>{svc.subtitle}</span>
                  <PencilIcon className="h-5 w-5 text-slate-900" />
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Services