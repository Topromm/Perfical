import {useEffect} from "react";
import Router from "./router";
import "./styles/App.css";

export default function App() {
  useEffect(() => {
    const handler = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);

  return <Router />;
}
