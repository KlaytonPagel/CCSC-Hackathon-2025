import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <NavLink to="/">
                <p>KP</p>
            </NavLink>
            <nav>
                <NavLink to="/mandel"> 
                    MandelBulb
                </NavLink>
                <NavLink to="/projects"> 
                    Projects
                </NavLink>
                <NavLink to="/contact"> 
                    Contact
                </NavLink>
            </nav>
        </header>
    )
}

export default Navbar
