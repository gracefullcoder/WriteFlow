import { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
    const [details, setDetails] = useState({ title: "", content: "" });
    const navigate = useNavigate()

    const createBlog = async () => {
        const res: any = await axios.post(`${import.meta.env.VITE_SERVER}/blog`, details, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        console.log(res);

        if (res.statusText == 'OK') navigate(`/blog/${res.data.id}`)
    }

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>
                </div>

                <label htmlFor={"title"} className='pt-6 block text-3xl font-semibold mb-2'>Title</label>
                <input
                    id={"title"}
                    name="title"
                    type="text"
                    value={details.title}
                    onChange={(e) => { setDetails((prev) => { return { ...prev, [e.target.name]: e.target.value } }) }}
                    placeholder={"Enter Title"}
                    className='rounded border-slate-300 border-2 text-3xl p-2 w-full block'
                />

                <label htmlFor={"content"} className='pt-6 block text-3xl font-semibold mb-2'>Content</label>
                <textarea
                    id={"content"}
                    name="content"
                    rows={10}
                    value={details.content}
                    onChange={(e) => { setDetails((prev) => { return { ...prev, [e.target.name]: e.target.value } }) }}
                    placeholder={"Enter content"}
                    className='rounded border-slate-300 border-2 text-xl p-4 w-full block'
                />
            <button className="mt-4 w-48  text-xl bg-black hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded block mx-auto" onClick={createBlog}>Submit</button>
            </div>

        </>
    )
}

export default CreateBlog 