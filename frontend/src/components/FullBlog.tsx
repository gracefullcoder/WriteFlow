import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
import BlogCards from './BlogCards';

interface blog {
    id: string,
    title: string,
    content: string,
    published: boolean,
    authorId: string
}

function FullBlog() {
    const {id} = useParams();
    const token = useMemo(() => localStorage.getItem("token"), [])
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const getBlogs = async () => {
                const res = await axios.get(`${import.meta.env.VITE_SERVER}/blog/${id}`, {
                    headers: {
                        "Authorization": token
                    }
                })

                setPost(res.data);
            }

            getBlogs();
        } else {
            navigate("/signup")
        }
    }, [token])

    const [post, setPost] = useState<blog>({
        id: "",
        title: "",
        content: "",
        published: false,
        authorId: ""
    })

    console.log(post);

    return (
        <>
            <Navbar/>
            <div className='p-16 lg:px-40'>
            <BlogCards post={post} all={true}/>
            </div>
        </>
    )
}

export default FullBlog