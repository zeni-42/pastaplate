"use client"
import userStore from "@/lib/userStore";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Page(){
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm();
    const registerBlog = (data: any) => {
        console.log(data);
    }

    const { userId } = userStore()
    useEffect(() => {
        if (!userId) {
            router.push("/signin")
        }
    },[userId])

    return(
        <>
        <Navbar />
        <div className="mt-14 px-96" >
            <div className="py-5 flex justify-between items-center " >
                <h1 className="text-2xl font-semibold" >Create post</h1>
            </div>
            <div className="w-full h-[80vh] flex justify-center items-start " >
                <form action="" onSubmit={handleSubmit(registerBlog)} className="w-2/3 flex justify-evenly items-center flex-col gap-5" >
                    <Input {...register("title")} autoComplete="off" className="h-14 border border-zinc-300 " placeholder="Title" />
                    <Input {...register("description")} autoComplete="off" className="h-14 border border-zinc-300 " placeholder="Description" />
                    <Textarea {...register("content")} autoComplete="off" placeholder="Your content goes here" className="h-80 border border-zinc-300 " />
                    <Button className="w-full" type="submit" > Post <ChevronRight /></Button>
                </form>
            </div>
        </div>
        </>
    )
}