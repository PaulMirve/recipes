import styles from '@sass/components/mobile-menu.module.scss';
import { useGlobalContext } from 'hooks/useGlobalContext';
import { useRef } from 'react';
import LoggedMenu from './LoggedMenu';
import NotLoggedMenu from './NotLoggedMenu';

interface Props {
    onClose: () => void,
    open: boolean
}

const MobileMenu = ({ onClose, open }: Props) => {
    const { user } = useGlobalContext();
    const wrapper = useRef<HTMLDivElement>(null);

    const closeMenu = () => {
        wrapper.current?.classList.add(styles.onClose);
        setTimeout(() => {
            onClose();
            wrapper.current?.classList.remove(styles.onClose);
        }, 500)
    }

    return (
        <div className={`${styles.wrapper} ${open ? styles.open : styles.close}`} onClick={closeMenu}>
            <nav ref={wrapper} className={styles.main} onClick={e => e.stopPropagation()}>
                {
                    user ? <LoggedMenu user={user} /> : <NotLoggedMenu />
                }
            </nav>
        </div>
    )
}

export default MobileMenu
