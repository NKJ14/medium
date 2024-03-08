import { Link } from "react-router-dom"

interface BlogCardProps{
    id:string,
    authorName: string,
    title:string,
    content: string,
    publishedDate: string
}

export const BlogCard=({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
                <div className="w-full">
                        <div className="m-4 p-10 border-b border-slate-300 bg-slate-50">
                                <div className="flex">
                                    <div className="flex justify-center flex-col">
                                        <Avatar name={authorName}/>
                                    </div>
                                    <div className="flex justify-center flex-col text-lg font-thick text-slate-700">
                                        @{authorName} &nbsp; &nbsp;
                                    </div>
                                    <div className="flex justify-center flex-col text-sm font-light text-slate-700">
                                        {publishedDate}
                                    </div>
                                </div>
                                <div className="text-2xl font-semibold text-gray-700">
                                    {title}
                                </div>
                                <div className="text-sm font-thin">
                                    {content.slice(0,100)+"..."}
                                </div>
                                <div className="font-thin text-xs">
                                    {`${Math.ceil(content.length/100)} minute(s) read`}
                                </div>
                            </div>
                </div>
    </Link>
}

export function Avatar({name}:{name:string}){
    return <span>       
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
</span>
}