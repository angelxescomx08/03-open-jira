import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props {
    children: JSX.Element
}

export interface UIState {
    sideMenuOpen: boolean;
    isAdding: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAdding: false
}

export const UIProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideMenu = () =>{
        dispatch({type:'UI - Open Sidebar'})
    }

    const closeSideMenu = () =>{
        dispatch({type:'UI - Close Sidebar'})
    }

    const setIsAdding = (value: boolean) =>{
        dispatch({type:'UI - Is Adding' ,payload: value})
    }

    return (
        <UIContext.Provider value={{
            ...state,
            openSideMenu,
            closeSideMenu,
            setIsAdding
        }}>
           {children}
        </UIContext.Provider>
    )
}