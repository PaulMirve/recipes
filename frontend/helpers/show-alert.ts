import Swal, { SweetAlertOptions } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from '@sass/components/alert.module.scss'

export const showAlert = (options: SweetAlertOptions) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        ...options,
        customClass: {
            popup: styles.alert
        }
    });
}