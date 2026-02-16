import {BrowserRouter, Routes, Route} from "react-router-dom";

import SplashPage from "./pages/SplashPage";
import SetupPage from "./pages/SetupPage";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import TransactionsPage from "./pages/TransactionsPage";
import SettingsPage from "./pages/SettingsPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage/>}/>
        <Route path="/setup" element={<SetupPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/calendar" element={<CalendarPage/>}/>
        <Route path="/transactions" element={<TransactionsPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
