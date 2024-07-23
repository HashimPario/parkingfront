import React, { useEffect, useState } from 'react';
import '../../screen/style/dashboard.css';
import logo from '../../Assets/logo.png';
import { SideBar, SideBarUser } from '../../helper/constant';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { useSelector } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';

const SideNav = () => {
    const [path, setPath] = useState(window.location.pathname);
    const [sideNavData, setSideNavData] = useState([]);
  
    const navigate = useNavigate();

    const role = useSelector((state) => state.park.userRole);

    useEffect(() => {     
        if (role) {
            setSideNavData(role === 'admin' ? SideBar : SideBarUser);  
        }
    }, [role]);

    const loggedOut = () => {
        confirmAlert({
            title: 'Confirm to Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    label: 'No',
                },
                {
                    label: 'Yes',
                    onClick: () => {
                        sessionStorage.setItem('token', '');
                        navigate('/');
                    }
                },
            ]
        });
    };

   

    return (
        <div className='sidebar'>
            <div className='logo'>
                <img src={logo} width="80px" height="80px" alt="Logo" />
                <h1>Parking Yard</h1>
            </div>
            <div>
                {sideNavData.map((item) => (
                    <p key={item.path} className={item.path === path ? 'menu-items2' : 'menu-items'}>
                        <span className={item.title === 'Logout' ? "logout" : ''} onClick={() => navigate(item.path)}>{item.icon}</span>
                        <span className={item.title === 'Logout' ? "logout" : 'sidebar-title'} onClick={item.path === '/logout' ? loggedOut : () => navigate(item.path)}>{item.title}</span>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default SideNav;
