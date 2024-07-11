import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';

export const SideBar = [
    {
        icon: <DashboardIcon/>,
        title:'Dashboard Admin',
        path:'/dashboard'
    },
    {
        icon:<LocalParkingIcon/>,
        title:'All Parking',
        path:'/allparking'
    },
    {
        icon:<PersonIcon/>,
        title:'Users',
        path:'/users'
    },
    {
        icon:<AssignmentIndIcon/>,
        title:'Profile',
        path:'/profile'
    },
    {
        icon:<LogoutIcon/>,
        title:'Logout',
        path:'/logout'
    }

]

export const SideBarUser = [
    {
        icon: <DashboardIcon/>,
        title:'Dashboard User',
        path:'/dashboard'
    },
    {
        icon:<LocalParkingIcon/>,
        title:'All Parking',
        path:'/userparking'
    },
    {
        icon:<PersonIcon/>,
        title:'My Bookings',
        path:'/mybookings'
    },
    {
        icon:<AssignmentIndIcon/>,
        title:'Profile',
        path:'/profile'
    },
    {
        icon:<LogoutIcon/>,
        title:'Logout',
        path:'/logout'
    }

]