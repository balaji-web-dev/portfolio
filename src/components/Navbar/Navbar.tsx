import './styles.scss';

import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import { EMenuItems, IMenuItems } from '../../interfaces';
import { setTopOffSetAction } from '../../store';
import { useActiveMenu } from '../../utils';

export const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const navRef = useRef<HTMLElement>(null);

    const { activeMenu, setActiveMenu } = useActiveMenu();

    const menuItems: IMenuItems[] = Object.values(EMenuItems).filter((val) => typeof val === 'string') as unknown as IMenuItems[];

    useEffect(() => {
        console.log('offsetTop', navRef?.current?.offsetTop);
        console.log('offsetHeight', navRef?.current?.offsetHeight);
        console.log('offsetHeight', navRef?.current?.offsetWidth);

        dispatch(setTopOffSetAction((navRef?.current?.offsetHeight || 0) + 20 + 'px'));
    }, [navRef?.current?.offsetHeight]);

    return (
        <nav className='nav-bar' ref={navRef}>
            <div className='nav-logo-container'>
                <Link to={'/admin'}>
                    <img className='nav-logo' src={logo} alt='' />
                </Link>
            </div>
            <ul className='menu'>
                {menuItems.map((menuItem, menuItemIndex) => (
                    <li className={activeMenu !== menuItem ? 'menu-item' : 'menu-item active'} key={menuItem + '-' + menuItemIndex}>
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
            </ul>
        </nav>
    );
};
