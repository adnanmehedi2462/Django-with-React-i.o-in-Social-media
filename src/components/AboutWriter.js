import React from 'react'
import  Axios  from 'axios'
import  { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'
import { useStateValue } from '../StateAll/Stateprovider'

export const AboutWriter = () => {
    const [{ getprofile }, {}] = useStateValue()

    const {id}=useParams()
    const[aboutwriter,setAboutwriter]=useState(null)
    const [allPost, setAllPost]=useState(null)
   const [loading,setLoading]=useState(true)
    
    const getwriter=async()=>{
        await Axios({
            method:"get",
            url:`http://localhost:8000/mypost/${id}`,
            headers:{
                Authorization:`token ${window.localStorage.getItem("token")}`

            },

        }).then(response=>{
        
            console.log(response.data)
            setAboutwriter(response.data)
          
        })

    }



useEffect(()=>{
    getwriter()
},[])







const getpostdata=async()=>{
    
    await Axios({
        method:"get",
        url:"http://localhost:8000/mypost/",
        headers:{
            Authorization:`token ${window.localStorage.getItem("token")}`

        },
       
    }).then(response=>{
        setAllPost(response.data)
        console.log(response.data)
        setLoading(false)
    })

}

console.log(getprofile,'proooooooooooooooooooofileeeeeeeee')
console.log(aboutwriter,'aaaaabouttttttwriter')
useEffect(()=>{
  
getpostdata()

},[])










  return (
    <>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <div className="breadcrumb-area">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="breadcrumb-inner">
                    <h2 className="page-title">{aboutwriter?.author?.user?.username}</h2>
                    <ul className="page-list">
                        <li className="list-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="list-item">
                            <a href="#">author</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div className="about-author-area-wrapper">
    <div className="container">
        <div className="row">
            <div className="col-lg-4">
                <div className="img-box">
                    <img
                        src={`http://localhost:8000${aboutwriter?.author?.image}`}
                        alt=""
                        style={{'marginBottom': '63px','height':'300px','width':'auto','borderRadius': '25% 10%'}} />
                </div>
            </div>
            <div className="col-lg-8">
                <div className="content-wrap">
                    <div className="content">
                        <h4 className="title">{aboutwriter?.author?.user?.first_name} {aboutwriter?.author?.user?.last_name}  
                        </h4>
                        <a>{aboutwriter?.author?.user?.email}</a><br/>

                        <span className="sub-title">{aboutwriter?.author?.bio}</span>








                        <p className="info">{aboutwriter?.author?.about}
                        </p>

                        <div className="socila-link-wrap">
                            <ul className="social-link-list">
                                <li className="list-item">
                                    <a href="#">
                                        <i className="lab la-facebook-f icon"></i>
                                    </a>
                                </li>
                                <li className="list-item">
                                    <a href="#">
                                        <i className="lab la-instagram icon"></i>
                                    </a>
                                </li>
                                <li className="list-item">
                                    <a href="#">
                                        <i className="lab la-linkedin-in icon"></i>
                                    </a>
                                </li>
                                <li className="list-item">
                                    <a href="#">
                                        <i className="lab la-pinterest-p icon"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div> 



{console.log(aboutwriter?.author?.user?.username,'xxxxxxxxxxxxxxxx')}

{ allPost && allPost.map((P)=>(
<>
{console.log(P?.author?.user?.username ,'yehooollllllllllllll')}
{aboutwriter?.author?.user?.username === P?.author?.user?.username &&  (

     <div className="col-lg-8 col-xl-9 offset-md-2"  >
    <div className="single-blog-list-1-index-1 wow bounceInUp" data-wow-duration="1.8s">
         <div className="content-top">
             <span className="first-word space-style">Blog</span>
             <h2 className="title">
             <span ><img  src={`http://localhost:8000${P?.author?.image} `}    style={{'height':'60px','width':'60px','border-radius':'200px'}}/></span>
                                       
                                        
                                        
                 <a href="#">{P.title}</a>
             </h2>
             <div className="img-box">
             
                 <img src={P.image}  onError={(event) => event.target.style.display = 'none'}  />  
             </div>
             <div className="content-bottom">
                 <p className="info">{P.content.slice(0,200)}...... 
                 </p>
                 <div className="post-meta">
                     <div className="left-content">
                         <div className="btn-wrapper">
                             <Link to={`/detail${P.id}`} className="reading-btn">continue reading</Link>
                         </div>
                     </div>
                     <div className="right-content">
                         <ul className="list">
                             <li className="list-item">
                                 <Link  to={`writer${P.id}`}>
                                     <i className="far fa-user icon"></i>
                                     <Link to={`/writer${P.id}`} className="text">{P.author.user.username}</Link>
                                 </Link>
                             </li>
                             
                             <li className="list-item">
                                 <a href="#">
                                     <i className="far fa-clock icon"></i>
                                     <span className="text">{P.create}</span>
                                 </a>
                             </li>
                             <li className="list-item">
                                 <a href="#">
                                     <i className="far fa-share-square icon"></i>
                                     <span className="text">share</span>
                                 </a>
                             </li>
                         </ul>
                     </div>
                 </div>
             </div>
         </div>
     </div>
     </div>
 
) }
         
</>
 ))}



</>
  )
}
