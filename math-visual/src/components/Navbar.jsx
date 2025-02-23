import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
        <nav style={{
            padding: "8px",
                background: "grey",
                borderRadius: "10px",
        }}> 
        <NavLink to="/" style={{
            padding: "8px",
                background: "grey",
                borderRadius: "10px",
        }}> 
        Home   
        </NavLink>
        <NavLink to="/mandel" style={{
            padding: "8px",
        }}>
        MandelBulb   
        </NavLink>
        <NavLink to="/quaternions" style={{
            padding: "8px",
        }}> 
        Quaternions   
        </NavLink>
        <NavLink to="/solarsystem"style={{
            padding: "8px",
        }}> 
        Solar System
        </NavLink>
        </nav>
        </header>
    )
}

export default Navbar
