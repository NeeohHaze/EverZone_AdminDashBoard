function ProjectGrid({ projects, projectImageUrl, onEditProject }) {
  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <article
          key={project.id}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="bg-slate-100">
            <img
              src={project.image || projectImageUrl}
              alt={project.title}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>

          <div className="flex items-center justify-between gap-4 px-6 py-5">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-slate-800">{project.title}</h3>
              <p className="mt-1 truncate text-sm text-slate-400">{project.name}</p>
            </div>
            <button
              type="button"
              onClick={() => onEditProject(project)}
              className="shrink-0 rounded-full bg-[#2c6480] px-10 py-3 text-sm font-semibold text-white"
            >
              Edit
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ProjectGrid;