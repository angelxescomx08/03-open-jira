import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean;
    isAdding: boolean;
    isDragging: boolean;
    //methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAdding: (value:boolean) => void;
    startDragging: () => void;
    endDragging: () => void
}

export const UIContext = createContext({} as ContextProps);