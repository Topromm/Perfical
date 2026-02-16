import SharedLayout from "../components/SharedLayout";
import Calendar from "../components/Calendar";

export default function CalendarPage() {
  return (
    <SharedLayout currentPage="calendar">
      <Calendar/>
    </SharedLayout>
  );
}
