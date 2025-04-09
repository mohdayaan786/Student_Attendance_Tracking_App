"use client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useEffect, useState } from "react";

export default function LogoutButton() {
    const [logoutUrl, setLogoutUrl] = useState("");

    useEffect(() => {
        async function fetchLogoutUrl() {
            const { logout } = getKindeServerSession();
            setLogoutUrl(await logout());
        }
        fetchLogoutUrl();
    }, []);

    return (
        <button
            onClick={() => window.location.href = logoutUrl}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
            Logout
        </button>
    );
}
