import React, { createContext, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useContext, useState } from 'react';

import { EMenuItems, IMenuItems } from '../interfaces';

const ActiveMenuContext = createContext<{ activeMenu: IMenuItems; setActiveMenu: Dispatch<SetStateAction<IMenuItems>> }>({
    activeMenu: EMenuItems.HOME,
    setActiveMenu: function (): void {
        throw new Error('Function not implemented.');
    },
});

export const ActiveMenuProvider: React.FC<PropsWithChildren<Record<string, ReactNode>>> = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState<IMenuItems>(EMenuItems.HOME);

    return <ActiveMenuContext.Provider value={{ activeMenu, setActiveMenu }}>{children}</ActiveMenuContext.Provider>;
};

export const useActiveMenu = () => useContext(ActiveMenuContext);
