"use client"
import userStore from "@/lib/userStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

export default function Page(){
    const router = useRouter()
    const { userId, fullName } = userStore.getState()

    useEffect(() => {
        if (!userId) {
            toast.error("Unauthorized")
            router.push("/login")
        }
    },[userId])
    return(
        <>
        <div className="mt-14" >
            {`Welcome ${fullName}`}
        </div>
        </>
    )
}