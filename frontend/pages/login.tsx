import styles from '@sass/pages/login.module.scss'
import Button from 'components/Button'
import Form from 'components/Form'
import Heading from 'components/Heading'
import { TextInput } from 'components/TextInput'
import { GlobalContext } from 'context/GlobalContext'
import { useLoginMutation, User } from 'generated/graphql'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { FormEvent, useContext, useState } from 'react'

const Login = () => {
    const { setUser } = useContext(GlobalContext);
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, { error }] = useLoginMutation({
        variables: {
            username,
            password
        }
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await login();
            localStorage.setItem('token', data?.login.jwt || "");
            setUser(data?.login.user as User)
            router.push('/recipes');
        } catch (err) { }
    }
    return (
        <div className={styles.main}>
            <Form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <Image src='/logo.png' width={200} height={90} />
                <Heading>Login</Heading>
                {error && <p className={styles.error}>Invalid username or password</p>}
                <TextInput value={username} onChange={e => setUsername(e.target.value)} fullWidth label='Username' />
                <TextInput value={password} onChange={e => setPassword(e.target.value)} fullWidth type="password" label='Password' />
                <Button fullWidth className='mt-sm' >Login</Button>
            </Form>
        </div>
    )
}

export default Login
