import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useContactFormsData, useProjectsData, useServicesData } from "../hooks/useApiData";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const normalizeContactForm = (form) => {
  const status = String(form?.status ?? "pending").toLowerCase();

  return {
    id: form.id,
    name: form.name ?? "Unknown",
    email: form.email ?? "-",
    phone: form.phone || "-",
    subject: form.subject?.trim() || `Inquiry from ${form.name ?? "Unknown"}`,
    message: form.message ?? "",
    receivedAt: form.time || form.created_at || new Date().toISOString(),
    read: status !== "pending",
    status,
  };
};

const getStatusForReadState = (nextRead, previousStatus) => {
  if (!nextRead) return "pending";
  return previousStatus === "responded" || previousStatus === "archived"
    ? previousStatus
    : "reviewed";
};

function Home() {
  const navigate = useNavigate();
  const { contactForms, loading, error, updateStatus } = useContactFormsData();
  const { services } = useServicesData();
  const { projects } = useProjectsData();
  const [inquiry, setInquiry] = useState([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [activeInquiryId, setActiveInquiryId] = useState(null);

  useEffect(() => {
    setInquiry((contactForms || []).map(normalizeContactForm));
  }, [contactForms]);

  const filteredInquiries = useMemo(() => {
    return inquiry.filter((item) => {
      if (filter === "Read") return item.read;
      if (filter === "Unread") return !item.read;
      return true;
    });
  }, [filter, inquiry]);

  const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / pageSize));

  const currentPage = Math.min(page, totalPages);
  const pagedInquiries = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredInquiries.slice(start, start + pageSize);
  }, [currentPage, filteredInquiries]);

  const formatTableDateParts = (value) => {
    const date = new Date(value);
    const dd = String(date.getDate()).padStart(2, "0");
    const month = monthNames[date.getMonth()] ?? "";
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";

    return {
      dateTimeLine: `${dd} ${month} ${yyyy} ${hh}:${min} ${period}`.toUpperCase(),
    };
  };

  const formatRelativeTime = (value) => {
    const diff = Date.now() - new Date(value).getTime();
    const formatUnit = (amount, unit) => {
      const safeAmount = Math.max(1, amount);
      return `${safeAmount} ${unit}${safeAmount === 1 ? "" : "s"} ago`;
    };

    const minutes = Math.max(1, Math.round(diff / 60000));
    if (minutes < 60) return formatUnit(minutes, "minute");
    const hours = Math.round(minutes / 60);
    if (hours < 24) return formatUnit(hours, "hour");
    const days = Math.round(hours / 24);
    if (days < 30) return formatUnit(days, "day");
    const months = Math.round(days / 30);
    if (months < 12) return formatUnit(months, "month");
    const years = Math.round(months / 12);
    return formatUnit(years, "year");
  };

  const formatDetailDateParts = (value) => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = monthNames[date.getMonth()] ?? "";
    const year = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";

    return {
      dateTimeLine: `${day} ${month} ${year} ${hh}:${min} ${period}`.toUpperCase(),
    };
  };

  const setFilterAndResetPage = (value) => {
    setFilter(value);
    setPage(1);
  };

  const syncInquiryStatus = async (id, nextRead) => {
    const selectedInquiry = inquiry.find((item) => item.id === id);
    if (!selectedInquiry) return;

    const previousStatus = selectedInquiry.status;
    const nextStatus = getStatusForReadState(nextRead, previousStatus);

    setInquiry((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: nextRead, status: nextStatus } : item
      )
    );

    const result = await updateStatus(id, nextStatus);

    if (!result.success) {
      setInquiry((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, read: previousStatus !== "pending", status: previousStatus }
            : item
        )
      );
      return;
    }

    if (result.data) {
      setInquiry((prev) =>
        prev.map((item) => (item.id === id ? normalizeContactForm(result.data) : item))
      );
    }
  };

  const toggleRead = (id) => {
    const selectedInquiry = inquiry.find((item) => item.id === id);
    if (!selectedInquiry) return;
    void syncInquiryStatus(id, !selectedInquiry.read);
  };

  const openInquiry = (id) => {
    setActiveInquiryId(id);
    const selectedInquiry = inquiry.find((item) => item.id === id);
    if (selectedInquiry && !selectedInquiry.read) {
      void syncInquiryStatus(id, true);
    }
  };

  const closeInquiry = () => {
    setActiveInquiryId(null);
  };

  const activeInquiry = useMemo(() => {
    if (activeInquiryId == null) return null;
    return inquiry.find((it) => it.id === activeInquiryId) ?? null;
  }, [activeInquiryId, inquiry]);

  useEffect(() => {
    if (!activeInquiry) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeInquiry();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeInquiry]);

  const getPaginationItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items = [1];
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) items.push("…");
    for (let p = left; p <= right; p += 1) items.push(p);
    if (right < totalPages - 1) items.push("…");

    items.push(totalPages);
    return items;
  };

        return (
          <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] min-h-screen bg-white pb-8">
            <div aria-hidden="true" className="h-[54px] w-full bg-[#2c6480]" />

            <div className="relative z-10 mx-auto -mt-6 w-full overflow-hidden rounded-t-[44px] bg-white px-8 pb-10 pt-10 sm:px-14 lg:px-20">
            <h1 className="text-3xl font-semibold text-slate-800">Dashboard</h1>

            <div className="mt-6 flex flex-wrap gap-4">
              {[
                { label: "Services", value: services.length, to: "/Services" },
                { label: "Projects", value: projects.length, to: "/Projects" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.to)}
                  className="group flex min-w-[150px] cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-[#2c6480] hover:bg-slate-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c6480]/30"
                >
                  <span className="text-lg font-semibold text-slate-900">{item.value}</span>
                  <span className="text-sm font-medium text-slate-600">{item.label}</span>
                  <span className="ml-auto text-slate-700 transition-transform duration-150 group-hover:translate-x-0.5">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 14L14 6" />
                      <path d="M8 6h6v6" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>

            <section className="mt-10 rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-700">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 6h16v12H4z" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                  </span>
                  <h2 className="text-lg font-semibold text-slate-800">Inquiries</h2>
                </div>

                <div
                  className="flex items-center rounded-full bg-[#2c6480] p-1"
                  role="group"
                  aria-label="Filter inquiries"
                >
                  {["All", "Unread", "Read"].map((value) => {
                    const isActive = filter === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setFilterAndResetPage(value)}
                        aria-pressed={isActive}
                        className={[
                          "min-w-[72px] rounded-full px-4 py-1.5 text-xs font-semibold transition",
                          isActive
                            ? "bg-[#7ac943] text-white"
                            : "bg-[transparent] text-white/80 hover:text-white",
                        ].join(" ")}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-200">
                <div className="w-full overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-slate-50 text-xs font-semibold text-slate-500">
                        <th className="border-b border-slate-200 px-6 py-3">Name</th>
                        <th className="border-b border-slate-200 px-6 py-3">Email</th>
                        <th className="border-b border-slate-200 px-6 py-3">Phone</th>
                        <th className="border-b border-slate-200 px-6 py-3">
                          Date and Time Received
                        </th>
                        <th className="border-b border-slate-200 px-6 py-3">Received</th>
                        <th className="border-b border-slate-200 px-4 py-3" />
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-10 text-sm font-medium text-slate-500"
                          >
                            Loading inquiries...
                          </td>
                        </tr>
                      ) : error && inquiry.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-10 text-sm font-medium text-red-500"
                          >
                            {error}
                          </td>
                        </tr>
                      ) : pagedInquiries.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-10 text-sm font-medium text-slate-500"
                          >
                            No inquiries found.
                          </td>
                        </tr>
                      ) : (
                        pagedInquiries.map((item) => {
                          const dateParts = formatTableDateParts(item.receivedAt);
                          return (
                            <tr
                              key={item.id}
                              className="cursor-pointer border-b border-slate-200 bg-white transition hover:bg-slate-50"
                              onClick={() => openInquiry(item.id)}
                              title="Click to view details"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <span
                                    className={[
                                      "h-2.5 w-2.5 rounded-full",
                                      item.read ? "bg-transparent" : "bg-red-500",
                                    ].join(" ")}
                                    aria-hidden="true"
                                  />
                                  <span className="text-sm font-semibold text-slate-900">
                                    {item.name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                {item.email}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                {item.phone}
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-slate-700">
                                  {dateParts.dateTimeLine}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {formatRelativeTime(item.receivedAt)}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                {formatRelativeTime(item.receivedAt)}
                              </td>
                              <td className="px-4 py-4">
                                <button
                                  type="button"
                                  className="text-xl font-bold text-slate-400"
                                  aria-label="Open inquiry"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openInquiry(item.id);
                                  }}
                                >
                                  ›
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-center px-6 py-5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage <= 1}
                      className={[
                        "grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-base font-semibold",
                        currentPage <= 1
                          ? "text-slate-300"
                          : "text-slate-700 hover:bg-slate-50",
                      ].join(" ")}
                      aria-label="Previous page"
                    >
                      ‹
                    </button>

                    <div
                      className="flex items-center rounded-xl bg-[#2c6480] p-1"
                      role="group"
                      aria-label="Pagination"
                    >
                      {getPaginationItems().map((it, i) => {
                        if (it === "…") {
                          return (
                            <div
                              key={`ellipsis-${i}`}
                              className="flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold text-white/70"
                              aria-hidden="true"
                            >
                              …
                            </div>
                          );
                        }

                        const isActive = it === currentPage;
                        return (
                          <button
                            key={it}
                            type="button"
                            onClick={() => setPage(it)}
                            aria-current={isActive ? "page" : undefined}
                            className={[
                              "flex h-8 min-w-8 items-center justify-center rounded-lg px-3 text-xs font-semibold transition",
                              isActive
                                ? "bg-[#7ac943] text-white"
                                : "bg-transparent text-white/85 hover:text-white",
                            ].join(" ")}
                          >
                            {it}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage >= totalPages}
                      className={[
                        "grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-base font-semibold",
                        currentPage >= totalPages
                          ? "text-slate-300"
                          : "text-slate-700 hover:bg-slate-50",
                      ].join(" ")}
                      aria-label="Next page"
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {activeInquiry ? (
              <div className="fixed inset-0 z-50">
                <button
                  type="button"
                  className="absolute inset-0 bg-black/40"
                  aria-label="Close inquiry detail"
                  onClick={closeInquiry}
                />

                <aside className="absolute right-0 top-0 h-full w-full max-w-[520px] bg-white shadow-2xl">
                  <div className="flex items-start justify-between gap-4 px-10 py-8">
                    <div>
                      <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">
                        Inquiry Detail
                      </h3>

                      <div className="mt-8">
                        <div className="text-base font-bold text-slate-700">
                          {activeInquiry.subject}
                        </div>
                        {(() => {
                          const parts = formatDetailDateParts(activeInquiry.receivedAt);
                          return (
                            <div className="mt-3 text-base font-semibold leading-tight text-slate-600">
                              <div>{parts.dateTimeLine}</div>
                              <div>{formatRelativeTime(activeInquiry.receivedAt)}</div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={closeInquiry}
                      aria-label="Close"
                      className="grid h-10 w-10 place-items-center rounded-full border-2 border-black text-xl font-bold"
                    >
                      ×
                    </button>
                  </div>

                  <div className="px-10 pb-10">
                    <h4 className="text-2xl font-extrabold text-slate-900">
                      Inquired Person
                    </h4>

                    <div className="mt-6 grid grid-cols-2 gap-y-5">
                      <div className="text-base font-semibold text-slate-600">Name</div>
                      <div className="text-base font-semibold text-slate-700">
                        {activeInquiry.name}
                      </div>

                      <div className="text-base font-semibold text-slate-600">Email</div>
                      <div className="text-base font-semibold text-slate-700">
                        {activeInquiry.email}
                      </div>

                      <div className="text-base font-semibold text-slate-600">
                        Phone Number
                      </div>
                      <div className="text-base font-semibold text-slate-700">
                        {activeInquiry.phone}
                      </div>
                    </div>

                    <h4 className="mt-10 text-2xl font-extrabold text-slate-900">Message</h4>
                    <p className="mt-4 text-base font-semibold text-slate-600">
                      {activeInquiry.message}
                    </p>

                    <button
                      type="button"
                      className="mt-8 border border-black bg-white px-4 py-2 text-sm font-semibold"
                      onClick={() => toggleRead(activeInquiry.id)}
                    >
                      Mark as {activeInquiry.read ? "Unread" : "Read"}
                    </button>
                  </div>
                </aside>
              </div>
      ) : null}
    </div>
  </div>
  );
}

export default Home;