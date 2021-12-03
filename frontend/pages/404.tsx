import styles from '@sass/pages/404.module.scss'
import Button from 'components/Button'
import Heading from 'components/Heading'
import Icon from 'components/Icon'
import Paragraph from 'components/Paragraph'
import { useRouter } from 'next/dist/client/router'

const Error404 = () => {
    const router = useRouter();
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <Icon.AlertCircleOutline className={styles.icon} />
                <Heading>This page isn't available.</Heading>
                <Paragraph>Please return to the main page.</Paragraph>
                <Button onClick={() => router.push('/recipes')} fullWidth>Return</Button>
            </div>
        </div>
    )
}

export default Error404

