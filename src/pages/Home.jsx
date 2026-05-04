import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import DashboardSummaryCards from "../components/home/DashboardSummaryCards";
import InquiryDetailDrawer from "../components/home/InquiryDetailDrawer";
import InquiryFilters from "../components/home/InquiryFilters";
import InquiryPagination from "../components/home/InquiryPagination";
import InquiryTable from "../components/home/InquiryTable";
import { useContactFormsData, useProjectsData, useServicesData } from "../hooks/useApiData";
import {
  formatInquiryDateTime,
  formatRelativeTime,
  getStatusForReadState,
  monthNames,
  normalizeContactForm,
  readStarredInquiryIds,
  writeStarredInquiryIds,
} from "../components/home/inquiryUtils";

function Home() {
  const navigate = useNavigate();
  const { contactForms, loading, error, updateStatus } = useContactFormsData();
  const { services } = useServicesData();
  const { projects } = useProjectsData();
  const [inquiry, setInquiry] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [activeInquiryId, setActiveInquiryId] = useState(null);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("everzone:navbar-visibility", {
        detail: { hidden: activeInquiryId != null },
      })
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("everzone:navbar-visibility", {
          detail: { hidden: false },
        })
      );
    };
  }, [activeInquiryId]);

  useEffect(() => {
    const starredIds = readStarredInquiryIds();
    setInquiry(
      (contactForms || []).map((form) => {
        const normalized = normalizeContactForm(form);
        return {
          ...normalized,
          starred: starredIds.has(String(normalized.id)),
        };
      })
    );
  }, [contactForms]);

  const monthOptions = useMemo(() => {
    const seen = new Set();

    return inquiry
      .map((item) => new Date(item.receivedAt))
      .filter((date) => !Number.isNaN(date.getTime()))
      .sort((left, right) => right.getTime() - left.getTime())
      .map((date) => {
        const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        const label = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        return { value, label };
      })
      .filter((option) => {
        if (seen.has(option.value)) return false;
        seen.add(option.value);
        return true;
      });
  }, [inquiry]);

  const filteredInquiries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return inquiry.filter((item) => {
      if (filter === "Read") return item.read;
      if (filter === "Unread") return !item.read;
      if (showStarredOnly && !item.starred) return false;
      if (selectedMonth !== "all") {
        const date = new Date(item.receivedAt);
        const itemMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        if (itemMonth !== selectedMonth) return false;
      }
      if (!query) return true;

      const haystack = [item.name, item.email, item.phone, item.subject, item.message]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [filter, inquiry, searchQuery, selectedMonth, showStarredOnly]);

  const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / pageSize));

  const currentPage = Math.min(page, totalPages);
  const pagedInquiries = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredInquiries.slice(start, start + pageSize);
  }, [currentPage, filteredInquiries]);

  const setFilterAndResetPage = (value) => {
    setFilter(value);
    setPage(1);
  };

  const toggleStarredFilter = () => {
    setShowStarredOnly((prev) => !prev);
    setPage(1);
  };

  const updateStarredInquiryIds = (nextInquiry) => {
    writeStarredInquiryIds(
      new Set(nextInquiry.filter((item) => item.starred).map((item) => String(item.id)))
    );
  };

  const toggleStarred = (id) => {
    setInquiry((prev) => {
      const nextInquiry = prev.map((item) =>
        item.id === id ? { ...item, starred: !item.starred } : item
      );
      updateStarredInquiryIds(nextInquiry);
      return nextInquiry;
    });
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

  const summaryItems = [
    { label: "Services", value: services.length, to: "/Services" },
    { label: "Projects", value: projects.length, to: "/Projects" },
  ];

  return (
    <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] min-h-screen bg-white pb-8">
      <div aria-hidden="true" className="h-[54px] w-full bg-[#2c6480]" />

      <div className="relative z-10 mx-auto -mt-6 w-full overflow-hidden rounded-t-[44px] bg-white px-8 pb-10 pt-10 sm:px-14 lg:px-20">
        <h1 className="text-3xl font-semibold text-slate-800">Dashboard</h1>

        <DashboardSummaryCards items={summaryItems} onNavigate={navigate} />

        <section className="mt-10 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="px-6 py-5">
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

            <InquiryFilters
              filter={filter}
              monthOptions={monthOptions}
              searchQuery={searchQuery}
              selectedMonth={selectedMonth}
              showStarredOnly={showStarredOnly}
              onFilterChange={setFilterAndResetPage}
              onMonthChange={(value) => {
                setSelectedMonth(value);
                setPage(1);
              }}
              onSearchChange={(value) => {
                setSearchQuery(value);
                setPage(1);
              }}
              onToggleStarredOnly={toggleStarredFilter}
            />
          </div>

          <InquiryTable
            error={error}
            inquiryCount={inquiry.length}
            loading={loading}
            pagedInquiries={pagedInquiries}
            onOpenInquiry={openInquiry}
            onToggleStarred={toggleStarred}
            formatDateTime={formatInquiryDateTime}
            formatRelativeTime={formatRelativeTime}
          />

          <InquiryPagination
            currentPage={currentPage}
            items={getPaginationItems()}
            totalPages={totalPages}
            onNext={() => setPage((previousPage) => Math.min(totalPages, previousPage + 1))}
            onPrevious={() => setPage((previousPage) => Math.max(1, previousPage - 1))}
            onSelectPage={setPage}
          />
        </section>

        <InquiryDetailDrawer
          inquiry={activeInquiry}
          onClose={closeInquiry}
          onToggleRead={toggleRead}
          onToggleStarred={toggleStarred}
          formatDateTime={formatInquiryDateTime}
          formatRelativeTime={formatRelativeTime}
        />
      </div>
    </div>
  );
}

export default Home;