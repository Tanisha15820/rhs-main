import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Info,
  CalendarCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MAX_BOOKINGS_PER_DAY,
  getTomorrowDateString,
  isFutureDate,
  formatDateDisplay,
  fetchBookedDates,
  fetchDateAvailability,
  getKnownFullyBookedDates,
} from "../../utils/callBookingService";

/**
 * CallBookingSection
 *
 * Section inside RHS Contact Us form for date-based call booking.
 *
 * Requirements:
 * - Label: "Preferred Call Date *"
 * - Allows clients to select only future dates.
 * - Fully booked dates (50 bookings) are disabled and visually distinguished.
 * - Does not allow past dates to be selected.
 * - Helper text: "Select an available date for our team to contact you."
 * - Availability indicator showing remaining slots (e.g., "12 slots remaining")
 *   or "Fully booked", or graceful fallback when backend data is not yet available.
 * - Fully responsive on desktop, tablet, and mobile without horizontal overflow.
 */
const CallBookingSection = ({
  selectedDate,
  onDateSelect,
  error,
  setError,
}) => {
  const minDate = useMemo(() => getTomorrowDateString(), []);
  const [availability, setAvailability] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [fullyBookedDates, setFullyBookedDates] = useState(() => getKnownFullyBookedDates());

  // Current month displayed in the mini-calendar
  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return new Date(t.getFullYear(), t.getMonth(), 1);
  });

  // Fetch fully booked dates from /api/contact-us/booked-dates on mount and sync when store updates
  useEffect(() => {
    const handleUpdate = () => {
      setFullyBookedDates(getKnownFullyBookedDates());
    };
    fetchBookedDates().then(() => {
      handleUpdate();
    });
    window.addEventListener("rhs_availability_updated", handleUpdate);
    return () => window.removeEventListener("rhs_availability_updated", handleUpdate);
  }, []);

  // Fetch / evaluate availability whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate || !isFutureDate(selectedDate)) {
      return;
    }

    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) setIsLoading(true);
    }, 0);

    fetchDateAvailability(selectedDate)
      .then((data) => {
        if (!isMounted) return;
        setAvailability(data);
        setIsLoading(false);

        if (data.hasData && data.isFullyBooked) {
          if (setError) {
            setError(
              "This date has reached its maximum capacity of 50 bookings. Please select another date."
            );
          }
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setIsLoading(false);
        setAvailability({
          hasData: false,
          totalCapacity: MAX_BOOKINGS_PER_DAY,
          bookedCount: null,
          remainingSlots: null,
          isFullyBooked: false,
          status: "unknown",
        });
      });

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [selectedDate, setError]);

  // Handle direct date input change
  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (!value) {
        setAvailability(null);
        onDateSelect("");
        if (setError) setError("");
        return;
      }

      if (!isFutureDate(value)) {
        if (setError) {
          setError("Past dates and today cannot be selected. Please choose a future date.");
        }
        return;
      }

      if (fullyBookedDates.has(value)) {
        if (setError) {
          setError("This date is fully booked (50/50 slots filled). Please choose another date.");
        }
        return;
      }

      if (setError) setError("");
      onDateSelect(value);
    },
    [fullyBookedDates, onDateSelect, setError]
  );

  // Quick select helper
  const handleSelectDate = useCallback(
    (dateStr) => {
      if (!isFutureDate(dateStr)) return;
      if (fullyBookedDates.has(dateStr)) {
        if (setError) {
          setError("This date is fully booked (50/50 slots filled). Please choose another date.");
        }
        return;
      }
      if (setError) setError("");
      onDateSelect(dateStr);
    },
    [fullyBookedDates, onDateSelect, setError]
  );

  // Quick upcoming dates (next 4 business days)
  const quickDates = useMemo(() => {
    const dates = [];
    let count = 0;
    let dayOffset = 1;
    while (count < 4 && dayOffset < 14) {
      const d = new Date();
      d.setDate(d.getDate() + dayOffset);
      const dayOfWeek = d.getDay();
      if (dayOfWeek !== 0) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;
        const isFull = fullyBookedDates.has(dateStr);
        dates.push({
          dateStr,
          dayLabel: dayOffset === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" }),
          formatted: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          isFull,
        });
        count++;
      }
      dayOffset++;
    }
    return dates;
  }, [fullyBookedDates]);

  // Calendar matrix generator
  const calendarDays = useMemo(() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ type: "empty", key: `empty-${i}` });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= totalDaysInMonth; day++) {
      const thisDate = new Date(year, month, day);
      thisDate.setHours(0, 0, 0, 0);

      const isPast = thisDate.getTime() <= today.getTime();
      const monthStr = String(month + 1).padStart(2, "0");
      const dayStr = String(day).padStart(2, "0");
      const dateStr = `${year}-${monthStr}-${dayStr}`;

      const isFull = fullyBookedDates.has(dateStr);
      const isSelected = selectedDate === dateStr;

      days.push({
        type: "day",
        dayNumber: day,
        dateStr,
        isPast,
        isFull,
        isSelected,
        key: `day-${dateStr}`,
      });
    }

    return days;
  }, [currentMonthDate, fullyBookedDates, selectedDate]);

  const prevMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const activeAvailability = selectedDate ? availability : null;

  return (
    <motion.div
      className="rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50/40 via-white to-blue-50/20 p-4 sm:p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.65 }}
    >
      {/* Section Header */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0e78f9]">
            <CalendarCheck size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#102d68] sm:text-base">
              Schedule a Call
            </h3>
            <p className="text-[11px] text-slate-500">
              Select an available date for our team to contact you.
            </p>
          </div>
        </div>

        {/* Calendar View Toggle */}
        <button
          type="button"
          onClick={() => setShowCalendarView((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-md border border-blue-200 bg-white px-2.5 py-1 text-[11px] font-medium text-[#0e78f9] shadow-2xs hover:bg-blue-50 transition-colors"
        >
          <CalendarIcon size={12} />
          <span>{showCalendarView ? "Hide Calendar" : "Calendar View"}</span>
        </button>
      </div>

      {/* Main Grid: Date Input & Quick Selector */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Left Column: Date Input & Helper Text */}
        <div className="space-y-2.5">
          <div>
            <label
              htmlFor="call-date-input"
              className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-700"
            >
              <span>
                Preferred Call Date<span className="text-red-500">*</span>
              </span>
              <span className="text-[10px] font-normal text-slate-400">
                Future dates only
              </span>
            </label>

            <div className="relative">
              <input
                id="call-date-input"
                name="preferredCallDate"
                type="date"
                min={minDate}
                value={selectedDate || ""}
                onChange={handleInputChange}
                aria-label="Preferred Call Date"
                aria-required="true"
                className={`h-10 w-full rounded-md border bg-white px-3 pl-9 text-xs outline-none transition-colors placeholder:text-slate-400 ${
                  error
                    ? "border-red-400 focus:border-red-500 ring-1 ring-red-100"
                    : "border-slate-200 focus:border-[#0e78f9]"
                }`}
              />
              <CalendarIcon
                size={15}
                className="pointer-events-none absolute left-3 top-3 text-slate-400"
              />
            </div>

            {/* Error notice if invalid date or fully booked */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 flex items-center gap-1 text-[11px] text-red-600"
              >
                <AlertCircle size={12} className="shrink-0" />
                <span>{error}</span>
              </motion.p>
            )}

            {/* Helper Text */}
            <p className="mt-1 text-[11px] text-slate-500">
              Select an available date for our team to contact you.
            </p>
          </div>

          {/* Quick Date Chips */}
          <div>
            <p className="mb-1.5 text-[11px] font-medium text-slate-500">
              Quick Select Upcoming Dates:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {quickDates.map((q) => {
                const isSelected = selectedDate === q.dateStr;
                return (
                  <button
                    key={q.dateStr}
                    type="button"
                    disabled={q.isFull}
                    onClick={() => handleSelectDate(q.dateStr)}
                    className={`group relative flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] transition-all ${
                      q.isFull
                        ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 line-through opacity-70"
                        : isSelected
                        ? "border-[#0e78f9] bg-[#0e78f9] text-white shadow-2xs font-semibold"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/60"
                    }`}
                  >
                    <span className="font-medium">{q.dayLabel}</span>
                    <span
                      className={`text-[10px] ${
                        isSelected ? "text-blue-100" : "text-slate-400"
                      }`}
                    >
                      ({q.formatted})
                    </span>
                    {q.isFull && (
                      <span className="ml-0.5 rounded bg-red-100 px-1 py-0.2 text-[9px] font-bold text-red-600 no-underline">
                        Full
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Availability Indicator */}
        <div className="flex flex-col justify-between rounded-lg border border-blue-100 bg-white p-3.5 shadow-2xs">
          <div>
            <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Call Availability Status
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <Clock size={11} /> Max 50 calls/day
              </span>
            </div>

            {/* State 1: No date selected */}
            {!selectedDate && (
              <div className="py-2.5 text-center sm:text-left">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 sm:justify-start">
                  <Info size={14} className="text-[#0e78f9]" />
                  <span>No date selected yet</span>
                </div>
                <p className="mt-1 text-[11px] leading-4 text-slate-500">
                  Choose a preferred date from the picker or quick options to view booking slot availability.
                </p>
              </div>
            )}

            {/* State 2: Loading availability */}
            {selectedDate && isLoading && (
              <div className="py-3 text-center sm:text-left">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0e78f9] sm:justify-start">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0e78f9] border-t-transparent" />
                  <span>Checking slot availability...</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Querying capacity for {formatDateDisplay(selectedDate)}
                </p>
              </div>
            )}

            {/* State 3: Availability data available */}
            {selectedDate && !isLoading && activeAvailability?.hasData && (
              <div>
                {activeAvailability.isFullyBooked ? (
                  // Fully Booked State (>= 50 bookings)
                  <div className="rounded-md border border-red-200 bg-red-50/70 p-2.5 text-red-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-red-700">
                        <AlertCircle size={15} />
                        <span>Fully booked</span>
                      </div>
                      <span className="rounded bg-red-200/80 px-1.5 py-0.5 text-[10px] font-bold text-red-800">
                        50/50 filled
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-4 text-red-600">
                      This date ({formatDateDisplay(selectedDate)}) has reached its maximum capacity of 50 bookings. Please select an alternate date.
                    </p>
                  </div>
                ) : (
                  // Available Slots State (e.g. "12 slots remaining")
                  <div className="rounded-md border border-emerald-200 bg-emerald-50/60 p-2.5 text-emerald-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
                        <CheckCircle2 size={15} className="text-emerald-600" />
                        <span>{activeAvailability.remainingSlots} slots remaining</span>
                      </div>
                      <span className="rounded bg-emerald-200/70 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                        Available
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-emerald-700">
                      Confirmed for {formatDateDisplay(selectedDate)} •{" "}
                      {activeAvailability.bookedCount} of {activeAvailability.totalCapacity} slots booked.
                    </p>

                    {/* Capacity Progress Bar */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-emerald-200/60">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            ((activeAvailability.bookedCount || 0) / activeAvailability.totalCapacity) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* State 4: Graceful fallback when no backend data is available */}
            {selectedDate && !isLoading && (!activeAvailability || !activeAvailability.hasData) && (
              <div className="rounded-md border border-blue-100 bg-blue-50/50 p-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#102d68]">
                    <CheckCircle2 size={15} className="text-[#0e78f9]" />
                    <span>Date Selected: {formatDateDisplay(selectedDate)}</span>
                  </div>
                  <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-[#0e78f9]">
                    Requested
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-4 text-slate-600">
                  Your preferred call date has been selected. Remaining slots will be verified by our team (Max limit: 50 calls per date).
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                  * Availability data connection pending backend API setup.
                </p>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="mt-2 text-[10px] text-slate-400">
            Calls are scheduled during standard business hours (Mon – Fri).
          </div>
        </div>
      </div>

      {/* Expandable Calendar View */}
      <AnimatePresence>
        {showCalendarView && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden border-t border-blue-100 pt-3.5"
          >
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-bold text-[#102d68]">
                {currentMonthDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  aria-label="Previous Month"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  aria-label="Next Month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 pt-1">
              {calendarDays.map((item) => {
                if (item.type === "empty") {
                  return <div key={item.key} className="h-8" />;
                }

                const isDisabled = item.isPast || item.isFull;

                return (
                  <button
                    key={item.key}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSelectDate(item.dateStr)}
                    className={`relative flex h-8 flex-col items-center justify-center rounded text-xs transition-colors ${
                      item.isPast
                        ? "cursor-not-allowed text-slate-300 opacity-40"
                        : item.isFull
                        ? "cursor-not-allowed border border-red-200 bg-red-50 text-red-400 line-through"
                        : item.isSelected
                        ? "bg-[#0e78f9] font-bold text-white shadow-2xs"
                        : "text-slate-700 hover:bg-blue-100/70"
                    }`}
                  >
                    <span>{item.dayNumber}</span>
                    {item.isFull && (
                      <span className="absolute bottom-0.5 text-[8px] font-bold text-red-500 no-underline leading-none">
                        Full
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center justify-end gap-3 text-[10px] text-slate-500">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#0e78f9]" />
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span>Fully Booked (50/50)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span>Past Date</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CallBookingSection;
