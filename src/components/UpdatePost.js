import React, { useEffect, useState } from 'react'
import styles from '../Styles/Post.module.css'
import { Link, useParams,useNavigate } from 'react-router-dom'
// import { useStateValue } from '../StateAll/Stateprovider'

import  Axios from 'axios'
export const UpdatePost = () => {
    const navigate=useNavigate()
    // const [{ getprofile }, dispatch] = useStateValue()

     const {id}=useParams()
     const[UpdateDetail,setUpdateDetail]=useState('')
     const[title,setTitle]=useState('')
     const[content,setContent]=useState('')
     const [image1,setImage1]=useState(null)
     const [image,setImage]=useState('')
     const [error,setError]=useState()
     

     
     const getsinglePost=async()=>{
         await Axios({
             method:"get",
             url:`http://localhost:8000/mypost/${id}`,
             headers:{
                 Authorization:`token ${window.localStorage.getItem("token")}`
 
             },
         }).then(response=>{
         
            
             setTitle(response.data?.title)
             setContent(response.data?.content)
             setImage(response.data?.image)

           
         })
 
     }
 
  
 
 useEffect(()=>{
     getsinglePost()
 },[])
 




 const UpdatePost=async(e)=>{
   
    let formfield=new FormData()
    formfield.append('title',title)
    formfield.append('content',content)
try {    if (image1 !== null){
        formfield.append('image',image1)
    }
    e.preventDefault()
    await Axios({
        method:"put",
        url:`http://localhost:8000/mypost/${id}/`,
        data:formfield,
        headers:{
            Authorization:`token ${window.localStorage.getItem("token")}`,

        }


    }).then((resposne)=>{
        console.log(resposne.data)
        navigate("/")
    })}
    catch(err){
        setError("file name is too long. please rename the image file !!")


    }

 }


   
  return (
    <div>


< div className = {
        styles.testbox
    } > <div className={styles.container}>

        <form onSubmit={UpdatePost} >
        <div className={styles.row}>
            <div className={styles.row}>

                <div className={`${styles.inputgroup} ${styles.ingroupitem}`}>
                    <input type="text" value={title} onChange={e=>setTitle(e.target.value)}   maxlength="200"  name="title"  placeholder="Post Title"/>
                </div>
            </div>
            <div className={styles.row}>
                <div className={`${styles.inputgroup} ${styles.ingroupitem}`}>
                    <textarea  name="content" value={content} onChange={e=>setContent(e.target.value)}  placeholder='Post Discription' cols="5" rows="8"></textarea>
                </div>
            </div>

            <div className={styles.row}>
                <div className={`${styles.inputgroup} ${styles.ingroupitem}`}>
                    <img src={image} style={{'height':'100px','width':'auto'}} />
                    <input type="file" onChange={e=>setImage1(e.target.files[0])} name='image1' />
                    {error && <b style={{'color':'red'}}>{error}</b>}
                   


                </div>
                
            </div>
            <button type='submit' style={{'float':'left','padding':'10px 30px','marginTop':'16px','background':'#f13b3a','borderRadius':'8px','color':'#fff'}}>Update Post</button>
           </div>
        </form>
    </div>
    
</div> 

    </div>
  )
}
