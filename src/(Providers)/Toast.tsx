'use client'
import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toast({ children }: { children: React.ReactNode }) {
    return <>
        <ToastContainer />
        {children}
    </>
}

export default Toast