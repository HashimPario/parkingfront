import React, { useEffect, useState } from 'react'
import SideNav from '../components/SideBar';
import CustomTable from '../components/CustomTable';
import axios from 'axios'
import BookingTable from '../components/BookingTable';

const MyBookings = () => {


  return (
    <div className='dashboard'>
      <SideNav />

      <div className='main-content'>
      <div>
          <h2>All Users</h2>
        </div>
        <div className='profile-content'>
          <BookingTable/>
        </div>
      </div>
    </div>
  )
}

export default MyBookings;