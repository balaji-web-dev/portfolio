import './styles.scss';

import React from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '../Navbar/Navbar';

export const AdminLayout: React.FC = () => {
    // const { activeMenu } = useActiveMenu();

    return (
        <div className='admin-layout'>
            <Navbar />
            <Outlet />
            <footer></footer>
        </div>
    );
};
