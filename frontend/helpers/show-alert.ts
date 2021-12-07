import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from '@sass/components/alert.module.scss'

export const showAlert = <T>(options: SweetAlertOptions, result?: (result: SweetAlertResult<T>) => void) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        ...options,
        customClass: {
            popup: styles.alert
        }
    }).then(result);
}

export const loadingAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: "Loading...",
        customClass: {
            popup: styles.alert
        },
        allowOutsideClick: false
    });
    return MySwal;
}

export const showErrorAlert = () => {
    showAlert({
        title: 'Something has happened!',
        text: 'An error has happened, please contact with the system administrator.',
        icon: 'error'
    });
}