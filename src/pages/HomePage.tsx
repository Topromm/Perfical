import SharedLayout from "../components/SharedLayout";
import Calendar from "../components/Calendar";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [showTwoCalendars, setShowTwoCalendars] = useState(false);
  const [showThreeCalendars, setShowThreeCalendars] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowTwoCalendars(window.innerWidth > 1220);
      setShowThreeCalendars(window.innerWidth > 1650);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SharedLayout currentPage="home">
      <div className="calendar-container">
        <Calendar monthOffset={0} />
        {showTwoCalendars && <Calendar monthOffset={1} />}
        {showThreeCalendars && <Calendar monthOffset={2} />}
      </div>
    </SharedLayout>
  );
}
