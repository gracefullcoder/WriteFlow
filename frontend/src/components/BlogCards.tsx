import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

interface blog {
    id: string,
    title: string,
    content: string,
    published: boolean,
    authorId: string
}


function BlogCards({ post, all }: { post: blog, all: boolean }) {
    console.log(all);

    return (
        <div className='mb-8 cursor-pointer '>
            <div className='flex gap-2 items-center'>
                <Avatar />
                <span>Anonymous</span>
            </div>
            <Link to={`/blog/${post.id}`} className='my-2'>
                <p className='text-4xl font-extrabold mb-4'>{post.title}</p>
                <p className='text-2xl'>{all ? <> {post.content}</> : <>{post.content.substr(0, Math.min(post.content.length, 100))}...</>}</p>
                <p className='text-slate-500 mt-4'> 1 minute(s) Read</p>
                <hr className='my-4' />
            </Link>
        </div>
    )
}

export default BlogCards