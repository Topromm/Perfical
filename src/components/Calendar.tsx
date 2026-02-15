import {useState} from "react";
import "../styles/calendar.css";

export default function Calendar() {
  const today = new Date();
  const [currentDate] = useState(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const setup = localStorage.getItem("perficalSetup");
  const firstDayPref = setup ? JSON.parse(setup).firstDay : "monday";

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
