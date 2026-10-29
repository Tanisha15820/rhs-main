import { getBaseApiUrl } from "../config/env";

/**
 * Call Booking Service & Availability Utilities
 *
 * Connects the RHS Contact Us page to:
 * - GET /api/contact-us/booked-dates
 * - POST /api/contact-us
 *
 * Enforces a maximum of 50 queries per date.
 */

export const MAX_BOOKINGS_PER_DAY = 50;
const STORAGE_KEY = "rhs_call_bookings_store_v1";

// In-memory cache synced with backend /api/contact-us/booked-dates
let cachedBookedDates = new Set();
let cachedDateCounts = {};

/**
 * Safely read local booking counts map: { "YYYY-MM-DD": number }
 */
export const getLocalBookingStore = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
};

/**
 * Safely save local booking counts map
 */
const saveLocalBookingStore = (store) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Ignore storage quota errors
  }
};

/**
 * Returns tomorrow's date formatted as YYYY-MM-DD (local time)
 * Past dates and today are disallowed when "only future dates" is enforced.
 */
export const getTomorrowDateString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Checks whether a YYYY-MM-DD date string is strictly in the future (tomorrow or later)
 */
export const isFutureDate = (dateStr) => {
  if (!dateStr) return false;
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) return false;

  const selected = new Date(year, month - 1, day);
  selected.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selected.getTime() > today.getTime();
};

/**
 * Formats YYYY-MM-DD into a human-friendly readable date (e.g., "Thu, Mar 28, 2026")
 */
export const formatDateDisplay = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) return dateStr;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Fetches fully booked dates (where query count >= 50) from GET /api/contact-us/booked-dates
 * and updates the in-memory & local availability store.
 *
 * @returns {Promise<{ bookedDates: string[], dateCounts: Record<string, number>, maxCapacity: number }>}
 */
export const fetchBookedDates = async () => {
  const apiUrl = getBaseApiUrl();
  try {
    const response = await fetch(`${apiUrl}/contact-us/booked-dates`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      const bookedList = Array.isArray(data.bookedDates) ? data.bookedDates : [];
      const countsMap =
        data.dateCounts && typeof data.dateCounts === "object"
          ? data.dateCounts
          : {};

      cachedBookedDates = new Set(bookedList);
      cachedDateCounts = { ...countsMap };

      const store = getLocalBookingStore();
      Object.entries(countsMap).forEach(([dateKey, count]) => {
        store[dateKey] = Number(count) || 0;
      });
      bookedList.forEach((dateKey) => {
        if ((store[dateKey] || 0) < MAX_BOOKINGS_PER_DAY) {
          store[dateKey] = MAX_BOOKINGS_PER_DAY;
        }
      });
      saveLocalBookingStore(store);

      window.dispatchEvent(new Event("rhs_availability_updated"));

      return {
        bookedDates: bookedList,
        dateCounts: countsMap,
        maxCapacity: Number(data.maxCapacity) || MAX_BOOKINGS_PER_DAY,
      };
    }
  } catch {
    // Graceful fallback to local store if backend is unreachable
  }

  const localStore = getLocalBookingStore();
  const fallbackBooked = Object.entries(localStore)
    .filter(([, count]) => count >= MAX_BOOKINGS_PER_DAY)
    .map(([date]) => date);

  return {
    bookedDates: fallbackBooked,
    dateCounts: localStore,
    maxCapacity: MAX_BOOKINGS_PER_DAY,
  };
};

/**
 * Fetches booking availability for a specific date from GET /api/contact-us/booked-dates?date=YYYY-MM-DD
 *
 * @param {string} dateStr - "YYYY-MM-DD"
 * @returns {Promise<{
 *   date: string,
 *   hasData: boolean,
 *   totalCapacity: number,
 *   bookedCount: number | null,
 *   remainingSlots: number | null,
 *   isFullyBooked: boolean,
 *   status: 'available' | 'full' | 'unknown'
 * }>}
 */
