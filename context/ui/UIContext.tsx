import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean;
    isAdding: boolean;
    //methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAdding: (value:boolean) => void;
}

export const UIContext = createContext({} as ContextProps);