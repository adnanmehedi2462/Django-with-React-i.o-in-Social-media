
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export const SlideItem = (props) => {

const {allPost}=props
const [currentPage,setCurrentPage]=useState(1)

const [postParpage,SetPostParpage]=useState(4)


  const indexOflastPost=currentPage*postParpage
  const indexofFirstPOst=indexOflastPost-postParpage
  const currentPost=allPost.slice(indexofFirstPOst,indexOflastPost) 



  return (
   <>
  
        <div className="widget widget-recent-post wow bounceInUp" data-wow-duration="3.6s">
        <h5 className="widget-title">Latest Posts</h5>
        <ul className="post-list">




        {currentPost && currentPost.map((item=>(
    <>
            <li>
                <div className="thumb">
                    <img src={item.image} alt="image" style={{'height':'70px','width':'auto'}} />
                </div>
                <div className="content">
                    <span className="catg">
                      
                     </span>
                    <h5 className="post-title">
                        <Link to={`detail${item.id}`}>{item.title}</Link>
                    </h5>
                </div>
            </li>
    </>
   )))}
           
          
    </ul>
    </div>
   </>
  )
}
