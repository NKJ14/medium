import { Avatar } from "./BlogCard"

export const Appbar=() =>{
    return <div className=" bg-slate-900 border-b flex justify-between px-10 py-3">
        <div className="text-white flex flex-col justify-center">
            Medium
        </div>
        <div>
            <Avatar name="NKJ"/>
        </div>
    </div>
}