import { getSettings, getBalance, setBalance as saveBalanceToDB } from "../backend/db";
import { onSettingsChanged } from "../utils/events";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/sharedlayout.css";

import homeIcon from "../assets/images/home.svg";
import calendarIcon from "../assets/images/calendar.svg";
import transactionsIcon from "../assets/images/transactions.svg";
import settingsIcon from "../assets/images/settings.svg";

interface SharedLayoutProps {
  children: React.ReactNode;
  currentPage: "home" | "calendar" | "transactions" | "settings";
}

export default function SharedLayout({ children, currentPage }: SharedLayoutProps) {
  const navigate = useNavigate();

  const [savedBalance, setSavedBalance] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>("EUR");
  const [name, setName] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    async function load() {
      const settings = await getSettings();
      if (!settings) {
        navigate("/setup");
        return;
      }

      setName(settings.name);
      setCurrency(settings.currency);

      const bal = await getBalance();
      if (bal) setSavedBalance(bal.amount);
    }

    load();

    const unsubscribe = onSettingsChanged(() => { 
      load();
    }); 
    
    return unsubscribe;
  }, [navigate]);

  const formatBalance = (value: string) => {
    const num = Number(value);
    if (isNaN(num)) return value;

    const formatted = num.toLocaleString("en-US");

    switch (currency) {
      case "EUR": return `${formatted} €`;
      case "USD": return `$${formatted}`;
      case "GBP": return `£${formatted}`;
      case "JPY": return `¥${formatted}`;
      case "CHF": return `${formatted} CHF`;
      case "SEK": return `${formatted} kr`;
      case "NOK": return `${formatted} kr`;
      default: return `${formatted} ${currency}`;
    }
  };

  const saveBalance = async () => {
    await saveBalanceToDB(balance);
    setSavedBalance(balance);
    setEditing(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="interface-container">
      <div className="interface-left">
        {name && (
          <h2 className="interface-greeting">Welcome back, {name}.</h2>
        )}

        <div className="balance-section">
          <div className="balance-row">
            <span className="balance-label">Your balance is:</span>

            {!editing ? (
              <span
                className="balance-display"
                onClick={() => {
                  setBalance(savedBalance || "");
                  setEditing(true);
                }}
              >
                {formatBalance(savedBalance || "")}
              </span>
            ) : (
              <input
                autoFocus
                className="balance-inline-input"
                type="text"
                value={balance}
                maxLength={8}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^\d*$/.test(v)) setBalance(v);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveBalance();
                  if (e.key === "Escape") setEditing(false);
                }}
                onBlur={() => setEditing(false)}
              />
            )}
          </div>
        </div>

        <nav className="interface-menu">
          <button
            className={`menu-item ${currentPage === "home" ? "active" : ""}`}
            onClick={() => handleNavigate("/home")}
          >
            <img src={homeIcon} alt="" className="menu-icon"/>
            Home
          </button>

          <button
            className={`menu-item ${currentPage === "calendar" ? "active" : ""}`}
            onClick={() => handleNavigate("/calendar")}
          >
            <img src={calendarIcon} alt="" className="menu-icon"/>
            Calendar
          </button>

          <button
            className={`menu-item ${currentPage === "transactions" ? "active" : ""}`}
            onClick={() => handleNavigate("/transactions")}
          >
            <img src={transactionsIcon} alt="" className="menu-icon"/>
            Transactions
          </button>

          <button
            className={`menu-item ${currentPage === "settings" ? "active" : ""}`}
            onClick={() => handleNavigate("/settings")}
          >
            <img src={settingsIcon} alt="" className="menu-icon"/>
            Settings
          </button>
        </nav>
      </div>

      <div className="interface-right">
        <div className="interface-content">
          {children}
        </div>
      </div>
    </div>
  );
}
