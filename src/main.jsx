import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {NextUIProvider} from "@nextui-org/system";
import { ToastContainer } from 'react-toastify';
import { Toaster } from "sonner";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NextUIProvider>
    <App />
    <ToastContainer />
    <Toaster position="top-right" richColors closeButton />
  </NextUIProvider>
);
