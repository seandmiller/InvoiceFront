import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Clientpayment from "./pages/clientpay";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact={true} path="/" element={<App />} />

        <Route path="/pay/:data" element={<Clientpayment />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
