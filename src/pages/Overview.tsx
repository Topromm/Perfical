import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/overview.css";

export default function Overview() {
  const navigate = useNavigate();

  const [name, setName] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>("EUR");
  const [balance, setBalance] = useState("");
  const [savedBalance, setSavedBalance] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

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
      case "EUR":
        return `${num} €`;
      case "SEK":
      case "NOK":
        return `${num} kr`;
      case "CHF":
        return `${num} CHF`;
      case "USD":
        return `$${num}`;
      case "GBP":
        return `£${num}`;
      case "JPY":
        return `¥${num}`;
      default:
        return `${num} ${currency}`;
    }
  };

  const saveBalance = () => {
    localStorage.setItem("balance", balance);
    setSavedBalance(balance);
    setEditing(false);
  };

  return (
    <div className="overview-container">
      {name && <h2 className="overview-greeting">Welcome back, {name}.</h2>}

      <div className="balance-section">
        <div className="balance-row">
          <h3 className="overview-title">Your balance is:</h3>

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
    </div>
  );
}
