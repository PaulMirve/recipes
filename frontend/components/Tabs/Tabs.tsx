import styles from '@sass/components/tabs.module.scss';
import { ComponentPropsWithoutRef, ReactElement } from 'react';
import { TabProps } from './Tab';

interface TabsProps extends ComponentPropsWithoutRef<'div'> {
    children: ReactElement<TabProps>[]
}

export const Tabs = ({ children }: TabsProps) => {
    return (
        <div className={styles.tabs}>
            {children}
        </div>
    )
}
