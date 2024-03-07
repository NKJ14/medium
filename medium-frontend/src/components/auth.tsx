import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "../assets/zod"
import axios from "axios"
import {BACKEND_URL} from '../assets/config';
export const Auth =({type}:{type:"signup"|"signin"})=>{
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        email:"",
        password:"",
        name:""
    });
    async function sendRequest(){
        try{
            const res= await axios.post(`${BACKEND_URL}/api/v1/user/${type=='signin'?"signin":"signup"}`, postInputs);
            const jwt = res.data;
            localStorage.setItem('token',jwt);
            navigate("/blogs");
        } catch(e){
            console.log(e);
        }
    
    }
    return <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10 pt-8">
                        <div className="text-3xl font-bold">
                            Create an Account
                        </div>
                        <div className="text-slate-400">
                            {type==="signin"?"Don't have an account?":"Already have one?"}
                            <Link to={type==="signin"? "/signup":"/signin"} className="pl-1 underline">
                                {type==="signin"? "Sign up":"Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div>
                        {type=="signup"? <LabelledInputBox label="Name" placeholder="TrynaCode" onChange={(e)=>{
                            setPostInputs(c=>({
                                ...c,
                                name:e.target.value
                            }))
                        }}/>: null}
                        <LabelledInputBox label="Email" placeholder="mediumFan@whatevermail.com" onChange={(e)=>{
                            setPostInputs(c=>({
                                ...c,
                                email:e.target.value
                            }))
                        }}/>
                        <LabelledInputBox label="password" type={"password"} placeholder="shush...secret" onChange={(e)=>{
                            setPostInputs(c=>({
                                ...c,
                                password:e.target.value
                            }))
                        }}/>
                        <button onClick={sendRequest} type="button" className="mt-8 w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ">{type==="signup"? "Sign up":"Sign in"}</button>
                    </div>
                </div>
            </div>
    </div>
}
//fancy inputs that I painstakingly made I deserve some cookie points on this
interface LabelledInputTypes{
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void,
    type?:string
}
function LabelledInputBox({label, placeholder, onChange,type}:LabelledInputTypes ){
    return <div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 pt-2">{label}</label>
            <input onChange={onChange}type={type||"text"} className="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5" placeholder={placeholder} />
        </div>
    </div>
}