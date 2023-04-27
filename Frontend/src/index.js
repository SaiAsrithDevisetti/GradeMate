import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, useNavigate } from "react-router-dom";

ReactDOM.render(
  <div className="Body"> 
    <BrowserRouter>
        <App/>  
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);
