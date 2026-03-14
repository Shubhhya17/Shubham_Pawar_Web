"use client"

import { useEffect,useState } from "react"

export default function ScrollTop(){

const [show,setShow] = useState(false)

useEffect(()=>{

const handleScroll = ()=>{

if(window.scrollY > 500){
setShow(true)
}else{
setShow(false)
}

}

window.addEventListener("scroll",handleScroll)

return ()=> window.removeEventListener("scroll",handleScroll)

},[])

return(

show && (
<div className="scroll-up-btn"
onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
↑
</div>
)

)

}