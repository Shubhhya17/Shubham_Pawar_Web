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

<>
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

<style jsx>{`

.navbar{
position: fixed;
width: 100%;
padding: 20px 0;
transition: all 0.4s ease;
}

.navbar.sticky{
background: rgba(220,20,60,0.8);
padding: 15px 0;
}

/* logo animation */
.logo a{
font-size: 28px;
font-weight: 600;
opacity: 0;
animation: fadeIn 1s ease forwards;
}

/* menu animation */
.menu li{
display: inline-block;
margin-left: 25px;
opacity: 0;
transform: translateY(-10px);
animation: slideDown 0.6s ease forwards;
}

.menu li:nth-child(1){animation-delay:0.2s;}
.menu li:nth-child(2){animation-delay:0.4s;}
.menu li:nth-child(3){animation-delay:0.6s;}
.menu li:nth-child(4){animation-delay:0.8s;}
.menu li:nth-child(5){animation-delay:1s;}

.menu li a{
color:white;
text-decoration:none;
font-size:18px;
}

/* keyframes */

@keyframes fadeIn{
to{
opacity:1;
}
}

@keyframes slideDown{
to{
opacity:1;
transform: translateY(0);
}
}

`}</style>

</>

)

}