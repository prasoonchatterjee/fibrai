"use client"

import { LandingPage } from "@/types/users";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [ownerLandingPages, setOwnerLandingPages] = useState<Array<LandingPage>>([]);
  const router = useRouter();

  useEffect(()=>{
    const userId = localStorage.getItem("auth");
    if(!userId) router.replace('/login');
  },[])

  useEffect(()=>{
    const ownerId = localStorage.getItem("auth");
    const allLPStr  = localStorage.getItem("LP");
    if(allLPStr) {
      const allLP:Array<LandingPage> = JSON.parse(allLPStr);
      if(allLP?.length) {
        const ownedLP = allLP.filter(lp=>lp.ownerId === ownerId);
        setOwnerLandingPages(ownedLP);
      }
    }
  },[])

  const renderAllLandingPages = () => {
    return ownerLandingPages.map((lp)=>(
      <div key={lp.id} className="flex flex-col justify-between bg-slate-200 border border-black rounded basis-1/4 m-5 p-5 h-40">
        <p className="text-center">Title: {lp.title}</p>
        <p className="text-center">Description: {lp.description}</p>
        <p className="text-center">views: {lp.views}</p>
        <div className="flex justify-around ">
          <Link href={`/edit/${lp.id}`}>
           <button className="bg-orange-500 m-1 px-2 py-1  border border-black rounded" onClick={() => router.push(`/edit/${lp.id}`)}>Edit</button>
          </Link>
          <button className="bg-red-500  m-1 px-2 py-1  border border-black rounded" onClick={() => handleDeleteLandingPage(lp.id)}>Delete</button>
        <Link href={`/live/${lp.id}`}>
        <button className="bg-blue-500 m-1 px-2 py-1 border border-black rounded">View</button>
        </Link>
        </div>
      </div>
    ))
  }

  const logout = () => {
    localStorage.setItem('auth','');
    router.push("/login")
  }

  const handleDeleteLandingPage = (id:string) => {
    const bool = window.confirm("are you sure you want to delete the landing page");
    if(bool) {
      const allLP:Array<LandingPage> = JSON.parse(localStorage.getItem("LP")|| '');
      if(allLP?.length) {
        const filterdList = allLP.filter(lp=>lp.id !== id);
        localStorage.setItem("LP", JSON.stringify(filterdList));
        const ownerId = localStorage.getItem("auth");
        const ownedLP = filterdList.filter(lp=>lp.ownerId === ownerId);
        setOwnerLandingPages(ownedLP);
      }
    }
  }


  return (
    <div>
      <header className="bg-yellow-100 h-12 flex justify-between border-b border-black p-1">
      <Link href={'/create'} className="border border-black rounded bg-green-500 m-1 px-2 py-1 "><button type="button">Create New</button></Link>
      <button onClick={logout} type='button' className="border border-black rounded bg-red-500 m-1 px-2 py-1 ">Logout</button>
      </header>
      <div className="flex">
      {renderAllLandingPages()}
      </div>
    </div>
  )
}

export default DashboardPage;