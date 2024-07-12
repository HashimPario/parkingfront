import { Outlet, Navigate } from 'react-router-dom';

const AuthPrivateRoutes = () => {
    let token = sessionStorage.getItem('token');
    let auth = { token };
    return(
        auth.token ? <Navigate to="/dashboard" /> : <Outlet />
    );
}

export default AuthPrivateRoutes;
