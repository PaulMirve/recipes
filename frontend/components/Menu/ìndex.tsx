import styles from '@sass/components/menu.module.scss'
import { ComponentPropsWithoutRef, useEffect, useRef } from 'react'

interface Props {
    anchorEl: HTMLElement | null,
    open: boolean,
    onClose: () => void
}

const Menu = ({ anchorEl, open, onClose, children, className = "", ...props }: Props & ComponentPropsWithoutRef<'div'>) => {
    const menu = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (anchorEl && menu.current) {
            const { top, left, height, width } = anchorEl.getBoundingClientRect();
            menu.current.style.top = `calc(${top}px + ${height}px + 5px)`;
            menu.current.style.left = `calc(${left}px - ${width}px)`;
        }
    }, [anchorEl])

    return (
        <div className={`${styles.wrapper} ${open && styles.open}`} onClick={onClose}>
            <div ref={menu} className={styles.menu} onClick={e => e.stopPropagation()} {...props}>
                {children}
            </div>
        </div>
    )
}

export default Menu
