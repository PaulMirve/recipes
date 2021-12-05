import React, { ReactElement, useContext } from 'react'
import styles from '@sass/components/tab-page.module.scss';
import { TabsContext } from './TabsWrapper';

interface Props {
    value: number,
    children?: ReactElement | ReactElement[]
}

export const TabPage = ({ value, children }: Props) => {
    const { selectedTab } = useContext(TabsContext);
    return (
        <div className={`${styles.tabPage} ${selectedTab === value && styles.selected}`}>
            {children}
        </div>
    )
}
