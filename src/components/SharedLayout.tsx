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
    const setup = localStorage.getItem("perficalSetup");
    if (!setup) {
      navigate("/setup");
      return;
    }

    const parsed = JSON.parse(setup);
    setName(parsed.name);
    setCurrency(parsed.currency);

    const stored = localStorage.getItem("balance");
    if (stored) setSavedBalance(stored);
  }, [navigate]);

  const formatBalance = (value: string) => {
    const num = Number(value);
    if (isNaN(num)) return value;

    switch (currency) {
      case "EUR": return `${num} €`;
      case "SEK":
      case "NOK": return `${num} kr`;
      case "CHF": return `${num} CHF`;
      case "USD": return `$${num}`;
      case "GBP": return `£${num}`;
      case "JPY": return `¥${num}`;
      default: return `${num} ${currency}`;
    }
  };

  const saveBalance = () => {
    localStorage.setItem("balance", balance);
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
