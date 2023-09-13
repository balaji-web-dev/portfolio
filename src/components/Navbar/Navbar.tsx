import './styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import { EMenuItems, IMenuItems } from '../../interfaces';
import { useActiveMenu } from '../../utils';

export const Navbar: React.FC = () => {
    const { setActiveMenu } = useActiveMenu();

    const menuItems: IMenuItems[] = Object.values(EMenuItems).filter((val) => typeof val === 'string') as unknown as IMenuItems[];

    return (
        <nav className='nav-bar'>
            <div className='nav-logo-container'>
                <Link to={'/admin'}>
                    <img className='nav-logo' src={logo} alt='' />
                </Link>
            </div>
            <ul className='menu'>
                {menuItems.map((menuItem, menuItemIndex) => (
                    <li className='menu-item' key={menuItem + '-' + menuItemIndex}>
                        <a
                            href={
                                '#' +
                                menuItem
                                    .replace(/([a-z])([A-Z])/g, '$1-$2')
                                    .replace(/[\s_]+/g, '-')
                                    .toLowerCase()
                            }
                        >
                            <div id='translate'></div>
                            <button className='nav-btn' id='button-5' onClick={() => setActiveMenu(menuItem)}>
                                {menuItem}
                            </button>
                        </a>
                    </li>
                ))}
                {/* <li className='menu-item'>
                    <div className='nav-btn' id='button-5'>
                        <div id='translate'></div>
                        <a href='#'>Home</a>
                    </div>
                </li>
                <li className='menu-item'>
                    <div className='nav-btn' id='button-5'>
                        <div id='translate'></div>
                        <a href='#'>About us</a>
                    </div>
                </li>
                <li className='menu-item'>
                    <div className='nav-btn' id='button-5'>
                        <div id='translate'></div>
                        <a href='#'>Projects</a>
                    </div>
                </li>
                <li className='menu-item'>
                    <div className='nav-btn' id='button-5'>
                        <div id='translate'></div>
                        <a href='#'>Contact</a>
                    </div>
                </li> */}
            </ul>
        </nav>
    );
};
