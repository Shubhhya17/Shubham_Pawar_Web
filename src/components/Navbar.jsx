"use client"

import { useEffect, useState } from "react"

export default function Navbar(){

const [sticky,setSticky] = useState(false)
const [menu,setMenu] = useState(false)

useEffect(()=>{

const handleScroll = ()=>{

if(window.scrollY > 20){
setSticky(true)
}else{
setSticky(false)
}

}

window.addEventListener("scroll",handleScroll)

return ()=> window.removeEventListener("scroll",handleScroll)

},[])

return(

<nav className={`navbar ${sticky ? "sticky" : ""}`}>

<div className="max-width">

<div className="logo">
<a href="#">Portfo<span>lio.</span></a>
</div>

<ul className={`menu ${menu ? "active" : ""}`}>

<li><a href="#home">Home</a></li>
<li><a href="#about">About</a></li>
<li><a href="#skills">Skills</a></li>
<li><a href="#projects">Projects</a></li>
<li><a href="#contact">Contact</a></li>

</ul>

<div className="menu-btn" onClick={()=>setMenu(!menu)}>
☰
</div>

</div>

</nav>

)

}