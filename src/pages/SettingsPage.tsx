import SharedLayout from "../components/SharedLayout";
import "../styles/settings.css";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [editingName, setEditingName] = useState(false);

  const [currency, setCurrency] = useState("EUR");
  const [firstDay, setFirstDay] = useState("monday");
  const [theme, setTheme] = useState("system");
  const [skipSplash, setSkipSplash] = useState(false);

  useEffect(() => {
    const setup = localStorage.getItem("perficalSetup");
    if (setup) {
      const parsed = JSON.parse(setup);
      const storedName = parsed.name || "";
      const storedCurrency = parsed.currency || "EUR";
      const storedFirstDay = parsed.firstDay || "monday";

      setName(storedName);
      setOriginalName(storedName);
      setCurrency(storedCurrency);
      setFirstDay(storedFirstDay);
    }
  }, []);

  const updateSetupField = (field: "name" | "currency" | "firstDay", value: string) => {
    const setup = localStorage.getItem("perficalSetup");
    if (!setup) return;

    const parsed = JSON.parse(setup);
    parsed[field] = value;
    localStorage.setItem("perficalSetup", JSON.stringify(parsed));
  };

  const saveName = () => {
    updateSetupField("name", name);
    setOriginalName(name);
    setEditingName(false);
  };

  const cancelNameEdit = () => {
    setName(originalName);
    setEditingName(false);
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    updateSetupField("currency", value);
  };

  const handleFirstDayChange = (value: string) => {
    setFirstDay(value);
    updateSetupField("firstDay", value);
  };

  return (
    <SharedLayout currentPage="settings">
      <div className="settings-container">

        <h2 className="settings-title">Settings</h2>

        <div className="settings-section">
          <label className="settings-label">Display Name</label>

          {!editingName ? (
            <span
              className="settings-inline-display"
              onClick={() => setEditingName(true)}
            >
              {name || "Click to set name"}
            </span>
          ) : (
            <input
              autoFocus
              className="settings-input"
              value={name}
              maxLength={20}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") saveName();
                if (e.key === "Escape") cancelNameEdit();
              }}
              onBlur={cancelNameEdit}
            />
          )}
        </div>

        <div className="settings-section">
          <label className="settings-label">Currency</label>
          <select
            className="settings-input"
            value={currency}
            onChange={e => handleCurrencyChange(e.target.value)}
          >
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
            <option value="GBP">GBP (£)</option>
            <option value="SEK">SEK (kr)</option>
            <option value="NOK">NOK (kr)</option>
          </select>
        </div>

        <div className="settings-section">
          <label className="settings-label">First Day of Week</label>
          <select
            className="settings-input"
            value={firstDay}
            onChange={e => handleFirstDayChange(e.target.value)}
          >
            <option value="monday">Monday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>

        {/* THEME (placeholder) */}
        <div className="settings-section">
          <label className="settings-label">Theme</label>
          <select
            className="settings-input"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* SKIP SPLASH (placeholder) */}
        <div className="settings-section checkbox-row">
          <label className="settings-label">Skip Splash Screen</label>
          <input
            type="checkbox"
            checked={skipSplash}
            onChange={() => setSkipSplash(!skipSplash)}
          />
        </div>

      </div>
    </SharedLayout>
  );
}
