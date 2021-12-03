import styles from '@sass/components/mobile-menu.module.scss';
import { useGlobalContext } from 'hooks/useGlobalContext';
import LoggedMenu from './LoggedMenu';
import NotLoggedMenu from './NotLoggedMenu';

interface Props {
    onClose: () => void
}

const MobileMenu = ({ onClose }: Props) => {
    const { user } = useGlobalContext();

    return (
        <div className={styles.wrapper} onClick={onClose}>
            <nav className={styles.main} onClick={e => e.stopPropagation()}>
                {
                    user ? <LoggedMenu user={user} /> : <NotLoggedMenu />
                }
            </nav>
        </div>
    )
}

export default MobileMenu
