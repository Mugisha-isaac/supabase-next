import { useState } from "react";
import {v4 as uuid} from 'uuid'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import {supabase} from '../api'



const SimpleMDE = dynamic(()=>import('react-simplemde-editor'),{ssr:false});
const initialState = {title:'',content:''};

function CreatePost(){
    const [post,setPost] = useState(initialState);
    const {title,content} = post;
    const router = useRouter();

    function onChange(e){
            setPost(()=>({...post,[e.target.value]:e.target.value}))
    }

    async function createNewPost(){
        if(!title || !content) return
        const user = supabase.auth.user();
        const id = uuid();
        post.id = id;

        const data = await supabase.from('posts').insert([
            {title,content,user_id:user.id,user_email:user.email}
        ]).single()

        router.push(`/posts/${data.id}`);
    }

    return(
        <div>
            <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Edit post</h1>
            <input onChange={onChange} placeholder="Title" name="title" value={post.id}  className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2" />
            <SimpleMDE value={post.content} onChange={value=>setPost({...post,content:value})} />
            {/* <button  className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg" >
                
            <button/> */}
            <button className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg" >update</button>
        </div>
    )
}
