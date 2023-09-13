import './styles.scss';

import React from 'react';
import { Outlet } from 'react-router-dom';

import { EMenuItems, IMenuItems } from '../../interfaces';
import { useActiveMenu } from '../../utils';
import { Navbar } from '../Navbar/Navbar';
import { ProgressMenu } from '../ProgressMenu';

export const Layout: React.FC = () => {
    const { activeMenu } = useActiveMenu();

    return (
        <div className='layout'>
            <ProgressMenu<IMenuItems>
                menuItems={Object.values(EMenuItems).filter((val) => typeof val === 'string') as (string | IMenuItems)[]}
                activeMenu={activeMenu}
            ></ProgressMenu>
            <Navbar />
            <Outlet />
            <footer></footer>
        </div>
    );
};
