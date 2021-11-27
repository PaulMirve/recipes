import Loader from 'react-loader-spinner'
import styles from '@sass/components/loading.module.scss'
import Heading from 'components/Heading'

const Loading = () => {
    return (
        <div className={styles.loading}>
            <span>
                <Loader width={200} height={200} type="Bars" color="#72EFDD" />
                <Heading centered>Loading...</Heading>
            </span>

        </div>
    )
}

export default Loading
