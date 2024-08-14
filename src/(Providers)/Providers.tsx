"use client";
import React from "react";
import Toast from "./Toast";
import Auth from "./Auth";
import { ThemeProvider } from "./theme-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toast />
        <Auth />
        {children}
      </ThemeProvider>
    </>
  );
}

export default Providers;
