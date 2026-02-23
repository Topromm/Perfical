import { useState, useEffect } from "react";
import { getSettings } from "../backend/db";
import "../styles/calendar.css";

export default function Calendar({ monthOffset = 0 }: { monthOffset?: number }) {
  const today = new Date();
  const [currentDate] = useState(
    new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)
  );

  const [firstDayPref, setFirstDayPref] = useState<"monday" | "sunday">("monday");

  useEffect(() => {
    async function load() {
      const settings = await getSettings();
      if (!settings) return;
      setFirstDayPref(settings.firstDay as "monday" | "sunday");
    }
    load();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const weekdays =
    firstDayPref === "sunday"
      ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const jsFirstDay = new Date(year, month, 1).getDay();

  const offset =
    firstDayPref === "sunday"
      ? jsFirstDay
      : (jsFirstDay + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const totalCells = offset + daysInMonth;
  const trailingEmpty = 42 - totalCells;

  return (
    <div className="calendar">
      <h2 className="calendar-title">
        {currentDate.toLocaleString("default", { month: "long" })} {year}
      </h2>

      <div className="calendar-grid">
        {weekdays.map((d) => (
          <div key={d} className="calendar-weekday">
            {d}
          </div>
        ))}

        {Array(offset)
          .fill(null)
          .map((_, i) => (
            <div key={"empty-start-" + i} className="calendar-empty"></div>
          ))}

        {days.map((day) => {
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={day}
              className={`calendar-day ${isToday ? "today" : ""}`}
            >
              {day}
            </div>
          );
        })}

        {Array(trailingEmpty)
          .fill(null)
          .map((_, i) => (
            <div key={"empty-end-" + i} className="calendar-empty"></div>
          ))}
      </div>
    </div>
  );
}
