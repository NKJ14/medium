import { Auth } from "../components/auth"
import { Quote } from "../components/quotes"

export const Signin= ()=>{
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <Auth type="signin"/>
        <div className="hidden lg:block">
            <Quote/>    
        </div> 
    </div>
}