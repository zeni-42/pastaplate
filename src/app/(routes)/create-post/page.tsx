"use client"
import userStore from "@/lib/userStore";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    title: z.string().min(5, { message: "Minimum length is 5"}).max(50, { message: "Maximum length is 50" }).trim(),
    description: z.string().min(10, { message: "Minimum length is 10"}).max(100, { message: "Maximum length is 100" }).trim(),
    content: z.string().min(1, { message: "Content cannot be empty"})
})

export default function Page(){
    const router = useRouter()
    const { register, handleSubmit, reset, formState:{ errors }} = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema)
    });

    const registerBlog = async (data: any) => {
        const { userId } = userStore.getState()
        try {
            const response = await axios.post('/api/createPost',{
                title: data?.title,
                description: data?.description,
                content: data?.content,
                userId,
            })
            if (response.status == 200) {
                toast.success("Post added")
                reset()
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg || "Failed to register Blog")
            reset()
        }
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
            <div className="py-5 flex justify-start items-center gap-3 " >
                <button onClick={() => history.back()} className="w-10 h-10 bg-secondary flex justify-center items-center rounded-full" ><ChevronLeft /></button>
                <h1 className="text-2xl font-semibold" >Create post</h1>
            </div>
            <div className="w-full h-[80vh] flex justify-center items-start " >
                <form action="" onSubmit={handleSubmit(registerBlog)} className="w-2/3 flex justify-evenly items-center flex-col gap-5" >
                    <Input type="file" accept=".png .jpg .jpeg" />
                    <Input {...register("title")} autoComplete="off" className="h-14 border border-zinc-300 " placeholder="Title" />
                    { errors.title &&  <p className="text-red-500" >{errors.title?.message }</p>}
                    <Input {...register("description")} autoComplete="off" className="h-14 border border-zinc-300 " placeholder="Description" />
                    { errors.description &&  <p className="text-red-500" >{errors.description?.message }</p>}
                    <Textarea {...register("content")} autoComplete="off" placeholder="Your content goes here" className="h-80 border border-zinc-300 " />
                    { errors.content &&  <p className="text-red-500" >{errors.content?.message }</p>}
                    <Button className="w-full h-14" type="submit" > Post <ChevronRight /></Button>
                </form>
            </div>
        </div>
        </>
    )
}