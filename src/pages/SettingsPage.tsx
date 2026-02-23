import { getSettings, updateSetting } from "../backend/db";
import SharedLayout from "../components/SharedLayout";
import { useState, useEffect } from "react";
import "../styles/settings.css";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [editingName, setEditingName] = useState(false);

  const [currency, setCurrency] = useState("EUR");
  const [firstDay, setFirstDay] = useState("monday");
  const [theme, setTheme] = useState("system");
  const [skipSplash, setSkipSplash] = useState(false);

  useEffect(() => {
    async function load() {
      const settings = await getSettings();
      if (!settings) return;

      setName(settings.name);
      setOriginalName(settings.name);
      setCurrency(settings.currency);
      setFirstDay(settings.firstDay);
      setSkipSplash(settings.skipSplash);
    }

    load();
  }, []);

  const saveName = async () => {
    await updateSetting("name", name);
    setOriginalName(name);
    setEditingName(false);
  };

  const cancelNameEdit = () => {
    setName(originalName);
    setEditingName(false);
  };

  const handleCurrencyChange = async (value: string) => {
    setCurrency(value);
    await updateSetting("currency", value);
  };

  const handleFirstDayChange = async (value: string) => {
    setFirstDay(value);
    await updateSetting("firstDay", value);
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
            <option value="EUR">Euro (€)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="GBP">British Pound (£)</option>
            <option value="JPY">Japanese Yen (¥)</option>
            <option value="CHF">Swiss Franc (CHF)</option>
            <option value="SEK">Swedish Krona (kr)</option>
            <option value="NOK">Norwegian Krone (kr)</option>
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
          <label className="settings-label">Theme (DISABLED)</label>
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

        <div className="settings-section checkbox-row">
          <label className="settings-label">Skip Splash Screen</label>
          <input
            type="checkbox"
            checked={skipSplash}
            onChange={async () => {
              const newValue = !skipSplash; 
              setSkipSplash(newValue); 
              await updateSetting("skipSplash", newValue);
          }}
          />
        </div>

      </div>
    </SharedLayout>
  );
}
