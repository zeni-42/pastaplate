"use client"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import userStore from "@/lib/userStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

export default function Page(){
    const router = useRouter()
    const { userId, fullName } = userStore.getState()

    const handleCreatePost = () => {
        router.push('/create-post')
    }
    useEffect(() => {
        if (!userId) {
            toast.error("Unauthorized")
            router.push("/signin")
        }
    },[userId])

    return(
        <>
        <Navbar />
        <div className="mt-14 px-96">
            <div className="mb-5 w-full h-14 flex items-center text-xl justify-between font-medium" >
                {`👋 Welcome ${fullName}!`}
                <Button onClick={handleCreatePost} >Create post</Button>
            </div>
            <div className="w-full">
                <h3>You might be intrested in</h3>
            </div>
        </div>
        </>
    )
}