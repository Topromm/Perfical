import { initDB, updateSetting } from "../backend/db";
import { useNavigate } from "react-router-dom";
import "../styles/setuppage.css";
import { useState } from "react";

export default function SetupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [firstDay, setFirstDay] = useState("monday");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await initDB();

    await updateSetting("name", name);
    await updateSetting("currency", currency);
    await updateSetting("firstDay", firstDay);

    navigate("/home");
  };

  return (
    <div className="setup-container">
      <h2 className="setup-title">Welcome to Perfical</h2>

      <form className="setup-form" onSubmit={handleSubmit}>
        <label>
          Your name
          <input
            type="text"
            value={name}
            required
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Currency
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="EUR">Euro (€)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="GBP">British Pound (£)</option>
            <option value="JPY">Japanese Yen (¥)</option>
            <option value="CHF">Swiss Franc (CHF)</option>
            <option value="SEK">Swedish Krona (kr)</option>
            <option value="NOK">Norwegian Krone (kr)</option>
          </select>
        </label>

        <label>
          First day of the week
          <select
            value={firstDay}
            onChange={(e) => setFirstDay(e.target.value)}
          >
            <option value="monday">Monday</option>
            <option value="sunday">Sunday</option>
          </select>
        </label>

        <button type="submit" className="setup-submit">
          Continue
        </button>
      </form>
    </div>
  );
}
