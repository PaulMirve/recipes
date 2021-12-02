import styles from '@sass/pages/index.module.scss'
import Button from 'components/Button'
import Heading from 'components/Heading'
import Paragraph from 'components/Paragraph'
import Image from 'next/image'

const Home = () => {
  return (
    <div className={styles.main}>
      <header className={styles.hero}>
        <Heading className={styles.hero__title} variant='h1' fontWeight='bold'>Discover new flavors and recipes from around the world</Heading>
        <Paragraph className={`${styles.hero__paragraph} mt-sm`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quisquam eum natus earum libero quaerat asperiores nesciunt dolore et! At illum recusandae cumque eius aut culpa quasi architecto nostrum impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam rerum, eum est ut facilis quisquam deleniti maxime architecto sit fugiat. Repellendus, eius? Blanditiis aliquam nulla doloremque placeat suscipit earum quos.
        </Paragraph>
        <Button className={`${styles.hero__button} mt-sm`} >Discover new recipes</Button>
        <span className={styles.hero__frame}>
          <Image src="/images/food-1.jpg" height={800} width={800} />
        </span>
      </header>
      <section className={styles.section1}>
        <Heading centered casing='uppercase' fontWeight='bold' variant='h4'>Discover all kind of new food</Heading>
      </section>
      <section className={styles.section2}>
        <Heading className={styles.section2__title} centered casing='uppercase' fontWeight='bold' variant='h4'>Share your favorite recipes</Heading>
        <span className={styles.section2__frame}>
          <Image src="/images/food-4.jpg" height={500} width={700} />
        </span>
        <Paragraph className={styles.section2__paragraph}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque modi beatae, fuga neque provident velit culpa minima voluptatem labore eius, error consequatur totam, ducimus minus molestias officiis iusto sed! Voluptas!
          Iusto in ea animi dolores libero recusandae minus id sint, quod atque laborum. Fugit temporibus iusto illo quos perspiciatis qui quasi, voluptates rerum aliquid obcaecati, odio ducimus dicta nulla cumque.
          Dolorem enim porro est impedit aliquam nulla illo similique, cumque laboriosam ducimus blanditiis mollitia perspiciatis illum doloribus deserunt exercitationem, a ipsam dolore eum esse iste odit maiores voluptas? Tempora, ea.
        </Paragraph>
        <Button className={styles.section2__button} variant="dark" fullWidth>start sharing</Button>
      </section>
    </div>
  )
}

export default Home
