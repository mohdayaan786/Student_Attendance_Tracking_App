"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ClipboardList, LogOut } from "lucide-react"; // Import icons

export default function Header() {
    const { user } = useKindeBrowserClient(); // Get user details

    const handleLogout = () => {
        window.location.href = "/api/auth/logout"; // Redirect to logout route
    };

    return (
        <div className="p-4 shadow-md border flex justify-between items-center bg-white">
            {/* Stylish Header with Icon */}
            <div className="flex items-center gap-2 text-blue-600">
                <ClipboardList size={28} className="text-blue-500" />
                <h1 className="text-2xl font-bold tracking-wide">
                    Manage <span className="text-blue-700">Attendance</span> with Ease ⚡⚡⚡
                </h1>
            </div>

            <div className="flex items-center gap-4">
                {/* User Profile Picture */}
                <Image
                    src={user?.picture || "/225-default-avatar.svg"}
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-300 shadow-sm"
                    alt="user"
                />
                {/* Logout Button with Icon */}
                <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="flex items-center gap-2"
                >
                    <LogOut size={18} /> Logout
                </Button>
            </div>
        </div>
    );
}
