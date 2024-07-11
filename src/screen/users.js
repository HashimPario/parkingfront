import React, { useEffect, useState } from 'react'
import SideNav from '../components/SideBar';
import CustomTable from '../components/CustomTable';
import axios from 'axios'

const Users = () => {

  // const[userData,setUserData] = useState([]);

  // useEffect(()=>{
  //   getUsers();
  // },[])

  // const getUsers = async () => {
  //   axios.get('/getUsers')
  //     .then((response)=> {
  //       // console.log(response.data);
  //       setUserData(response.data)  
  //     })   
  // }

  return (
    <div className='dashboard'>
      <SideNav />

      <div className='main-content'>
      <div>
          <h2>All Users</h2>
        </div>
        <div className='profile-content'>
          {/* <CustomTable myValues={userData}/> */}
          <CustomTable/>
        </div>
      </div>
    </div>
  )
}

export default Users;