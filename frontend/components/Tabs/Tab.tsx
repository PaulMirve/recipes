import styles from '@sass/components/tab.module.scss';
import Icon, { Icons } from 'components/Icon';
import { ComponentPropsWithoutRef, useContext } from 'react';
import { TabsContext } from './TabsWrapper';

export interface TabProps extends ComponentPropsWithoutRef<'div'> {
    label?: string,
    icon?: Icons,
    value: number,
    results?: number
}

export const Tab = ({ children, className = "", label, icon, value, results }: TabProps) => {
    const { setSelectedTab, selectedTab } = useContext(TabsContext);
    const getIcon = () => {
        let Component;
        Component = Icon[icon!];
        return <Component className={styles.icon} />;
    }
    
    return (
        <div onClick={() => setSelectedTab(value)} className={`${styles.tab} ${selectedTab === value && styles.selected} ${className}`}>
            {icon && getIcon()}
            {label ? <span>{label}</span> : children}
            {results != null && results != undefined && <span className={styles.results}>{results}</span>}
        </div>
    )
}
