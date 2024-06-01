"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    const userId = localStorage.getItem("auth");
    if(!userId) router.replace('/login');
    else router.replace('/dashboard')
  })
  return (
    <p>Loading</p>
  );
}
