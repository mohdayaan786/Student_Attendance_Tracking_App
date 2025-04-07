"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'
import Image from 'next/image'

export default function Header() {
    const { user } = useKindeBrowserClient();
    return (
        <div className="p-4 shadow-sm border flex justify-between">
            <div>

            </div>
            <div>
                <Image
                    src={"/225-default-avatar.svg" || user?.picture} // Use default image if empty
                    width={35}
                    height={35}
                    className="rounded-full"
                    alt="user"
                />
            </div>
        </div>
    )
}
