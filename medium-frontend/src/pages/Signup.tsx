import { Auth } from "../components/auth"
import { Quote } from "../components/quotes"

export const Signup= ()=>{
    return <div className="grid grid-cols-2">
        <Auth/>
        <div className="invisible lg:visible">
            <Quote/>    
        </div> 
    </div>
}