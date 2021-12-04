import styles from '@sass/pages/signin.module.scss'
import Button from 'components/Button'
import { FormikTextInput } from 'components/TextInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import Heading from 'components/Heading'
import Head from 'next/head'

const SignIn = () => {
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
                        firstName: '',
                        lastName: '',
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string().required('The first name is required'),
                        lastName: Yup.string().required('The last name is required'),
                        username: Yup.string().required('The username is required'),
                        password: Yup.string().required('The password is required'),
                    })}
                    onSubmit={() => {

                    }}>
                    {
                        formk => (
                            <Form className={styles.form}>
                                <FormikTextInput className="mt-sm" label="First Name" name="firstName" />
                                <FormikTextInput label="Last Name" name="lastName" />
                                <FormikTextInput label="Username" name="username" />
                                <FormikTextInput label="Password" name="password" />
                                <Button className="mt-sm" fullWidth>Sign In</Button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default SignIn
