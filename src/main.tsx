import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/atkinson-hyperlegible-mono/400.css";
import { Arrival } from "./ui/Arrival";
import "./ui/arrival.css";

createRoot(document.getElementById("root")!).render(<React.StrictMode><Arrival /></React.StrictMode>);
