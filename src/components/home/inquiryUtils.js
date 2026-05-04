export const STARRED_INQUIRIES_STORAGE_KEY = "everzone_admin_starred_inquiries";

export const monthNames = [
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

export const readStarredInquiryIds = () => {
  if (typeof window === "undefined") return new Set();

  try {
    const rawValue = window.localStorage.getItem(STARRED_INQUIRIES_STORAGE_KEY);
    if (!rawValue) return new Set();

    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) return new Set();

    return new Set(parsed.map((value) => String(value)));
  } catch {
    return new Set();
  }
};

export const writeStarredInquiryIds = (ids) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    STARRED_INQUIRIES_STORAGE_KEY,
    JSON.stringify(Array.from(ids))
  );
};

export const normalizeContactForm = (form) => {
  const status = String(form?.status ?? "pending").toLowerCase();

  return {
    id: form.id,
    name: form.name ?? "Unknown",
    email: form.email ?? "-",
    phone: form.phone || "-",
    subject: form.subject?.trim() || `Inquiry from ${form.name ?? "Unknown"}`,
    message: form.message ?? "",
    receivedAt: form.time || form.created_at || new Date().toISOString(),
    starred: false,
    read: status !== "pending",
    status,
  };
};

export const getStatusForReadState = (nextRead, previousStatus) => {
  if (!nextRead) return "pending";

  return previousStatus === "responded" || previousStatus === "archived"
    ? previousStatus
    : "reviewed";
};

export const formatInquiryDateTime = (value) => {
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

export const formatRelativeTime = (value) => {
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