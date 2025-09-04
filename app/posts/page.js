"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"



export default function Posts(){                    //server component 
    
 const [posts, setposts] = useState([]);          // this is client side so write "use client directive"
 const fetchRecords = async () =>{
    const response = await axios.get("http://localhost:5000/posts");
    console.log("API response:", response.data); 
    setposts(response.data);

 }

 useEffect (()=>{
    fetchRecords()
 }, [])


    return(
        <div className="px-10 py-10">

            <div className="flex justify-between">
                <h1 className=" text-3xl font-bold">Blog Posts</h1>
                
                <Link href= "/posts/create" className="px-3 py-4 bg-green-400 rounded-2xl">Create new posts</Link>
            </div>
            <table className="divide-y divide-gray-400 w-full mt-6">
                <thead className="bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-2 uppercase text-start font-medium ">Id</th>
                        <th scope="col" className="px-6 py-2 uppercase text-start front-medium">Title</th>
                        <th scope="col" className="px-6 py-2 uppercase text-start font-medium">Content</th>
                        <th scope="col" className="px-6 py-2 uppercase text-start font-medium">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {

                       posts.map((post) =>(
                            <tr key={post.id}>
                                <td className="px-6 py-3">{post.id}</td>
                                <td className="px-6 py-3">{post.title}</td>
                                <td className="px-6 py-3">{post.content}</td>
                                <td className= "space-x-2">
                                    <button className="bg-green-400 rounded-md px-4 py-1 font-semibold">Read</button>
                                    <button className="bg-yellow-400 rounded-md px-4 py-1 font-semibold">Edit</button>
                                    <button className="bg-red-500 rounded-md px-4 py-1 font-semibold">Delete</button>
                                </td>
                            </tr>
                           

                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}