"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function MainPage() {

const[title, setTitle] = useState('')
const [content, setContent] = useState('')
const router = useRouter



const onhandleSubmit = async(e) =>{
    e.preventDefault()
    await axios.post("http://localhost:5000/posts",{title}, {content})

    router.push('/')
}


  return (
    <div className=' bg-green-200 py-20 px-4 flex justify-center flex-col'>
        <h1 className='font-semibold flex justify-center'>Create new Post</h1>

        <form onSubmit={onhandleSubmit} className='flex flex-col space-y-4 mt-6 border p-6'>

        
        <input type='text' placeholder='Enter Title' value={title} className='p-4 border-slate-900' onChange={(e) =>setTitle(e.target.value)}/>


        <textarea  placeholder='Enter Content' value={content} className='p-2 border-slate-500' onChange={(e) =>setContent(e.target.value)}/>

        <button className='bg-green-400'>Create Post</button>
        </form>
    </div>
  )
}
