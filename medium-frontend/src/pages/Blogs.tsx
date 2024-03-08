import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import {useBlogs} from '../hooks/index'
export const Blogs= ()=>{
    const {loading,blogs}= useBlogs();
    if(loading){
        return <div>
            loading
        </div>
    }
    return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div>
                {blogs.map(blog=><BlogCard id={blog.id}authorName={blog.author.name||"Anonymous"} 
                    content={blog.content}
                    title={blog.title} publishedDate="2004-02-14"/>)}
            </div>
        </div>
    </div>
}