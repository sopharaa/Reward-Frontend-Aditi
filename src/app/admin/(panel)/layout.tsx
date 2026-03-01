"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/layouts/AdminSidebar";
// import "bootstrap/dist/css/bootstrap.min.css"
export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" precedence="default" />
            <link rel="stylesheet" href="/css/admin-style.css" precedence="default" />
            <link rel="stylesheet" href="/css/manage-users.css" precedence="default" />

            <div className="admin-container">
                {/* Sidebar */}
               <AdminSidebar />

                <div className="content">
                    {children}
                </div>
            </div>
        </>
    );
}
