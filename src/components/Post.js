import  Axios  from 'axios'
import React, { useState } from 'react'
import styles from '../Styles/Post.module.css'
import { Link, useNavigate } from 'react-router-dom';
export const Post = () => {
 
    const [title,setTitle]=useState(null)
    const [content,setContent]=useState(null)
    const [image,setImage]=useState(null)

    const[error,setError]=useState()
    const navigate=useNavigate()
  
const hendelSubmit= async (e)=>{
    let formfield=new FormData()
    formfield.append('title',title)
    formfield.append('content',content)
    if (image !== null){
        formfield.append('image',image)
    }
    
e.preventDefault()
try {  await Axios({
        method:"post",
        url:"http://localhost:8000/mypost/",
        data:formfield,
        headers:{
            Authorization:`token ${window.localStorage.getItem("token")}`,
         
        }
       
    }).then((response)=>{
        console.log(response.data)
        

        navigate('/')
        
        
      
    })}
    catch(err){
        setError("file name is too long. please rename the image file !!")

    }


}

 






console.log(title)



    return (
    < div className = {
        styles.testbox
    } > <div className={styles.container}>

        <form onSubmit={hendelSubmit}>
        <div className={styles.row}>
            <div className={styles.row}>

                <div className={`${styles.inputgroup} ${styles.ingroupitem}`}>
                    <input type="text" required value={title} name="title" maxlength="200"  onChange={(e)=>setTitle(e.target.value)} placeholder="Post Title"/>
                </div>
            </div>
            <div className={styles.row}>
                <div className={`${styles.inputgroup} ${styles.ingroupitem}`}>
                    <textarea  name="content" required value={content} onChange={(e)=>setContent(e.target.value)} placeholder='Post Discription' cols="5" rows="8"></textarea>
                </div>
            </div>

            <div className={styles.row}>
                <div className={`${styles.inputgroup} ${styles.ingroupitem}`}>
                    <input type="file"  name='image'  onChange={(e)=>setImage(e.target.files[0])} />
                    {error && <b style={{'color':'red'}}>{error}</b>}


                </div>
                
            </div>
            <button type='submit' style={{'float':'left','padding':'10px 30px','marginTop':'16px','background':'#f13b3a','borderRadius':'8px','color':'#fff'}}>Post</button>
           </div>
        </form>
    </div>
    
</div> 

    )
}