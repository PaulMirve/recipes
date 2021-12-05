import React, { ReactElement, useState } from 'react'
import { createContext } from 'react';
import styles from '@sass/components/tabs-wrapper.module.scss';

interface ContextProps {
    selectedTab: number,
    setSelectedTab: (value: number) => void
}

export const TabsContext = createContext({} as ContextProps);

interface Props {
    children: ReactElement[] | ReactElement,
    initialValue: number
}

export const TabsWrapper = ({ children, initialValue }: Props) => {
    const [selectedTab, setSelectedTab] = useState<number>(initialValue)

    const setValue = (value: number) => {
        setSelectedTab(value);
    }

    return (
        <TabsContext.Provider value={{
            selectedTab,
            setSelectedTab: setValue
        }}>
            {children}
        </TabsContext.Provider>
    );
}

