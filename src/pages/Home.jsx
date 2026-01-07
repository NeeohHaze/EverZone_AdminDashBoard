import React, { useState } from "react";

function Home() {
 const [inquiry, setInquiry] = useState([
    { id: 1, name: "Thomas", email: "Thomas@gmail.com", message: "Hello, I need help with...", Date: "2023-10-01", read: false },
    { id: 2, name: "Alice", email: "Alice@gmail.com", message: "I have a question about...", Date: "2023-10-02", read: true },
    { id: 3, name: "Bob", email: "Bob@gmail.com", message: "Can you provide more info on...", Date: "2023-10-03", read: false },
    { id: 4, name: "Eve", email: "Eve@gmail.com", message: "I would like to know more about...", Date: "2023-10-04", read: true }
 ]);

  const [filter, setFilter] = useState("All");

  const filteredInquiries = inquiry.filter((item) => {
    if (filter === "Read") return item.read;
    if (filter === "Unread") return !item.read;
    return true;
  });


  return (
    <div className="w-full max-w-5xl p-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Overview
      </h1>

      {/* smaller “pill/box” stats that hug the text */}
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 border border-black bg-white px-4 py-2 shadow-sm">
          <span className="text-base font-semibold text-slate-700">Services 14</span>
        </div>

        <div className="inline-flex items-center gap-2 border border-black bg-white px-4 py-2 shadow-sm">
          <span className="text-base font-semibold text-slate-700">Projects 12</span>
        </div>
      </div>

      <section className="mt-8 rounded-xl border border-black/10 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 px-5 py-4">
          <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
            Inquiries
          </h2>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Filter</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-900/20 focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="All">All</option>
              <option value="Read">Read</option>
              <option value="Unread">Unread</option>
            </select>
          </div>
        </div>

        <div className="max-h-[420px] overflow-y-auto px-4 py-3">
          <div className="space-y-2">
            {filteredInquiries.length === 0 ? (
              <div className="rounded-lg border border-dashed border-black/10 bg-slate-50 px-4 py-6 text-sm font-medium text-slate-500">
                No inquiries found.
              </div>
            ) : (
              filteredInquiries.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-black/10 bg-white px-3 py-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="text-sm font-extrabold text-slate-900">
                      {item.name}
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
                      <span className="font-semibold text-slate-600">
                        {item.email}
                      </span>
                      <span
                        className={[
                          "rounded-full px-2 py-0.5 font-semibold",
                          item.read
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700",
                        ].join(" ")}
                      >
                        {item.read ? "Read" : "Unread"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-1.5 flex items-start justify-between gap-4">
                    <p className="text-sm text-slate-700">{item.message}</p>
                    <span className="shrink-0 text-xs font-semibold text-slate-500">
                      {item.Date}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;