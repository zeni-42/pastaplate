"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import userStore from "@/lib/userStore";
import axios from "axios";
import { Bookmark, ChevronLeft, Heart, Loader, Upload } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page(){
    const router = useRouter()
    const params = useParams();
    const blogId = params.blogId;
    const [ loading, setLoading ] = useState(false)
    const [blog, setBlog] = useState<any>(null)
    const { userId } = userStore.getState()
    const [likeCount, setLikeCount] = useState(0)

    const fetchBlog = async () => {
        const response = await axios.post('/api/blogs', { blogId })
        setBlog(response.data?.data[0])
        const arrayOfLike: Promise<Array<string>> = response.data?.data[0].points
        const likes = (await arrayOfLike).length
        setLikeCount(likes)
    }

    useEffect(() => {
        setLoading(true)
        fetchBlog().finally(() => setLoading(false))
    },[])

    useEffect(() => {
        if (!userId) {
            toast.error("Unauthorized")
            router.push("/signin")
        }
    },[userId])

    const handleUpdateLike = async() => {
        try {
            await axios.post("http://localhost:3000/api/updateLike",{ userId, blogId })
            fetchBlog();
        } catch (error: any) {
            const errMsg = await error.response?.data?.message
            toast.error(errMsg || "Failed to add like")
        }
    }

    return(
        <>
        <Navbar />
        <div className="mt-14 px-[25vw] ">
            <div className=" py-5 w-full h-60 border-b border-zinc-300 flex justify-around items-start flex-col gap-3 " >
                <div className="w-full flex gap-2 justify-start items-center" >
                    <button onClick={() => history.back()} className="w-10 h-10 rounded-full bg-secondary flex justify-center items-center" ><ChevronLeft /></button>
                    <div className="text-sm text-zinc-500" >{blog?.title}</div>
                </div>
                <div className="h-2/3 w-full flex justify-evenly items-start flex-col" >
                    <h1 className="text-4xl font-bold" >{blog?.title}</h1>
                    <h3 className="text-lg font-medium text-zinc-600" >{blog?.description}</h3>
                </div>
                <div className="h-1/3 w-full flex justify-between items-center gap-3 " >
                    <div className="w-1/2 flex justify-start items-center gap-3" >
                    {blog?.author_details?.avatar ? (
                        <Image width={1000} height={1000} src={blog.author_details.avatar} alt="profile_pic" className="w-10 h-10 rounded-full"/>
                    ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center">
                        <span className="text-sm text-white">N/A</span>
                    </div>
                    )}
                        <h2 className="text-lg text-zinc-800" >{blog?.author_details?.fullName}</h2>
                        <p className="text-zinc-400 text-sm" >
                            {
                                new Date(blog?.updatedAt).toLocaleDateString()
                            }
                        </p>
                    </div>
                    <div className="w-1/2 h-full flex justify-end items-center gap-5" >
                        <div className="flex justify-center items-center w-10 gap-2" >
                            <button onClick={handleUpdateLike} ><Heart  scale={20} strokeWidth={1.5} /></button>
                            {likeCount}
                        </div>
                        <button ><Bookmark  scale={20} strokeWidth={1.5} /></button>
                        <button ><Upload  scale={20} strokeWidth={1.5} /></button>
                    </div>
                </div>
            </div>
            <div className="w-full py-10 border-b border-zinc-300 font-md text-zinc-800" >
                {blog?.content}
            </div>
        </div>
        {/* <Footer /> */}
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