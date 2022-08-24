import React, { useState } from 'react'
import classes from "../Login.module.css"
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
    const [username,setUsername]=useState(null)
    const [password,setPassword1]=useState(null)
    const [password2,setPassword2]=useState(null)
    const [error,setError]=useState()
    const navigate = useNavigate();
    const hendelSubmit=(e)=>{
        
        e.preventDefault()
        if(password === password2){
            Axios({
                method:'post',
                url:'http://localhost:8000/registers/',
                data:{
                    'username':username,
                    'password':password
                }
            }).then((response)=>{
                console.log(response.data)
                navigate('/login')
                
                
            }).catch((err)=>{
                setError("Sorry username already taken.!!")


            })
    
        }
        else{
            setError("Password not match !!")
        }

    }



  return (
    <div> <link
    href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600'
    rel='stylesheet'
    type='text/css' />
    <link
        href="//netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css"
        rel="stylesheet" />

        <div class={classes.testbox}>
            <h1>Register</h1>
            {error && <center style={{'color':'red'}}>{error}</center>}

            <form onSubmit={hendelSubmit} >

            <hr/>
            <div class={classes.accounttype}>
                <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" /></div>
                <hr />

                    <label id={classes.icon} for="name">
                        <i class="icon-user"></i>
                    </label>

                    <input type="text" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}   placeholder="Username" />
                        <label id={classes.icon} for="name">
                            <i class="icon-shield"></i>
                        </label>
                        <input type="password" value={password} name="password" onChange={(e)=>{setPassword1(e.target.value)}} placeholder="Password" />
                        <label id={classes.icon} for="name">
                            <i class="icon-shield"></i>
                        </label>
                        <input type="password" value={password2} name="password" onChange={(e)=>{setPassword2(e.target.value)}} placeholder="Confirm Password" />
                            <p  style={{
      'width':'150px',
      'display': 'inline-block',
      'marginLeft': '18px',
      'fontSize':'14px'
      }}>Already have an account? 
                                <Link to={'/login'} style={{'color':'#f13b3a'}}><b>Sign in</b> </Link>.</p>
                            <button type="submit">Signup</button>

                        </form>
                    </div>
                
                </div>
          
  )
}
