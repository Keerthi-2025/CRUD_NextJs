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
        <div>

            <div>
                <h1>Blog Posts</h1>
                <Link href= "/posts/create">Create new posts</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {

                       posts.map((post) =>(
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>
                                    <button>Read</button>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                           

                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}