import styles from '@sass/components/footer.module.scss'
import Icon from 'components/Icon'
import Image from 'next/image'
import Link from 'next/link'

interface Props {

}

const Footer = (props: Props) => {
    return (
        <footer className={styles.footer}>
            <span className={styles.frame}>
                <Image src='/logo.png' height={80} width={150} />
            </span>
            <div className={styles.content}>
                <div className={styles.disclaimers}>
                    <p>The code of this page can be found <a target="_blank" rel="noopener noreferrer" href="https://github.com/PaulMirve/recipes">here</a></p>
                    <p><a target="_blank" rel="noopener noreferrer" href="https://paulmiranda.net">paulmiranda.net</a></p>
                </div>
                <div className={styles.links}>
                    <Link href='/recipes'>Recipes</Link>
                    <Link href='/'>About</Link>
                    <Link href='/'>Discover</Link>
                </div>
                <div className={styles.social}>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/PaulMirve">
                        <Icon.Github />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/paulmirve/">
                        <Icon.Linkedin />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
