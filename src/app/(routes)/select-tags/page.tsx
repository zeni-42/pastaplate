"use client"
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

type Tags = {
    _id: string;
    title: string;
}

export default function Page(){
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [userId, setUserId] = useState<string | null>(null)
    const [tags, setTags] = useState<Tags[]>([])

    const fetchTags = async () => {
        try {
            const res = await axios.post('/api/tags', { tagId: "" })
            if (res.data?.data) {
                setTags(res.data?.data)
            } else {
                toast.error("Error fetching tags")
            }
        } catch (error) {
            toast.error("Error fetching tags")
        }
    }

    useEffect(() => {
        fetchTags().finally(() => setIsLoading(false))
    },[])

    const handleUpdateSelectedArray = async (itemId: string) => {
        try {
            const response = await axios.post('/api/addTags', { userId, tagId: itemId })
            if (response.status == 200) {
                toast.success("Added")
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error( errorMsg || "Failed to get blogs")
        }
    };

    useEffect(() => {
        setUserId(sessionStorage.getItem("userId"))
    },[])

    return(
        <>
        <div className="fixed top-0 w-full h-16 flex justify-end items-center px-10" >
            <button onClick={() => router.push('/dashboard')} className="w-40 h-2/3 rounded-full border-b bg-zinc-200" >
                Skip
            </button>
        </div>
        <div className="w-full h-screen flex justify-evenly items-center flex-col gap-10" >
            <div className="w-full h-1/4 flex justify-end items-center flex-col gap-2" >
                <h1 className="text-4xl font-semibold " > Select your interests </h1>
                <p className="text-zinc-400" >Select upto 5 tags</p>
            </div>
            <div className="w-full h-2/4 flex justify-evenly items-start flex-wrap px-96 gap-2 " >
                {
                    tags.length > 0 ? (
                        tags.map((item) => (
                            <button
                                key={item._id}
                                onClick={() => handleUpdateSelectedArray(item._id)}
                                className='px-3 py-2 rounded-full border transition hover:bg-zinc-100 bg-primary/20 border-primary text-primary border-zinc-300' >
                                <h1>{item?.title!}</h1>
                            </button>
                        ))
                    ) : 
                    (
                        <>
                            <p>
                                No tags available
                            </p>
                        </>
                    )
                }
            </div>
            <div onClick={(e) => router.push('/dashboard') } className="w-full h-1/4 flex justify-center items-start" >
                <button className="w-40 text-white h-10 bg-primary rounded-full" >Proceed</button>
            </div>
        </div>
        {
            isLoading && (
                <>
                <div className="w-full h-screen backdrop-blur-2xl fixed top-0 flex justify-center items-center" >
                    <Loader size={48} className="text-primary animate-spin" />
                </div>
                </>
            )
        }
        </>
    )
}