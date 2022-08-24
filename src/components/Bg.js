
import React, { useEffect, useState } from 'react'
import {Link } from "react-router-dom"
import Axios from "axios"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export const Bg = () => {
  const [allbg,setAllbg]=useState([])
  const [loading,setLoading]=useState(true)
    const fatchbg=async()=>{
        setLoading(true)
        await Axios({
           
            method:"get",
            url:'http://localhost:8000/homeBg'
        }).then((response)=>{
            
            setAllbg(response.data)
            setLoading(false)

        })

    }
    useEffect(()=>{
        fatchbg()
    },[])
    console.log(allbg,'ffffffffgfffffffffffff')
  return (
   <>
   {loading && ( <>
 
 <center><Skeleton height={200} width={'70%'} /></center>

<ul style={{'marginLeft':'30px'}}>
<li  style={{'display':'inline-block'}}><Skeleton height={100} width={100} circle={true}   /></li>
<li style={{'display':'inline-block','position':'absolute','marginLeft':'20px','marginTop':'30px','width':'40%'}}><span><Skeleton  height={50}  /></span></li>
<p style={{'marginLeft':'119px',}}><Skeleton width={'70%'}  height={'184px'}  /></p> 

</ul>

<ul style={{'marginLeft':'30px'}} >
<li  style={{'display':'inline-block'}}><Skeleton height={100} width={100} circle={true}   /></li>
<li style={{'display':'inline-block','position':'absolute','marginLeft':'20px','marginTop':'30px','width':'40%'}}><span><Skeleton  height={50}  /></span></li>
<p style={{'marginLeft':'119px',}}><Skeleton width={'70%'} height={'184px'}  /></p> 

</ul>


<ul style={{'marginLeft':'30px'}} >
<li  style={{'display':'inline-block'}}><Skeleton height={100} width={100} circle={true}   /></li>
<li style={{'display':'inline-block','position':'absolute','marginLeft':'20px','marginTop':'30px','width':'40%'}}><span><Skeleton  height={50}  /></span></li>
<p style={{'marginLeft':'119px',}}><Skeleton width={'70%'}  height={'184px'}  /></p> 

</ul>

<ul style={{'marginLeft':'30px'}} >
<li  style={{'display':'inline-block'}}><Skeleton height={100} width={100} circle={true}   /></li>
<li style={{'display':'inline-block','position':'absolute','marginLeft':'20px','marginTop':'30px','width':'40%'}}><span><Skeleton  height={50}  /></span></li>
<p style={{'marginLeft':'119px',}}><Skeleton width={'70%'}  height={'184px'}  /></p> 

</ul>

</>)}
   {allbg && allbg.map((bg)=>(
    <div className="header-area-wrapper index-01">
<div className="header-area index-01 header-slider-init">
    <div className="single-slid-item">
        <div
            className="container custom-header-container bg"
             style={{backgroundImage: `url("http://localhost:8000${bg.image}")` }}>
      
            <div className="row h-100">
                <div className="col-lg-12 position-relative h-100">
                    <div className="content">
                        <span className="first-word space-style">travel</span>
                        <h1 className="header-title">Travel makes one modest, you see what a tiny place you occupy in the world.
                        </h1>
                        <div className="btn-wrapper">
                            <a href="#" className="btn-default">read more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>





</div>
</div>
   ))}

   </>
  )
}
