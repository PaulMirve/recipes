import styles from '@sass/pages/login.module.scss'
import Button from 'components/Button'
import Form from 'components/Form'
import Heading from 'components/Heading'
import TextInput from 'components/TextInput'
import Image from 'next/image'

const Login = () => {
    const handleSubmit = () => {

    }
    return (
        <div className={styles.main}>
            <Form className={styles.form}>
                <Image src='/logo.png' width={200} height={90} />
                <Heading>Login</Heading>
                <TextInput fullWidth label='Username' />
                <TextInput fullWidth type="password" label='Password' />
                <Button fullWidth className='mt-sm' >Login</Button>
            </Form>
        </div>
    )
}

export default Login
