import Loader from 'react-loader-spinner'
import styles from '@sass/components/loading.module.scss'
import Heading from 'components/Heading'
import Head from 'next/head'

const Loading = () => {
    return (
        <div className={styles.loading}>
            <Head>
                <title>ReciPies</title>
            </Head>
            <span>
                <Loader width={200} height={200} type="Bars" color="#72EFDD" />
                <Heading centered>Loading...</Heading>
            </span>

        </div>
    )
}

export default Loading
