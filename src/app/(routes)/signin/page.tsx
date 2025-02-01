"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import bg from "@/image/bg.jpg"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page(){
    const {register, handleSubmit, reset} = useForm()
    const router = useRouter()

    const submitForm = async (data:any) => {
        try {
            const response = await axios.post('/api/signin', {...data})
            if (response.status === 200) {
                sessionStorage.setItem("userId", response.data?.data?._id )
                sessionStorage.setItem("userName", response.data?.data?.userName )
                sessionStorage.setItem("fullName", response.data?.data?.fullName )
                sessionStorage.setItem("avatar", response.data?.data?.avatar)
                // const userId = response.data?.data?._id;
                // const userName = response.data?.data?.userName;
                // const fullName = response.data?.data?.fullName;
                // const avatar = response.data?.data?.avatar;

                router.push('/dashboard')
                toast.success(response.data?.message || "Authenticated")
                reset()
            } 
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg || "Authentication failed")
            reset()
        }
    }

    return(
        <>
        <div className="fixed top-0 w-full h-screen backdrop-blur-2xl flex bg-zinc-900/10 justify-center items-center">
            <div className="z-20 w-1/2 h-2/3 bg-white border border-zinc-300 rounded-xl flex">
                <div className="w-1/2 h-full" > <Image src={bg} alt="background" className="w-full h-full rounded-l-xl" /> </div>
                <div className="w-1/2 h-full flex justify-center items-center gap-5 flex-col" >
                    <div className="text-xl font-semibold " >Signin to your account</div>
                    <form onSubmit={handleSubmit(submitForm)} action="" className="w-2/3 flex justify-center items-center gap-5 flex-col">
                        <Input {...register("userName")} className="border border-zinc-500 h-10 outline-none" placeholder="Username" />
                        <Input {...register("password")} className="border border-zinc-500 h-10 outline-none" placeholder="Passowrd" type="password" />
                        <Button className="w-full h-10 font-semibold text-lg"> Submit </Button>
                    </form>
                    <h3 className="text-sm text-zinc-500" >Don't  have an account? <Link className="text-primary underline" href={'/signup'}>Signup</Link></h3>
                    <h3 className="text-xs text-zinc-400" >By loggin in you agree to our terms of services</h3>
                </div>
            </div>
        </div>
        </>
    )
}