"use client"
import { Search } from "lucide-react";
import Link from "next/link";

export default function Navbar(){

    return(
        <>
        <nav className="fixed top-0 w-full h-14 border-b border-zinc-300 backdrop-blur-2xl px-20 flex justify-between items-center" >
            <div className="w-60 h-full flex justify-center items-center font-bold text-xl ">
                Pastaplate
            </div>
            <div className="w-1/4 h-full flex justify-between items-center" >
                <Link className="w-10 h-full flex justify-center items-center" href={'/'} ><Search /></Link>
                <Link className="w-1/3 h-full flex justify-center items-center font-medium text-lg" href={'#'}> About </Link>
                <Link className="w-1/3 h-4/5 flex justify-center items-center font-medium text-lg bg-primary rounded-sm text-secondary" href={'/login'} > Login </Link>
            </div>
        </nav>
        </>
    )
}