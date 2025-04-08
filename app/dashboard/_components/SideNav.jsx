"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";
import Image from "next/image";
import React, { use, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function SideNav() {
    const { user } = useKindeBrowserClient();
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutIcon,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Students",
            icon: GraduationCap,
            path: "/dashboard/students",
        },
        {
            id: 3,
            name: "Attendance",
            icon: Hand,
            path: "/dashboard/attendance",
        },
        {
            id: 4,
            name: "Settings",
            icon: Settings,
            path: "/dashboard/settings",
        },
    ];

    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }
    , [path]);

    return (
        <div className="border shadow-md h-screen bg-white dark:bg-gray-800">
            <Image
                src={"/logo.svg"}
                alt="logo"
                width={180}
                height={50}
                className="mx-auto my-4"
            />

            <hr className="my-5" />

            {menuList.map((menu) => (
                <Link key={menu.id} href= {menu.path}>
                <h2
                    className={`flex items-center gap-3 text-md p-4 ml-2 mr-2
                         text-slate-500 hover:bg-blue-800 hover:text-white 
                         rounded-lg cursor-pointer my-2
                         ${path === menu.path ? "bg-blue-800 text-white" : ""}
                         `}>
                    <menu.icon />
                    {menu.name}
                </h2>
                </Link>
            ))}

            <div className="flex gap-2 items-center bottom-5 fixed p-2">
                <Image
                    src={"/225-default-avatar.svg" || user?.picture} // Use default image if empty
                    width={35}
                    height={35}
                    className="rounded-full"
                    alt="user"
                />
                <div>
                    <h2 className="text-sm font-bold">{user?.given_name} {user?.family_name}</h2>
                    <h2 className="text-xs text-slate-400">{user?.email} </h2>
                </div>
            </div>

        </div>
    );
}