export const fetchDateAvailability = async (dateStr) => {
  if (!dateStr) {
    return {
      date: "",
      hasData: false,
      totalCapacity: MAX_BOOKINGS_PER_DAY,
      bookedCount: null,
      remainingSlots: null,
      isFullyBooked: false,
      status: "unknown",
    };
  }

  const apiUrl = getBaseApiUrl();
  try {
    const response = await fetch(
      `${apiUrl}/contact-us/booked-dates?date=${encodeURIComponent(dateStr)}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const totalCapacity = Number(data.maxCapacity) || MAX_BOOKINGS_PER_DAY;
      const bookedCount = Number(
        data.bookedCount ?? data.dateCounts?.[dateStr] ?? 0
      );
      const remainingSlots = Math.max(0, totalCapacity - bookedCount);
      const isFullyBooked =
        Boolean(data.isFullyBooked) ||
        bookedCount >= totalCapacity ||
        (Array.isArray(data.bookedDates) && data.bookedDates.includes(dateStr));

      if (Array.isArray(data.bookedDates)) {
        cachedBookedDates = new Set(data.bookedDates);
      }
      if (data.dateCounts && typeof data.dateCounts === "object") {
        cachedDateCounts = { ...data.dateCounts };
      }

      const store = getLocalBookingStore();
      store[dateStr] = bookedCount;
      saveLocalBookingStore(store);

      return {
        date: dateStr,
        hasData: true,
        totalCapacity,
        bookedCount,
        remainingSlots,
        isFullyBooked,
        status: isFullyBooked ? "full" : "available",
      };
    }
  } catch {
    // Fallback to cached/local store if backend is unreachable
  }

  const localStore = getLocalBookingStore();
  if (
    Object.prototype.hasOwnProperty.call(cachedDateCounts, dateStr) ||
    Object.prototype.hasOwnProperty.call(localStore, dateStr)
  ) {
    const bookedCount = Number(
      cachedDateCounts[dateStr] ?? localStore[dateStr] ?? 0
    );
    const remainingSlots = Math.max(0, MAX_BOOKINGS_PER_DAY - bookedCount);
    const isFullyBooked =
      cachedBookedDates.has(dateStr) || bookedCount >= MAX_BOOKINGS_PER_DAY;

    return {
      date: dateStr,
      hasData: true,
      totalCapacity: MAX_BOOKINGS_PER_DAY,
      bookedCount,
      remainingSlots,
      isFullyBooked,
      status: isFullyBooked ? "full" : "available",
    };
  }

  return {
    date: dateStr,
    hasData: true,
    totalCapacity: MAX_BOOKINGS_PER_DAY,
    bookedCount: 0,
    remainingSlots: MAX_BOOKINGS_PER_DAY,
    isFullyBooked: false,
    status: "available",
  };
};

/**
 * Returns a Set of known fully-booked dates (count >= 50)
 * combining backend /api/contact-us/booked-dates and local store.
 */
export const getKnownFullyBookedDates = () => {
  const store = getLocalBookingStore();
  const fullDates = new Set(cachedBookedDates);
  Object.entries(store).forEach(([date, count]) => {
    if (count >= MAX_BOOKINGS_PER_DAY) {
      fullDates.add(date);
    }
  });
  return fullDates;
};

/**
 * Records a booking for a given date in the local store and returns updated availability.
 */
export const recordDateBooking = (dateStr) => {
  if (!dateStr) return null;
  const store = getLocalBookingStore();
  const currentCount = Number(store[dateStr] || 0);

  if (currentCount >= MAX_BOOKINGS_PER_DAY) {
    return {
      success: false,
      error:
        "This date has reached its maximum limit of 50 call bookings. Please select another date.",
      bookedCount: currentCount,
      remainingSlots: 0,
      isFullyBooked: true,
    };
  }

  const nextCount = currentCount + 1;
  store[dateStr] = nextCount;
  saveLocalBookingStore(store);

  if (nextCount >= MAX_BOOKINGS_PER_DAY) {
    cachedBookedDates.add(dateStr);
  }
  cachedDateCounts[dateStr] = nextCount;
  window.dispatchEvent(new Event("rhs_availability_updated"));

  return {
    success: true,
    bookedCount: nextCount,
    remainingSlots: Math.max(0, MAX_BOOKINGS_PER_DAY - nextCount),
    isFullyBooked: nextCount >= MAX_BOOKINGS_PER_DAY,
  };
};

/**
 * Submits the Contact Us form along with the selected call booking date
 * to POST /api/contact-us.
 *
 * @param {Object} formPayload - Contact form data including callDate
 */
export const submitContactWithBooking = async (formPayload) => {
  const { callDate } = formPayload;

  if (!callDate || !isFutureDate(callDate)) {
    throw new Error("Please select a valid future date for your call.");
  }

  const clientName =
    formPayload.client_name ||
    [formPayload.title, formPayload.firstName, formPayload.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

  const payload = {
    client_name: clientName,
    client_email: (formPayload.email || "").trim(),
    client_phone: (formPayload.mobile || "").trim(),
    query_message: (formPayload.requirements || "").trim(),
    selected_date: callDate,
    ...formPayload,
    preferredCallDate: callDate,
  };

  const apiUrl = getBaseApiUrl();
  const response = await fetch(`${apiUrl}/contact-us`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Handle concurrent capacity limit reached (>= 50 bookings)
    if (
      data?.code === "DATE_FULLY_BOOKED" ||
      response.status === 409 ||
      (response.status === 400 &&
        typeof data?.message === "string" &&
        data.message.toLowerCase().includes("fully booked"))
    ) {
      cachedBookedDates.add(callDate);
      cachedDateCounts[callDate] = MAX_BOOKINGS_PER_DAY;
      const store = getLocalBookingStore();
      store[callDate] = MAX_BOOKINGS_PER_DAY;
      saveLocalBookingStore(store);
      window.dispatchEvent(new Event("rhs_availability_updated"));

      const err = new Error(
        data.message ||
          "The selected date is fully booked (maximum 50 queries reached). Please choose another date."
      );
      err.code = "DATE_FULLY_BOOKED";
      throw err;
    }

    throw new Error(
      data?.message || "Failed to submit your query. Please try again."
    );
  }

  // Update local cache with the latest count from backend
  const updatedCount = Number(
    data.bookedCount ?? (cachedDateCounts[callDate] || 0) + 1
  );
  cachedDateCounts[callDate] = updatedCount;
  if (updatedCount >= MAX_BOOKINGS_PER_DAY) {
    cachedBookedDates.add(callDate);
  }
  const store = getLocalBookingStore();
  store[callDate] = updatedCount;
  saveLocalBookingStore(store);
  window.dispatchEvent(new Event("rhs_availability_updated"));

  return {
    success: true,
    mode: "backend",
    data,
  };
};
