"use client"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import userStore from "@/lib/userStore"
import axios from "axios"
import { Bookmark, Heart, Loader, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Page(){
    const router = useRouter()
    const { userId, fullName } = userStore.getState()
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)

    const handleCreatePost = () => {
        router.push('/create-post')
    }

    const fetchBlogs = async () => {
        try {
            const response = await axios.post("/api/blogs", { blogId: "" })
            if (response?.status === 200) {
                setBlogs(response.data?.data)
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error( errorMsg || "Failed to get blogs")
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchBlogs().finally(() => setLoading(false))
    },[])
    
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
            <div className="mb-5 w-full h-14 flex items-center text-2xl justify-between font-medium" >
                {`Welcome ${fullName}! 👋`}
                <Button onClick={handleCreatePost} >Post</Button>
            </div>
            <div className="w-full h-10 " >
                Here tags will be there
            </div>
            <div className="w-full py-5 ">
                <h3 className="mb-3 text-lg ">You might be intrested in</h3>
                <div className="w-full  flex justify-start items-start flex-col gap-2" >
                    {
                        blogs.length > 0 ? (
                            blogs.map((item: any) => (
                                <Link href={`/post/${item._id}`} className="w-full h-52 border-b flex justify-between items-start flex-col rounded-xl border-zinc-300 p-5 bg-zinc-100 gap-3" key={item._id} >
                                    <div className="w-full" key={item._id}>
                                        <div className="w-full flex justify-start items-center gap-5 " >
                                            <div className="flex justify-start items-center gap-2" >
                                                <Image src={item.author_details.avatar} alt="profile_pic" width={1000} height={1000} className="w-7 h-7 rounded-full" />
                                                { item.author_details.fullName}
                                            </div>
                                            <div className="text-sm text-zinc-500" >
                                                { new Date(item.updatedAt).toLocaleDateString() }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold" > { item.title } </h1>
                                        <h3 className="text-zinc-500 " >{ item.description }</h3>
                                    </div>
                                    <div className="w-40 gap-2 flex justify-between items-center">
                                        <Heart size={20} />
                                        <MessageCircle size={20} />
                                        <Bookmark size={20} />
                                    </div>
                                </Link>
                            ))
                        ): (
                            <p>No blogs available</p>
                        )
                    }
                    <p>Looks like your have reached the end</p>
                </div>
            </div>
        </div>
        {
            loading && 
            <>
                <div className="w-full h-screen backdrop-blur-2xl fixed top-0 flex justify-center items-center" >
                    <Loader size={48} className="text-primary animate-spin" />
                </div>
            </>
        }
        </>
    )
}