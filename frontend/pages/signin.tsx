import styles from '@sass/pages/signin.module.scss'
import Button from 'components/Button'
import { FormikTextInput } from 'components/TextInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import Heading from 'components/Heading'
import Head from 'next/head'
import { useSaveUserMutation } from 'generated/graphql'
import { useRouter } from 'next/dist/client/router'

const SignIn = () => {
    const [signIn] = useSaveUserMutation();
    const router = useRouter();

    return (
        <div className={styles.main}>
            <Head>
                <title>ReciePies | Sign In</title>
            </Head>
            <div className={styles.wrapper}>
                <span className={styles.frame}>
                    <Image src='/logo.png' width={180} height={80} />
                </span>
                <Heading centered>Sing In</Heading>
                <Formik
                    initialValues={{
                        name: '',
                        lastName: '',
                        email: '',
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('The first name is required'),
                        lastName: Yup.string().required('The last name is required'),
                        email: Yup.string().email('The email is invalid').required('The email is required'),
                        username: Yup.string().required('The username is required'),
                        password: Yup.string().required('The password is required'),
                    })}
                    onSubmit={async (user, { setErrors }) => {
                        try {
                            await signIn({
                                variables: {
                                    user
                                }
                            });
                            router.push('/login');
                        } catch (err: any) {
                            const errors: { [key: string]: string } = {};
                            err.graphQLErrors[0].extensions.exception.validationErrors.forEach((validationErr: any) => {
                                Object.values(validationErr.constraints).forEach((message: any) => {
                                    errors[validationErr.property] = message;
                                });
                            });
                            setErrors(errors);
                        }
                    }}>
                    {
                        formk => (
                            <Form className={styles.form}>
                                <FormikTextInput className="mt-sm" label="First Name" name="name" />
                                <FormikTextInput label="Last Name" name="lastName" />
                                <FormikTextInput label="Email" name="email" />
                                <FormikTextInput label="Username" name="username" />
                                <FormikTextInput type="password" label="Password" name="password" />
                                <Button type="submit" className="mt-sm" fullWidth>Sign In</Button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div >
    )
}

export default SignIn
