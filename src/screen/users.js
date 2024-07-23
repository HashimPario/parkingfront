import React, { useEffect, useState } from 'react'
import SideNav from '../components/SideBar';
import CustomTable from '../components/CustomTable';
import axios from 'axios'

const Users = () => {

  return (
    <div className='dashboard'>
      <SideNav />

      <div className='main-content'>
      <div>
          <h2>All Users</h2>
        </div>
        <div className='profile-content'>
          <CustomTable/>
        </div>
      </div>
    </div>
  )
}

export default Users;