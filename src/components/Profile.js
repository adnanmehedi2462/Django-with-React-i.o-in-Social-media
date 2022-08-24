import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../StateAll/Stateprovider'


const Profile = () => {
    const [{ getprofile }, dispatch] = useStateValue()



    const [allPost, setAllPost]=useState(null)
    const [loading,setLoading]=useState(true)
    const [firstname,setFirstname]=useState(getprofile?.userdata?.user?.first_name)
    const [lastname,setLastname]=useState(getprofile?.userdata?.user?.last_name)
    const [email,setEmail]=useState(getprofile?.userdata?.user?.email)
    const [bio,setBio]=useState(getprofile?.userdata?.bio)
    const [about, setAbout]=useState(getprofile?.userdata?.about)
    const [image,setImage]=useState(getprofile?.userdata?.image)
    



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
    

  
useEffect(()=>{
      
    getpostdata()
  
  },[])

  useEffect(()=>{
    const getmyprofile=async()=>{
        await Axios({
            method:"get",
            url:"http://localhost:8000/profile",
            headers:{
                Authorization: `token ${window.localStorage.getItem("token")}`
            }
        }).then(response=>{
        
            console.log(response.data)
            // setGetprofile(response.data)
            dispatch({
              type:"ADD_PROFILE",
              value:response.data
            })

         
          
        })
    
    }

    getmyprofile()

     
},[allPost])







  return (
  
  <>
 
   <div className="breadcrumb-area">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="breadcrumb-inner">
                    <h2 className="page-title">{getprofile?.userdata?.user?.username}</h2>
                    <ul className="page-list">
                        <li className="list-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="list-item">
                            <Link to={'/update_profile'}>Update Profile</Link>
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
                        src={`http://localhost:8000${getprofile?.userdata?.image}`}
                        alt=""
                        style={{'marginBottom': '63px','height':'300px','width':'auto','borderRadius': '25% 10%'}} />
                </div>
            </div>
            <div className="col-lg-8">
                <div className="content-wrap">
                    <div className="content">
                        <h4 className="title">{getprofile?.userdata?.user?.first_name} {getprofile?.userdata?.user?.last_name}
                        </h4>
                        <a>{getprofile?.userdata?.user?.email}</a><br/>

                        <span className="sub-title">{getprofile?.userdata?.bio}</span>








                        <p className="info">{getprofile?.userdata?.about}
                        </p>
                        <div style={{'background':'#f13b3a','display':'inline-block','padding':'10px 30px','color':'#fff','borderRadius':'5px'}}>
                           <Link to={'/update_profile'}>Update Profile</Link>
                        </div>
                           
                       

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





{ allPost && allPost.map((P)=>(
<>
{getprofile?.userdata?.user?.id === P?.author?.user?.id  && (
    
     <div className="col-lg-8 col-xl-9 offset-md-2"  >
    <div className="single-blog-list-1-index-1 wow bounceInUp" data-wow-duration="1.8s">
         <div className="content-top">
             <span className="first-word space-style">Blog</span>
             <h2 className="title">
             <span ><img  src={`http://localhost:8000${P.author.image} `}    style={{'height':'60px','width':'60px','border-radius':'200px'}}/></span>
                                       
                                        
                                        
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

export default Profile