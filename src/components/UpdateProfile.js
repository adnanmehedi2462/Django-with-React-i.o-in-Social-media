
import styles from '../Formpro.module.css'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from '../StateAll/Stateprovider'
import Profile from './Profile';


 export const UpdateProfile = () => {
    const navigate=useNavigate()
    const [{ getprofile }, dispatch] = useStateValue()


    
    const [allPost, setAllPost]=useState(null)
    const [loading,setLoading]=useState(true)
    const [firstname,setFirstname]=useState(getprofile?.userdata?.user?.first_name)
    const [lastname,setLastname]=useState(getprofile?.userdata?.user?.last_name)
    const [email,setEmail]=useState(getprofile?.userdata?.user?.email)
    const [bio,setBio]=useState(getprofile?.userdata?.bio)
    const [about, setAbout]=useState(getprofile?.userdata?.about)
    const [image1,setImage1]=useState(null)
    const [image,setImage]=useState('')
    const [myerror,setMyerror]=useState('')
    
    



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
            setLoading(true)

        })

    }
    

  
useEffect(()=>{
      
    getpostdata()
   
  },[])
  
const handelSubmit=async(e)=>{
    e.preventDefault();
    await Axios({
        method:'post',
        url:'http://localhost:8000/updateprofile',
        
        data:{
            'first_name':firstname,
            'last_name':lastname,
            'email':email,


        },
        headers:{
            Authorization:`token ${window.localStorage.getItem("token")}`

        }
    }).then(response=>{
        console.log(response.data)
        if (response.data.success){
            navigate('/profile')
        }
        else{
            navigate('/update_profile')
        }
       
    })

    let formfield=new FormData();
    formfield.append('bio',bio)
    formfield.append('about',about)

    if (image1 !== null){
        formfield.append('image',image1)
    }

    e.preventDefault();

    await Axios({
        method:'post',
        url:'http://localhost:8000/updatemainprofile',
        data:formfield,
        headers:{
            Authorization:`token ${window.localStorage.getItem("token")}`

        }
    }).then(response=>{
        console.log(response.data,"hhhhiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
       
        if (response.data.success){
            navigate('/profile')
        }
        else if(response.data.error){
            console.log("na hoy nai success")
            setMyerror("file name is too long. please rename the image file !!")
            navigate('/update_profile')

        }
        
       
    })

}
 



// const handelSubmittwo=async(e)=>{
   
//     let formfield=new FormData();
//     formfield.append('bio',bio)
//     formfield.append('about',about)

//     if (image1 !== null){
//         formfield.append('image',image1)
//     }

//     e.preventDefault();

//     await Axios({
//         method:'post',
//         url:'http://localhost:8000/updatemainprofile',
//         data:formfield,
//         headers:{
//             Authorization:`token ${window.localStorage.getItem("token")}`

//         }
//     }).then(response=>{
//         console.log(response.data,"hhhhiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
       
//         if (response.data.success){
//             navigate('/profile')
//         }
//         else if(response.data.error){
//             console.log("na hoy nai success")
//             setMyerror("file name is too long. please rename the image file !!")

//         }
        
       
//     })
   
 

// }
 



  return (
 <>
    <div className={`${styles.page_wrapper } ${styles.p_top} ${styles.b_botom}`}>
            <div className={`${styles.wrapper} ${styles.wpr}`}>
                <div className={`${styles.card} ${styles.card_6}`}>
                    <div className={styles.card_heading}>
     
                    </div>
                    <div className={styles.card_body}  style={{'boxShadow':'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px','border':'1px solid red'}}>
                        <form  onSubmit={handelSubmit}>
                            <div className={styles.form_row}>
                                <div className={styles.name}>First name</div>
                                <div className={styles.value}>
                                    <input className={styles.instyle} placeholder="First Name" value={firstname} onChange={e=>setFirstname(e.target.value)} type="text" name="full_name" />
                                </div>
                            </div>
                            <div className={styles.form_row}>
                                <div className={styles.name}>Last name</div>
                                <div className={styles.value}>
                                    <input className={styles.instyle} placeholder="Last Name" onChange={e=>setLastname(e.target.value)} value={lastname} type="text" name="full_name" />
                                </div>
                            </div>
                            <div className={styles.form_row}>
                                <div className={styles.name}>Email address</div>
                                <div className={styles.value}>
                                    <div className={styles.ingroup}>
                                        <input
                                            className={styles.instyle}
                                            type="email"
                                            name="email"
                                            onChange={e=>setEmail(e.target.value)}
                                            value={email}
                                            placeholder="example@email.com" />
                                    </div>
                                </div>
                            </div>






                        

                 <div className={styles.form_row}>
                    <div className={styles.name}>Bio</div>
                    <div className={styles.value}>
                        <div className={styles.ingroup}>
                            <textarea
                                className={styles.instyle}
                                name="bio"
                                value={bio}
                                onChange={e=>setBio(e.target.value)}
                                placeholder="Bio"></textarea>
                        </div>
                    </div>
                </div>
                <div className={styles.form_row}>
                    <div className={styles.name}>About</div>
                    <div className={styles.value}>
                        <div className={styles.ingroup}>
                            <textarea value={about}
                            onChange={e=>setAbout(e.target.value)}
                                className={styles.instyle}
                                name="about"
                                placeholder="About" col="3" rows="4"></textarea>
                        </div>
                    </div>
                </div>
                <div className={styles.form_row}>
                    <img src={`http://localhost:8000${getprofile?.userdata?.image}`} style={{'height':'50px','width':'50px'}} />
                    <div className={styles.name}>Upload Photo</div>
                    <div className={styles.value}>
                        <div className={styles.ingroup} >
                            <input className="input-file" onChange={(e)=>setImage1(e.target.files[0])} type="file" name="image" id="file" />
                            
                            
                        </div>
                        <div className="label--desc">Upload your photo. Max file size 5 MB </div>
                        {myerror && <b style={{'color':'red'}}>{myerror}</b>}
                    </div>
                </div> 
                                <div className={styles.c_fotter} >
                        <button style={{'background':"#f13b3a"}} className= {`${styles.btn} ${styles.btnr}`} type="submit">Send Application</button>
                    </div>
                        </form>
                    
                    </div>
                    
                </div>
            </div>
        </div>




















{/* 
<div className={`${styles.page_wrapper } ${styles.p_top} ${styles.b_botom}`}>
<div className={`${styles.wrapper} ${styles.wpr}`}>
    <div className={`${styles.card} ${styles.card_6}`}>
        <div className={styles.card_heading}>

        </div>
        <div className={styles.card_body}  style={{'boxShadow':'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px','border':'1px solid red'}}>
            <form  onSubmit={handelSubmittwo}>
          






                 <div className={styles.form_row}>
                    <div className={styles.name}>Bio</div>
                    <div className={styles.value}>
                        <div className={styles.ingroup}>
                            <textarea
                                className={styles.instyle}
                                name="bio"
                                value={bio}
                                onChange={e=>setBio(e.target.value)}
                                placeholder="Bio"></textarea>
                        </div>
                    </div>
                </div>
                <div className={styles.form_row}>
                    <div className={styles.name}>About</div>
                    <div className={styles.value}>
                        <div className={styles.ingroup}>
                            <textarea value={about}
                            onChange={e=>setAbout(e.target.value)}
                                className={styles.instyle}
                                name="about"
                                placeholder="About" col="3" rows="4"></textarea>
                        </div>
                    </div>
                </div>
                <div className={styles.form_row}>
                    <img src={`http://localhost:8000${getprofile?.userdata?.image}`} style={{'height':'50px','width':'50px'}} />
                    <div className={styles.name}>Upload Photo</div>
                    <div className={styles.value}>
                        <div className={styles.ingroup} >
                            <input className="input-file" onChange={(e)=>setImage1(e.target.files[0])} type="file" name="image" id="file" />
                            
                            
                        </div>
                        <div className="label--desc">Upload your photo. Max file size 5 MB </div>
                        {myerror && <b style={{'color':'red'}}>{myerror}</b>}
                    </div>
                </div> 
                    <div className={styles.c_fotter} >
            <button style={{'background':"#f13b3a"}} className= {`${styles.btn} ${styles.btnr}`} type="submit">Send Application</button>
        </div>
            </form>
        
        </div>
        
    </div>
</div>
</div> */}
</>
      
  )
}
