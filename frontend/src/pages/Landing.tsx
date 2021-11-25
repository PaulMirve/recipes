import { Button } from "../components/Button/Button"
import { Countries, FoodCategory } from "../components/FoodCategory/FoodCategory"
import { Footer } from "../components/Footer/Footer"
import { Heading } from "../components/Heading/Heading"
import { Navbar } from "../components/Navbar"
import { Paragraph } from "../components/Paragraph/Paragraph"

const foodCategories = [
    {
        icon: 'mexico',
        name: 'Mexican'
    },
    {
        icon: 'india',
        name: 'Indian'
    },
    {
        icon: "japan",
        name: "Japanese"
    },
    {
        icon: "usa",
        name: "American"
    },
    {
        icon: "italy",
        name: "Italian"
    },
    {
        icon: "china",
        name: "Chinese"
    },
    {
        icon: "greece",
        name: "Greek"
    },
]

export const Landing = () => {
    return (
        <div className='landing'>
            <Navbar />
            <header>
                <div>
                    <Heading uppercase={false} variant="h1">
                        Discover new flavors and recipes from around the world.
                    </Heading>
                    <Paragraph className="mt-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores consequuntur, tempora nihil ratione ducimus aliquam libero vel cumque repellendus accusamus quis architecto alias iure vitae ex deleniti placeat in eos  quo sapiente voluptatibus. Illo quo aliquam tempora.
                    </Paragraph>
                    <Button className="mt-sm" style={{ padding: "0.5em 8em" }}>Discover new recipes</Button>
                </div>
                <img src="./assets/img/food-1.jpg" alt="Tomatoes" />
            </header>
            <section className="landing__discover">
                <Heading centered>Discover al kind of new food</Heading>
                <div className="landing__discover__categories mt-md">
                    {
                        foodCategories.map(({ icon, name }) => {
                            return (
                                <FoodCategory icon={icon as Countries} name={name} />
                            );
                        })
                    }
                </div>
            </section>
            <section className="landing__share">
                <Heading centered>Share your favorite recipes</Heading>
                <div className="landing__share__content mt-md">
                    <img src="./assets/img/food-4.jpg" alt="Sandwich" />
                    <div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fugiat ipsam, nostrum molestias est soluta cupiditate itaque eum laboriosam porro hic sequi ut assumenda vitae. Temporibus ratione nihil delectus aliquid. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ducimus, numquam blanditiis minima laboriosam incidunt iste magnam ex mollitia corrupti praesentium eligendi, omnis sint et velit harum consequuntur soluta illum?
                        </p>
                        <Button className="mt-md" variant="outlined" fullwidth>Start to share</Button>
                    </div>
                </div>
            </section>
            <section className="landing__about">
                <img src="./assets/img/me.jpg" alt="Me" />
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi omnis quidem, a incidunt labore eius, quos officia, natus ad nesciunt tempora vero odio? Labore praesentium nobis architecto necessitatibus placeat soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus natus magni odit quod cumque vitae eum delectus nobis! Ea porro assumenda, voluptatem quas placeat eos maiores numquam dolor atque vero. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quis atque exercitationem veritatis earum excepturi magnam laudantium fugiat. Reiciendis quam odit, perferendis voluptatem non libero debitis iusto architecto mollitia ducimus!
                </Paragraph>
            </section>
            <Footer />
        </div>
    )
}
