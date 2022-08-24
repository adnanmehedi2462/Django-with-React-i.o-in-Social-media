import React from 'react'
import { Navigate, Route, Routes,Link, NavLink } from "react-router-dom"
import { useStateValue } from '../StateAll/Stateprovider'
export const Header = () => {
    const [{ getprofile }, {}]=useStateValue()

const logout=()=>{
    window.localStorage.clear();
    window.location.href="/"
}
  return (
    <nav
    className="navbar navbar-area navbar-expand-lg has-topbar nav-style-01 index-01">
    <div className="container nav-container custom-header-container">
        <div className="responsive-mobile-menu">
            <div className="logo-wrapper">
                <a href="index-2.html" className="logo">
                    <img src="assets/img/logo/Logo-01.png" alt="logo"/>
                </a>
            </div>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#bizcoxx_main_menu"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
        <div className="collapse navbar-collapse" id="bizcoxx_main_menu">
            <ul className="navbar-nav">
                <li className=" current-menu-item">
                    <NavLink  style={({ isActive }) => ({ color: isActive ? "#f13b3a" : "#666666" })} to ="/">Home</NavLink>

                </li>

                {getprofile?(<>
                
                <li className="">
                    <NavLink  style={({ isActive }) => ({ color: isActive ? "#f13b3a" : "#666666" })} to={"/newpost"}>New Post</NavLink>

                </li>
                <li>
                    <NavLink  style={({ isActive }) => ({ color: isActive ? "#f13b3a" : "#666666" })} to={"/profile"}>Profile</NavLink>
                </li>
                <li >
                    <NavLink to="/"  onClick={logout} >Logout</NavLink>
                   
                </li></>):(<>                <li>
                    <NavLink  style={({ isActive }) => ({ color: isActive ? "#f13b3a" : "#666666" })} to={"/register"}>Register</NavLink>
                </li>
                <li>
                    <Link  to={"/login"} style={{'background':'#f13b3a','padding':'10px 20px','borderRadius': '10px 100px / 120px','color':'#fff'}}>Login</Link>
                </li></>)}


            </ul>
        </div>

    </div>
</nav>


  )
}
