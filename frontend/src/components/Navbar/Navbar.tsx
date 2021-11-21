import { NavLink } from "react-router-dom"
import { Button } from "../Button/Button"

export const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/"> <img src="./logo.png" alt="logo" /></NavLink>
            <div className="navbar__links">
                <NavLink to="/recipes">Recipes</NavLink>
                <NavLink to="/">About</NavLink>
                <NavLink to="/discover">Discover</NavLink>
            </div>
            <div className="navbar__actions">
                <NavLink to="/login">Login</NavLink>
                <Button>Sign In</Button>
            </div>
        </nav>
    )
}
