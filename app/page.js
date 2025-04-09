"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { use } from "react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    redirect('/api/auth/login?post_login_redirect_url=/dashboard')
  }, [])
  return (
    <div>

    </div>
  );
}
