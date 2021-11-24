import { Button } from "../components/Button/Button"
import { FoodCategory } from "../components/FoodCategory/FoodCategory"
import { Heading } from "../components/Heading/Heading"
import { Navbar } from "../components/Navbar"
import { Paragraph } from "../components/Paragraph/Paragraph"

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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores consequuntur, tempora nihil ratione ducimus aliquam libero vel cumque repellendus accusamus quis architecto alias iure vitae ex deleniti placeat in eos.
                    </Paragraph>
                    <Button className="mt-sm" style={{ padding: "0.5em 8em" }}>Discover new recipes</Button>
                </div>
                <img src="./assets/img/food-1.jpg" alt="Tomatoes" />
            </header>
            <section className="landing__discover">
                <Heading centered>Share your favorite recipes</Heading>
                <FoodCategory icon="usa" />
            </section>
        </div>
    )
}
