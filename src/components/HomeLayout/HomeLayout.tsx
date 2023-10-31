import './styles.scss';

import React, { ReactNode, useEffect } from 'react';

import { IMenuItems } from '../../interfaces';
import { useActiveMenu } from '../../utils';

export const HomeLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { setActiveMenu } = useActiveMenu();

    useEffect(() => {
        const root = document.getElementsByClassName('home-layout');
        const sections = document.querySelectorAll('.home-layout > :is(div)');

        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((eachEntry) => {
                    eachEntry.target.classList.toggle('active', eachEntry.isIntersecting);
                    eachEntry.isIntersecting && setActiveMenu(eachEntry.target.getAttribute('data-menu') as IMenuItems);
                }),
            { root: root[0], threshold: 0.6 }
        );

        sections.forEach((eachSection) => observer.observe(eachSection));
        return () => observer.disconnect();
    }, []);

    return <div className='home-layout'>{children}</div>;
};
