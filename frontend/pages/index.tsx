import styles from '@sass/pages/index.module.scss'
import Button from 'components/Button'
import Heading from 'components/Heading'
import Paragraph from 'components/Paragraph'
import Footer from 'layout/Footer'
import Image from 'next/image'
import Head from 'next/head'

const Home = () => {
  return (
    <div className={styles.main}>
      <Head>
        <title>ReciPies</title>
      </Head>
      <header className={styles.hero}>
        <Heading className={styles.hero__title} variant='h1' fontWeight='bold'>Discover new flavors and recipes from around the world</Heading>
        <Paragraph className={`${styles.hero__paragraph} mt-sm`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quisquam eum natus earum libero quaerat asperiores nesciunt dolore et! At illum recusandae cumque eius aut culpa quasi architecto nostrum impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam rerum, eum est ut facilis quisquam deleniti maxime architecto sit fugiat. Repellendus, eius? Blanditiis aliquam nulla doloremque placeat suscipit earum quos.
        </Paragraph>
        <Button className={`${styles.hero__button} mt-sm`} >Discover new recipes</Button>
        <span className={styles.hero__frame}>
          <Image src="/images/food-1.jpg" height={800} width={800} alt='Food 1' />
        </span>
      </header>
      <section className={styles.section1}>
        <Heading centered casing='uppercase' fontWeight='bold' variant='h4'>Discover all kind of new food</Heading>
      </section>
      <section className={styles.section2}>
        <Heading className={styles.section2__title} centered casing='uppercase' fontWeight='bold' variant='h4'>Share your favorite recipes</Heading>
        <span className={styles.section2__frame}>
          <Image src="/images/food-4.jpg" height={500} width={700} alt='Food 4' />
        </span>
        <Paragraph className={styles.section2__paragraph}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque modi beatae, fuga neque provident velit culpa minima voluptatem labore eius, error consequatur totam, ducimus minus molestias officiis iusto sed! Voluptas!
          Iusto in ea animi dolores libero recusandae minus id sint, quod atque laborum. Fugit temporibus iusto illo quos perspiciatis qui quasi, voluptates rerum aliquid obcaecati, odio ducimus dicta nulla cumque.
          Dolorem enim porro est impedit aliquam nulla illo similique, cumque laboriosam ducimus blanditiis mollitia perspiciatis illum doloribus deserunt exercitationem, a ipsam dolore eum esse iste odit maiores voluptas? Tempora, ea.
        </Paragraph>
        <Button className={styles.section2__button} variant="dark" fullWidth>start sharing</Button>
      </section>
      <section className={styles.section3}>
        <span className={styles.section3__frame}>
          <Image src="/images/me.jpg" width={400} height={400} alt='Me' />
        </span>
        <Paragraph>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe iste quaerat sunt accusamus doloremque unde corrupti quibusdam aliquid dolores? Ea aspernatur mollitia fuga animi ducimus dolorem sunt, error quisquam modi!
          Hic nemo quam officiis itaque suscipit reprehenderit quidem, dolore officia perspiciatis. Nulla vel dolores quidem consequatur nisi ipsum beatae sit quos numquam voluptates cum veniam, explicabo ad ducimus ipsa necessitatibus?
        </Paragraph>
      </section>
      <section className={styles.section4}>
        <video autoPlay preload='none' muted loop id="myVideo" className={styles.video}>
          <source src="https://player.vimeo.com/external/412256959.hd.mp4?s=f152ad45bd1db888c85602aac8d51885083824bd&profile_id=171&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className={styles.section4__content}>
          <span>
            <Heading
              className={styles.section4__title}
              variant='h1'
              fontWeight='bold'
              casing="uppercase">
              Join now
            </Heading>
            <p className={styles.section4__text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam architecto culpa quibusdam corrupti laborum fuga dolorum velit est, adipisci magnam at fugit reiciendis vero ullam odio. Iusto provident excepturi nesciunt?
            </p>
            <Button className="mt-sm" fullWidth>Start sharing</Button>
          </span>
        </div>
      </section>
      <Footer style={{ marginTop: 0 }} />
    </div>
  )
}

export default Home
