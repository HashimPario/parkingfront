import React from 'react'
import SideNav from '../components/SideBar'

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <SideNav />
            <div className='main-content'>
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}
export default Dashboard;