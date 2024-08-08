import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEle = document.getElementById("root");

if (rootEle) {
  ReactDOM.createRoot(rootEle).render(<App />);
}
