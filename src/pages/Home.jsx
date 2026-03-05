import React, { useEffect, useMemo, useState } from "react";

function Home() {
  const [inquiry, setInquiry] = useState([
          {
            id: 1,
            name: "Thomas Miller",
            email: "thomas.miller@gmail.com",
            phone: "0812345678",
            subject: "Request for project timeline",
            message:
              "Hi EverZone team - could you share the expected timeline and key milestones for the Riverside renovation project?",
            receivedAt: "2026-01-01T16:30:00.000Z",
            read: false,
          },
          {
            id: 2,
            name: "Sarah Wilson",
            email: "sarah.wilson@gmail.com",
            phone: "0893456781",
            subject: "Service pricing inquiry",
            message:
              "Hello, I'm interested in your property management services. Can you send a breakdown of pricing and what's included?",
            receivedAt: "2026-01-02T09:12:00.000Z",
            read: true,
          },
          {
            id: 3,
            name: "Daniel Harris",
            email: "daniel.harris@gmail.com",
            phone: "0629876543",
            subject: "Availability for a site visit",
            message:
              "Can we schedule a site visit next week? Tuesday or Thursday afternoon would work best for me.",
            receivedAt: "2026-01-02T14:45:00.000Z",
            read: false,
          },
          {
            id: 4,
            name: "Emily Carter",
            email: "emily.carter@gmail.com",
            phone: "0912345670",
            subject: "Partnership opportunity",
            message:
              "We're a solar supplier and would love to explore a partnership for your upcoming developments. Who should I contact?",
            receivedAt: "2026-01-03T08:05:00.000Z",
            read: true,
          },
          {
            id: 5,
            name: "Michael Brown",
            email: "michael.brown@gmail.com",
            phone: "0817788990",
            subject: "Quotation request (maintenance)",
            message:
              "Could you provide a quotation for monthly maintenance for a 12-unit apartment building in Colombo 05?",
            receivedAt: "2026-01-04T11:22:00.000Z",
            read: false,
          },
          {
            id: 6,
            name: "Jessica Taylor",
            email: "jessica.taylor@gmail.com",
            phone: "0861122334",
            subject: "Update on my inquiry",
            message:
              "Hi, following up on my previous message. Any update on the feasibility study for the land plot I shared?",
            receivedAt: "2026-01-05T16:30:00.000Z",
            read: false,
          },
          {
            id: 7,
            name: "Noah Williams",
            email: "noah.williams@gmail.com",
            phone: "0925566778",
            subject: "Invoice / payment confirmation",
            message:
              "Hello, can you confirm you received the payment for invoice EZ-1042? I can send the transfer receipt if needed.",
            receivedAt: "2026-01-06T10:18:00.000Z",
            read: true,
          },
          {
            id: 8,
            name: "Sophia Davis",
            email: "sophia.davis@gmail.com",
            phone: "0801234567",
            subject: "Request for brochure",
            message:
              "Could you share your latest company brochure and a short portfolio of completed projects?",
            receivedAt: "2026-01-06T18:41:00.000Z",
            read: false,
          },
          {
            id: 9,
            name: "James Anderson",
            email: "james.anderson@gmail.com",
            phone: "0834567891",
            subject: "Construction permit guidance",
            message:
              "I'm new to the process - do you help with local permits and approvals? If yes, what documents do you need?",
            receivedAt: "2026-01-07T07:55:00.000Z",
            read: false,
          },
          {
            id: 10,
            name: "Olivia Martin",
            email: "olivia.martin@gmail.com",
            phone: "0940011223",
            subject: "Interior design consultation",
            message:
              "Do you offer interior design consultation for small office spaces? Looking for a modern, minimal setup.",
            receivedAt: "2026-01-07T12:10:00.000Z",
            read: true,
          },
          {
            id: 11,
            name: "Jacob Brown",
            email: "jacob.brown@gmail.com",
            phone: "0819900112",
            subject: "Project handover documents",
            message:
              "Can you send the final handover documents and warranty details for the Maple Street project?",
            receivedAt: "2026-01-08T09:30:00.000Z",
            read: true,
          },
          {
            id: 12,
            name: "Ethan Clark",
            email: "ethan.clark@gmail.com",
            phone: "0876655443",
            subject: "Request a callback",
            message:
              "Please call me when available. I'd like to discuss a small renovation and estimated cost range.",
            receivedAt: "2026-01-08T17:05:00.000Z",
            read: false,
          },
          {
            id: 13,
            name: "Grace Lee",
            email: "grace.lee@gmail.com",
            phone: "0823344556",
            subject: "Clarification on service scope",
            message:
              "For your supervision service, does it include weekly site reporting and contractor coordination?",
            receivedAt: "2026-01-09T11:47:00.000Z",
            read: false,
          },
          {
            id: 14,
            name: "Hannah Smith",
            email: "hannah.smith@gmail.com",
            phone: "0917788991",
            subject: "Meeting reschedule",
            message:
              "Hi, can we move tomorrow's meeting to Friday morning? Any time between 9-11 works.",
            receivedAt: "2026-01-10T13:22:00.000Z",
            read: true,
          },
          {
            id: 15,
            name: "William Thompson",
            email: "william.thompson@gmail.com",
            phone: "0809988776",
            subject: "Request for proposal",
            message:
              "We're inviting bids for a mixed-use development. Can you share an RFP template and your submission requirements?",
            receivedAt: "2026-01-11T08:14:00.000Z",
            read: false,
          },
          {
            id: 16,
            name: "Benjamin Walker",
            email: "benjamin.walker@gmail.com",
            phone: "0931234567",
            subject: "Complaint: delayed response",
            message:
              "I sent an inquiry last week and haven't heard back. Could someone please contact me today?",
            receivedAt: "2026-01-12T15:58:00.000Z",
            read: false,
          },
          {
            id: 17,
            name: "Chloe Adams",
            email: "chloe.adams@gmail.com",
            phone: "0855566778",
            subject: "Request for maintenance contract",
            message:
              "We need an annual maintenance contract for HVAC and electrical. Do you cover commercial buildings?",
            receivedAt: "2026-01-13T10:06:00.000Z",
            read: true,
          },
          {
            id: 18,
            name: "Ryan Scott",
            email: "ryan.scott@gmail.com",
            phone: "0881122334",
            subject: "Question about project warranty",
            message:
              "What’s the standard warranty period for workmanship and materials on completed projects?",
            receivedAt: "2026-01-14T19:40:00.000Z",
            read: false,
          },
        ]);

        const [filter, setFilter] = useState("All");
        const [page, setPage] = useState(1);
        const pageSize = 6;
        const [activeInquiryId, setActiveInquiryId] = useState(null);

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
          const dd = date.getDate();
          const months = [
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
          const month = months[date.getMonth()] ?? "";
          const yyyy = date.getFullYear();
          const hh = date.getHours();
          const min = String(date.getMinutes()).padStart(2, "0");
          const period = hh >= 12 ? "PM" : "AM";
          const hour = String(((hh + 11) % 12) + 1).padStart(2, "0");
          return {
            dateLine: `${dd} ${month} ${yyyy}`.toUpperCase(),
            timeLine: `${hour}:${min} ${period}`,
          };
        };

        const formatRelativeTime = (value) => {
          const diff = Date.now() - new Date(value).getTime();
          const minutes = Math.max(1, Math.round(diff / 60000));
          if (minutes < 60) return `${minutes} min ago`;
          const hours = Math.round(minutes / 60);
          if (hours < 24) return `${hours} hours ago`;
          const days = Math.round(hours / 24);
          if (days < 30) return `${days} days ago`;
          const months = Math.round(days / 30);
          if (months < 12) return `${months} months ago`;
          const years = Math.round(months / 12);
          return `${years} years ago`;
        };

        const formatDetailDateParts = (value) => {
          const date = new Date(value);
          const day = date.getDate();
          const months = [
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
          const month = months[date.getMonth()] ?? "";
          const year = date.getFullYear();
          const hh = String(date.getHours()).padStart(2, "0");
          const min = String(date.getMinutes()).padStart(2, "0");
          return {
            dateLine: `${day} ${month} ${year}`,
            timeLine: `${hh}:${min}`,
          };
        };

        const setFilterAndResetPage = (value) => {
          setFilter(value);
          setPage(1);
        };

        const toggleRead = (id) => {
          setInquiry((prev) =>
            prev.map((item) => (item.id === id ? { ...item, read: !item.read } : item))
          );
        };

        const openInquiry = (id) => {
          setActiveInquiryId(id);
          setInquiry((prev) => prev.map((it) => (it.id === id ? { ...it, read: true } : it)));
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
          <div className="w-full pb-10">
            <h1 className="text-3xl font-semibold text-slate-800">Dashboard</h1>

            <div className="mt-6 flex flex-wrap gap-4">
              {[
                { label: "Services", value: 5 },
                { label: "Projects", value: 12 },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="flex min-w-[150px] items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-slate-300"
                >
                  <span className="text-lg font-semibold text-slate-900">{item.value}</span>
                  <span className="text-sm font-medium text-slate-600">{item.label}</span>
                  <span className="ml-auto text-slate-700">
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
                      {pagedInquiries.length === 0 ? (
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
                                  {dateParts.dateLine}
                                </div>
                                <div className="text-xs text-slate-400">{dateParts.timeLine}</div>
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
                              <div>{parts.dateLine}</div>
                              <div>{parts.timeLine}</div>
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
  );
}

export default Home;