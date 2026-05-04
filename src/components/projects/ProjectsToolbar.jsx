import EntitySearchBar from "../admin/EntitySearchBar";

function ProjectsToolbar({
  projectCount,
  searchQuery,
  activeCategory,
  categoryTabs,
  onSearchChange,
  onClearSearch,
  onSelectCategory,
}) {
  return (
    <section className="mt-10">
      <div className="flex items-baseline gap-3 text-slate-700">
        <span className="text-4xl font-semibold tracking-tight">{projectCount}</span>
        <span className="text-[22px] font-normal text-slate-500">Projects</span>
      </div>

      <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:flex-nowrap xl:items-center xl:gap-5">
        <EntitySearchBar
          value={searchQuery}
          onChange={onSearchChange}
          onClear={onClearSearch}
          placeholder="Search Project by name"
          clearLabel="Clear project search"
        />

        <div className="flex flex-wrap gap-4 xl:flex-none">
          {categoryTabs.map((tab) => {
            const active = tab === activeCategory;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => onSelectCategory(tab)}
                className={
                  active
                    ? "rounded-full bg-[#8fd11f] px-8 py-3 text-sm font-semibold text-slate-900 shadow-[0_4px_12px_rgba(143,209,31,0.18)]"
                    : "rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-medium text-slate-500"
                }
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectsToolbar;