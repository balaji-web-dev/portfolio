import './styles.scss';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../../firebase';
import { useAuth } from '../../hooks';

enum EMenu {
    DASHBOARD = 'Dashboard',
    PROJECTS = 'Projects',
    SKILLS = 'Skills',
}

type IMenu = `${EMenu}`;

const menu: IMenu[] = [EMenu.DASHBOARD, EMenu.PROJECTS, EMenu.SKILLS];

export const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const { logout } = useAuth();

    const [activeMenu, setActiveMenu] = useState<IMenu>(EMenu.DASHBOARD);

    console.log(activeMenu.toLowerCase());

    useEffect(() => {
        navigate(activeMenu.toLowerCase());
    }, [activeMenu]);

    return (
        <nav className='admin-nav'>
            <button className='back-btn' onClick={() => navigate('/')}>
                Back to Home
            </button>

            <div className='menu'>{activeMenu}</div>

            <ul>
                {menu.map((item) => (
                    <li className={activeMenu === item ? 'active' : ''} onClick={() => setActiveMenu(item)}>
                        {item}
                    </li>
                ))}
            </ul>

            <div className='user-profile'>
                <img className='profile-img' src={auth.currentUser?.photoURL || ''} alt='profile-img' />
                {auth.currentUser?.displayName}
            </div>

            <button className='logout-btn' onClick={() => (logout(), navigate('/'))}>
                logout
            </button>
        </nav>
    );
};
