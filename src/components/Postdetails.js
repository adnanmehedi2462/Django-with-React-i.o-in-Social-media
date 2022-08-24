import  Axios  from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React, { useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStateValue } from '../StateAll/Stateprovider'
import { FacebookButton, FacebookCount } from "react-social";


const Postdetails = () => {
    const [{ getprofile }, dispatch] = useStateValue()
   console.log(getprofile?.userdata?.user['id'],'xxxxxxxxxxxxxxxxxx')
    const {id}=useParams()
    const[detail,setDetail]=useState(null)
    const [delconfirm,setDelconfirm]=useState(false)
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    const url="https://tinyurl.com/yrxvf8jz"
    
    
    const getsinglePost=async()=>{
        setLoading(true)
        await Axios({
            method:"get",
            url:`http://localhost:8000/mypost/${id}`,
            headers:{
                Authorization:`token ${window.localStorage.getItem("token")}`

            },
        }).then(response=>{
        
            console.log(response.data)
            
            setDetail(response.data)
            setLoading(false)
            
          
        })

    }



useEffect(()=>{
    getsinglePost()
},[])






const deletePost=()=>{
    confirmAlert({
        title: 'Confirm To Delete !!',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: async() => {
                 await Axios({
                    method:"delete",
                    url:`http://localhost:8000/mypost/${id}/`,
                    headers:{
                        Authorization:`token ${window.localStorage.getItem("token")}`
            
                    },
                }).then(response=>{
                
                    console.log(response.data)
                    
                    setDetail(response.data)
                    navigate("/profile")
            
                  
                })
            }
          },
          {
            label: 'No',
            
          }
        ]
      });

 




}

    
    return (
        

        <div className="blog-details-area-wrapper">
   
            <div className="container">
            {loading && ( <>
 
 <center><Skeleton height={200} width={'70%'} /></center>

<ul style={{'marginLeft':'30px'}}>
<li  style={{'display':'inline-block'}}><Skeleton height={100} width={100} circle={true}   /></li>
<li style={{'display':'inline-block','position':'absolute','marginLeft':'20px','marginTop':'30px'}}><span><Skeleton width={400} height={50}  /></span></li>
<p style={{'marginLeft':'119px',}}><Skeleton width={900} height={'184px'}  /></p> 

</ul>

<ul style={{'marginLeft':'30px'}} >
<li  style={{'display':'inline-block'}}><Skeleton height={100} width={100} circle={true}   /></li>
<li style={{'display':'inline-block','position':'absolute','marginLeft':'20px','marginTop':'30px'}}><span><Skeleton width={400} height={50}  /></span></li>
<p style={{'marginLeft':'119px',}}><Skeleton width={900} height={'184px'}  /></p> 

</ul>


<ul style={{'marginLeft':'30px'}} >
<li  style={{'display':'inline-block'}}><Skeleton height={100} width={100} circle={true}   /></li>
<li style={{'display':'inline-block','position':'absolute','marginLeft':'20px','marginTop':'30px'}}><span><Skeleton width={400} height={50}  /></span></li>
<p style={{'marginLeft':'119px',}}><Skeleton width={900} height={'184px'}  /></p> 

</ul>

<ul style={{'marginLeft':'30px'}} >
<li  style={{'display':'inline-block'}}><Skeleton height={100} width={100} circle={true}   /></li>
<li style={{'display':'inline-block','position':'absolute','marginLeft':'20px','marginTop':'30px'}}><span><Skeleton width={400} height={50}  /></span></li>
<p style={{'marginLeft':'119px',}}><Skeleton width={900} height={'184px'}  /></p> 

</ul>

</>)}

                <div className="row">
                    <div className="col-lg-12">
                        <div className="single-box">
                            <h4 className="title"></h4>
                            <div
                                style={{'float':'right' ,'margin':'20px', 'marginTop': '7px','right': '0px','position': 'absolute'}}>

                           
                            </div>
                            <div className="img-box" >
                                    

                                 <img src={detail?.image}  onError={(event) => event.target.style.display = 'none'}  />  
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-8">
                        
                        <div className="content contact-1">
                        <p className="info">{detail?.content}</p>
                            <div className="post-meta">
                                <ul className="list">
                                    <li className="list-item">
                                        <Link to= {`/writer${detail?.id}/`}>
                                            <i className="lar la-user icon"></i>
                                            <span className="text">
                                                {detail?.author?.user?.username}
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="list-item">
                                        <a href="#">
                                            <i className="lar la-clock icon"></i>
                                            <span className="text">{detail?.create}</span>
                                        </a>
                                    </li>
     
                            

                                    <li className="list-item">
                                   
                                           
                                     { getprofile?.userdata?.user?.id === detail?.author?.user?.id && 
                                         <>
                                            
                                             <Link to={`/updatepost-${detail?.id}`} style={{'marginRight':'3px','padding':'6px 10px', 'background':'green','color':'#fff','borderRadius':'5px'}} >Edit</Link>
                                            <span className="text"><Link to='#' onClick={deletePost}  type="button" style={{'marginRight':'3px','padding':'3px 10px', 'background':'#d71918','color':'#fff','borderRadius':'5px'}} >Delete</Link></span>
                                          
                                            

                                         
                                         
                                         </>
                                        }
                                            
                                        
                                      
                                    </li>
                                    
                                </ul>


                                
                            </div>
                            

                        </div>

                    </div>
                    <div className="col-md-6 col-lg-4 col-xl-3 widg">
                        <div className="widget-area-wrapper style-02">
                       
                            <div className="widget widget-about-author">
                                <h5 className="widget-title">about Writer</h5>
                                <div className="img-box">
                                    
                                    <img
                                        src={`http://localhost:8000${detail?.author?.image} `} 
                                        
                                        style={{
                                            'height' : '150px',
                                            'width' : '150px'
                                        }}/>

                                    <div className="content">
                                        <h3 className="title">
                                            <Link to={`/writer${detail?.id}/`}>{detail?.author?.user?.username}</Link>
                                        </h3>
                                        <p className="info">{detail?.author?.bio}</p>

                                        {/* <ul className="social-link-list">
                                            <li className="list-item">
                                                <a href="#" tabindex="-1">
                                                    <i className="fab fa-facebook-f icon"></i>
                                                </a>
                                            </li>
                                            <li className="list-item">
                                                <a href="" tabindex="-1">
                                                    <i className="fab fa-twitter icon"></i>
                                                </a>
                                            </li>
                                            <li className="list-item">
                                                <a href="#" tabindex="-1">
                                                    <i className="fab fa-instagram icon"></i>
                                                </a>
                                            </li>
                                            <li className="list-item">
                                                <a href="#" tabindex="-1">
                                                    <i className="fas fa-rss icon"></i>
                                                </a>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                      

                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Postdetails