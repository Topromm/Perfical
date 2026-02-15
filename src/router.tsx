import {BrowserRouter, Routes, Route} from "react-router-dom";

import Splash from "./pages/Splash";
import Setup from "./pages/Setup";
import Overview from "./pages/Overview";
/* import Calendar from "./pages/Calendar"; */
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash/>}/>
        <Route path="/setup" element={<Setup/>}/>
        <Route path="/overview" element={<Overview/>}/>
{/*         <Route path="/calendar" element={<Calendar/>}/> */}
        <Route path="/transactions" element={<Transactions/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </BrowserRouter>
  );
}
