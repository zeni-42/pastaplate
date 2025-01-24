"use client"
import userStore from "@/lib/userStore";
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar(){

    const {userId, avatar} = userStore.getState()

    return(
        <>
        <nav className="fixed top-0 w-full h-14 border-b border-zinc-300 backdrop-blur-2xl px-20 flex justify-between items-center" >
            <div className="w-60 h-full flex justify-center items-center font-bold text-xl ">
                Pastaplate
            </div>
            <div className="w-1/6 h-full flex justify-end items-center gap-10" >
                <Link href={'#'} ><Search strokeWidth={1.5} /></Link>
                <Link href={'#'} ><Bell strokeWidth={1.5} /></Link>
                {
                    !userId ? (
                        <>
                            <Link className="w-1/3 h-4/5 flex justify-center items-center font-medium text-lg bg-primary rounded-sm text-secondary" href={'/signin'} >
                                Login
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href={"/account"} >
                                <Image src={`${avatar!}`} alt="profile_pic" width={40} height={40} className="rounded-full border-2 border-zinc-400" />
                            </Link>
                        </>
                    ) 
                }

            </div>
        </nav>
        </>
    )
}