function ServiceGrid({ services, serviceImageUrl, onEditService }) {
  return (
    <section className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <article
          key={service.id}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="bg-slate-100">
            <img
              src={service.image || serviceImageUrl}
              alt={service.title}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>

          <div className="flex h-full flex-col px-6 py-6">
            <h3 className="text-xl font-semibold text-slate-800">{service.title}</h3>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">{service.description}</p>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => onEditService(service)}
                className="rounded-full bg-[#2c6480] px-12 py-4 text-sm font-semibold text-white"
              >
                Edit
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export default ServiceGrid;