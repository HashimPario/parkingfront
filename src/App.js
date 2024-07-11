import React, { useEffect } from 'react'
import AppRoute from './router/appRoute'
import axios from 'axios'
import {useDispatch} from "react-redux"
import {addUser} from './store/slice'

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const token = sessionStorage.getItem('token')
    //console.log("Token:", token)
    try{
      if(token)
        {
      axios.get(`/getcurrentuser/${token}`)
      .then((res)=>{
        dispatch(addUser(res.data));
        //console.log("API se araha he data: ",res.data)
      })
      }
    }
    catch(err){
    }
  },[])
  return (
    <AppRoute/>
  )
}

export default App