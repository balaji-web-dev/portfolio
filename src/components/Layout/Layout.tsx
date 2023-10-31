import './styles.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { EMenuItems, IMenuItems } from '../../interfaces';
import { selectTopOffSet } from '../../store';
import { useActiveMenu } from '../../utils';
import { Navbar } from '../Navbar/Navbar';
import { ProgressMenu } from '../ProgressMenu';

export const Layout: React.FC = () => {
    const { activeMenu } = useActiveMenu();

    const topOffSet = useSelector(selectTopOffSet);

    return (
        <div className='layout' style={{ '--top-offset': topOffSet } as React.CSSProperties}>
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
