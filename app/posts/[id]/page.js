"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect,  useState } from "react";

export default function PostDetails({params}) {

    //const id = params.id;
    const {id} = use(params);

    
    const searchQuery = useSearchParams()
    const mode = searchQuery.get('mode')

    const [post, setPost] = useState(null);

    const [editing, setEditing] = useState(mode === 'edit');
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const router = useRouter()
    

    useEffect(() =>{
        if(id){
            fetchPost()
        }
    }, [id])

    useEffect(()=>{
        setEditing(mode === 'edit')
    },[mode])

    const fetchPost = async() =>{
        const response = await axios.get(`http://localhost:5000/posts/?id=${id}`)
        setPost(response.data)
        setTitle(response.data.title);
        setContent(response.data.content);
    }


    const handleSubmit = async(e)=>{
        e.preventDefault()
        await axios.put(`http://localhost:5000/posts/${id}`,{title},{content})
        setEditing(false)
        fetchPost()
    }
   return (
    <div className="py-20">
        <h1 className="text-2xl text-center font-bold">{editing ? 'Edit Post' :'Read Post'}</h1>
      {post && (
        <div className=" flex flex-col items-center">
          {editing ? (
            
            
            <form  onSubmit ={handleSubmit} className="flex flex-col space-y-2 mt-6 border p-6">

                <input type="text" placeholder="Enter Title" value={title} className="p-2 border border-slate-500" onChange={(e)=>setTitle(e.target.value)}/>
                <textarea value={content} className="p-2 border p-6" onChange={(e)=>setContent(e.target.value)}>
                    
                </textarea >
                <button className="bg-green-400 rounded-lg w-full">Save</button>
            </form>
          ) : (
            <div>
              <h3>{post.title}</h3>
              <h3>{post.content}</h3>
            </div>
          )}

          <div className="flex space-x-2">
            <button  onClick= { () => router.push('/')} className="w-full bg-yellow-200 py-3 px-3 rounded-lg mt-2">Home</button>
            <button onClick={() => setEditing(!editing)} className=" mt-2 w-full bg-purple-200 py-3 px-3 rounded-lg">
              {editing ? "Cancel" : "Edit"}
            </button>
            <button className=" mt-2 w-full bg-red-200 py-3 px-3 rounded-lg">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
