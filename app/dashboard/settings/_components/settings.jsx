"use client";
import { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut, Users, Bell, Lock, Globe } from "lucide-react";
import Image from "next/image";

export default function SettingsPage() {
    const { user } = useKindeBrowserClient(); // Get user info
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState("English");

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        setDarkMode(!darkMode);
    };

    const handleLogout = () => {
        window.location.href = "/api/auth/logout";
    };

    const handleSwitchAccount = () => {
        window.location.href = "/api/auth/login";
    };

    const handlePasswordChange = () => {
        window.location.href = "/update-password";
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg mt-5">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">⚙️ Settings</h1>
    
            {/* Profile Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
                <Image
                    src={user?.picture || "/225-default-avatar.svg"}
                    width={40}
                    height={40}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border border-gray-300"
                />
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {user?.given_name} {user?.family_name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                </div>
            </div>
    
            {/* Theme Toggle */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 dark:text-gray-300">Theme</span>
                <Button onClick={toggleTheme} variant="outline" className="flex items-center gap-2">
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </Button>
            </div>
    
            {/* Language Selection */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 dark:text-gray-300">Language</span>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="border px-3 py-1 rounded-md dark:bg-gray-800 dark:text-white"
                >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                </select>
            </div>
    
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 dark:text-gray-300">Notifications</span>
                <Button
                    onClick={() => setNotifications(!notifications)}
                    variant={notifications ? "default" : "outline"}
                    className="flex items-center gap-2"
                >
                    <Bell size={18} /> {notifications ? "Enabled" : "Disabled"}
                </Button>
            </div>
    
            {/* Change Password */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 dark:text-gray-300">Change Password</span>
                <Button onClick={handlePasswordChange} variant="secondary" className="flex items-center gap-2">
                    <Lock size={18} /> Update
                </Button>
            </div>
    
            {/* Switch Account */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 dark:text-gray-300">Switch Account</span>
                <Button onClick={handleSwitchAccount} variant="secondary" className="flex items-center gap-2">
                    <Users size={18} /> Switch
                </Button>
            </div>
    
            {/* Logout */}
            <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Logout</span>
                <Button onClick={handleLogout} variant="destructive" className="flex items-center gap-2">
                    <LogOut size={18} /> Logout
                </Button>
            </div>
        </div>
    );    
}