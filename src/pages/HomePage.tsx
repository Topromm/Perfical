import SharedLayout from "../components/SharedLayout";
import Calendar from "../components/Calendar";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [topCalendars, setTopCalendars] = useState(1);
  const [bottomCalendars, setBottomCalendars] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      let top = 1;
      if (window.innerWidth > 1650) {
        top = 3;
      } else if (window.innerWidth > 1220) {
        top = 2;
      }
      setTopCalendars(top);

      let bottom = 0;
      if (window.innerHeight > 840) {
        bottom = top;
      }
      setBottomCalendars(bottom);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SharedLayout currentPage="home">
      <div className="calendar-container">
        <div className="calendar-row">
          {Array.from({ length: topCalendars }, (_, i) => (
            <Calendar key={i} monthOffset={i} />
          ))}
        </div>
        {bottomCalendars > 0 && (
          <div className="calendar-row">
            {Array.from({ length: bottomCalendars }, (_, i) => (
              <Calendar key={topCalendars + i} monthOffset={topCalendars + i} />
            ))}
          </div>
        )}
      </div>
    </SharedLayout>
  );
}
