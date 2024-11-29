import React from "react";
import NavbarHome from "./Navbar";
import { Outlet } from "react-router-dom";

export default function LayoutHome() {
    return (
        <>
            { /* Navbar */ }
            <NavbarHome />
            { /* Content */ }
            <div className="container mx-auto">
                <Outlet />
            </div>
            { /* Footer */ }

        </>
    );
}