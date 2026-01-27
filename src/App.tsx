import "./App.css"
import githubIcon from "./assets/github.svg"
import { open } from "@tauri-apps/plugin-shell"

function App() {

  return (
    <>
      <div className="perfical-container">
        <h1 className="perfical-title">Perfical</h1>
        <p className="perfical-tagline">Money made clear, year after year.</p>
      </div>
<button
  className="github-link"
  onClick={() => open("https://github.com/Topromm/Perfical").catch(err => console.error(err))}
>
  <img src={githubIcon} alt="GitHub"/>
</button>

    </>
  )
}

export default App
