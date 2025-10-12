import { Routes, Route, Navigate, Outlet } from 'react-router';
import Login from '../pages/login';
import Polls from '../pages/polls';

const Router = () => {

    const AuthRoutes = () => {
        // get localstorage data to check if user is logged in or not
        const userId = localStorage.getItem('userId');
        return userId !== null ? <Outlet /> : <Navigate to={'/'} />;
    };

    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route exact element={<AuthRoutes />}>
                <Route path='/polls' element={<Polls />} />
            </Route>
        </Routes>
    );
};

export default Router;
