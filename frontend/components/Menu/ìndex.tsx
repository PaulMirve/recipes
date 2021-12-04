import styles from '@sass/components/menu.module.scss'
import { ComponentPropsWithoutRef, useEffect, useRef } from 'react'

interface Props {
    anchorEl: HTMLElement | null,
    open: boolean,
    onClose: () => void
}

const Menu = ({ anchorEl, open, onClose, children, className = "", ...props }: Props & ComponentPropsWithoutRef<'div'>) => {
    const menu = useRef<HTMLDivElement | null>(null)

    const positionMenu = () => {
        if (anchorEl && menu.current) {
            const { top, left, height, width } = anchorEl.getBoundingClientRect();
            menu.current.style.top = `calc(${top}px + ${height}px + 5px)`;
            menu.current.style.left = `calc(${left}px - ${width}px)`;
        }
    }

    useEffect(() => {
        window.addEventListener("resize", positionMenu, false);
        positionMenu();
    }, [anchorEl])

    const onMenuClose = () => {
        menu.current && menu.current.classList.add(styles.onClose);
        setTimeout(() => {
            onClose();
            menu.current && menu.current.classList.remove(styles.onClose);
        }, 200);
    }

    return (
        <div className={`${styles.wrapper} ${open && styles.open}`} onClick={onMenuClose}>
            <div ref={menu} className={`${styles.menu} ${open && styles.menuOpen}`} onClick={e => e.stopPropagation()} {...props}>
                {children}
            </div>
        </div>
    )
}

export default Menu
