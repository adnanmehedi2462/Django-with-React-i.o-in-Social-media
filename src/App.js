import { BrowserRouter } from 'react-router-dom';

import { Navigate, Route, Routes } from "react-router-dom";
import React,{createContext,useReducer,useContext} from "react";
import './App.css';
import { Home } from './components/Home';
import { Header } from './components/Header';
// import { Postdetails } from './components/Postdetails';
import Postdetails from './components/Postdetails';
import { AboutWriter } from './components/AboutWriter';
import { Error } from './components/Error';
import Profile from './components/Profile';
import { UpdateProfile } from './components/UpdateProfile';

import { useEffect } from 'react';

import { initialstate } from './StateAll/Reducer';
import { useStateValue } from './StateAll/Stateprovider';
import Axios from 'axios'
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Post } from './components/Post';
import { Demo } from './components/Demo';
import { UpdatePost } from './components/UpdatePost';
import { Search } from './components/search/Search';


function App() {
  const [{ getprofile }, dispatch] = useStateValue()
// console.log(profile,"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")


useEffect(()=>{
 
 try {
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



}
catch{
  dispatch({
    type:"ADD_PROFILE",
    value:null
  })
}
},[])






  return (

<>
<Header />

    <Routes>
        {getprofile ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Demo />} /> }
        
      
        <Route path="writer:id" element={<AboutWriter />} />
        {getprofile ? <Route path="/profile" element={<Profile />} /> :  <Route path="*" element={<Error  />  } /> }
        {getprofile ? <Route path="/update_profile" element={<UpdateProfile />} /> :  <Route path="*" element={<Error  />  } /> }
        {getprofile ? <Route path="*" element={<Error  />  } /> :<Route path="login" element={<Login />} /> }
        {getprofile ? <Route path="*" element={<Error  />  } /> :<Route path="Register" element={<Register />} /> }
        {getprofile ? <Route path="/newpost" element={<Post />} /> :  <Route path="*" element={<Error  />  } /> }
        
        {getprofile ? <Route path="/updatepost-:id/" element={<UpdatePost />} /> :  <Route path="*" element={<Error  />  } /> }
        
       
        {getprofile ? <Route path="detail:id" element={<Postdetails />} /> : <Route path="*" element={<Error  />  } /> }
        {getprofile ? <Route path="writer:id/" element={<AboutWriter />} /> :  <Route path="*" element={<Error  />  } />}
        {/* {getprofile ? <Route path="/writer:id" element={<AboutWriter />} /> :  <Route path="*" element={<Error  />  } />} */}
        <Route path="search" element={<Search />} />
        
    </Routes>

</>



 
  );
}

export default App;
