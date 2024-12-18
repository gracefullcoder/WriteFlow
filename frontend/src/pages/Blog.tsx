import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BlogCards from '../components/BlogCards';

function Blog() {

  const token = useMemo(() => localStorage.getItem("token"), []);
  const navigate = useNavigate();

  interface blog {
    id: string,
    title: string,
    content: string,
    published: boolean,
    authorId: string
  }

  const [posts, setPosts] = useState<blog[]>([]);
  useEffect(() => {

    if (token) {
      const getBlogs = async () => {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/blog/bulk/all`, {
          headers: {
            "Authorization": token
          }
        })

        setPosts(res.data.posts);
        console.log(res);
      }

      getBlogs();
    } else {
      navigate("/signup")
    }
  }, [token])

  return (
    <div>
      <Navbar />
      <div className='p-16 lg:px-40'>
        {posts.map((post) =>
          <BlogCards post={post} key={post.authorId} all={false}/>
        )
        }
      </div>
    </div>
  )
}

export default Blog