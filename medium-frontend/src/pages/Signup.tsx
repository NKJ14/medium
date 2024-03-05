import { Auth } from "../components/auth"
import { Quote } from "../components/quotes"

export const Signup= ()=>{
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <Auth type="signup"/>
        <div className="hidden lg:block">
            <Quote/>    
        </div> 
    </div>
}