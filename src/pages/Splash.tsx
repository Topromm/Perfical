import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/splash.css";
import githubIcon from "../assets/images/github.svg";
import {open} from "@tauri-apps/plugin-shell";
import BlobBackground from "../components/BlobBackground";

export default function Splash() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

const handleLogoClick = () => {
  setExiting(true);

  setTimeout(() => {
    const setup = localStorage.getItem("perficalSetup");
    if (setup) {
      navigate("/overview");
    } else {
      navigate("/setup");
    }
  }, 800);
};


return (
  <div className="splash-wrapper">
    <canvas className="cursor-canvas"></canvas>

    <BlobBackground className={exiting ? "blob-exit" : ""} />

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
      <img src={githubIcon} alt="GitHub" />
      <span className="github-tooltip">github.com/Topromm/Perfical</span>
    </button>
  </div>
);
}
