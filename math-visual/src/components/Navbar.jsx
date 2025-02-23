import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <nav>
                <NavLink to="/"> 
                    Home
                </NavLink>
                <NavLink to="/mandel"> 
                    MandelBulb
                </NavLink>
                <NavLink to="/quaternions"> 
                    Quaternions
                </NavLink>
                <NavLink to="/solarsystem"> 
                    Solar System
                </NavLink>
            </nav>
        </header>
    )
}

export default Navbar
