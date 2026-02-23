import BlobBackground from "../components/BlobBackground";
import githubIcon from "../assets/images/github.svg";
import {open} from "@tauri-apps/plugin-shell";
import {useNavigate} from "react-router-dom";
import { getSettings } from "../backend/db";
import {useEffect, useState} from "react";
import "../styles/splashpage.css";

export default function SplashPage() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  const handleLogoClick = async () => {
    setExiting(true);

    setTimeout(async () => {
      const settings = await getSettings();

      if (!settings) {
        navigate("/setup");
        return;
      }

      if (settings.skipSplash) {
        navigate("/home");
        return;
      }

      navigate("/home");
    }, 800);
  };

  useEffect(() => {
  async function check() {
    const settings = await getSettings();
    if (settings && settings.skipSplash) {
      navigate("/home");
    }
  }
  check();
}, []);


  return (
    <div className="splash-wrapper">
      <canvas className="cursor-canvas"></canvas>

      <BlobBackground className={exiting ? "blob-exit" : ""}/>

      <div
        className={`perfical-container ${exiting ? "splash-exit" : ""}`}
        onClick={handleLogoClick}
      >
        <div className="perfical-inner">
          <h1 className="perfical-title">Perfical</h1>
          <p className="perfical-tagline">Money made clear, year after year.</p>
        </div>
      </div>

      <button
        className={`github-link ${exiting ? "github-exit" : ""}`}
        onClick={() =>
          open("https://github.com/Topromm/Perfical").catch(console.error)
        }
      >
        <img src={githubIcon} alt="GitHub"/>
        <span className="github-tooltip">github.com/Topromm/Perfical</span>
      </button>

      <button
        className={`buymeacoffee-link ${exiting ? "buymeacoffee-exit" : ""}`}
        onClick={() =>
          open("https://www.buymeacoffee.com/wanrell").catch(console.error)
        }
      >
        <img src="/src/assets/images/buymeacoffee.svg" alt="Buy me a coffee"/>
        <span className="buymeacoffee-tooltip">Buy me a coffee</span>
      </button>
    </div>
  );
}
