import { StrictMode } from "react"; // the brain
import { createRoot } from "react-dom/client"; // the browser
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router";
import { ConfigProvider, App as AntdApp } from "antd";
// import './index.css'
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider>
      <AntdApp>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  </StrictMode>,
);
