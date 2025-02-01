"use client"
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

type Response = {
    _id: string;
    title: string;
}

export default function Page(){
    const router = useRouter()
    const [isLoaing, setIsLoading] = useState(false)
    const [tags, setTags] = useState<Response[]>([])

    const fetchTags = async () => {
        console.log("Fetching blogs");
        const res = await axios.post('/api/tags', { tagId: "" })
        setTags(res.data?.data)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchTags().finally(() => setIsLoading(false))
    },[])

    const handleSkip = () => {
        router.push('/dashboard')
    }

    return(
        <>
        <div className="fixed top-0 border-b border-zinc-300 w-full h-16 flex justify-end items-center px-10" >
            <button onClick={handleSkip} className="w-40 h-2/3 rounded-full border-b bg-zinc-100" >
                Skip
            </button>
        </div>
        <div className="w-full h-screen flex justify-evenly items-center flex-col gap-10" >
            <div className="w-full h-1/4 flex justify-end items-center flex-col gap-2" >
                <h1 className="text-4xl font-semibold " > Select your interests </h1>
                <p className="text-zinc-400" >Select upto 5 tags</p>
            </div>
            <div className="w-full h-3/4 flex justify-evenly items-start px-[40vw]" >
                {
                    tags.length > 0 ? (
                        tags.map((item) => (
                            <button key={item._id!} className="px-3 py-2 rounded-full border border-zinc-300" >
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
        </div>
        {
            isLoaing && (
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