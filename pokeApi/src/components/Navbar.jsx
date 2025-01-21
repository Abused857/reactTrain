import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <main>
      <header>
        <NavLink to="/">
          <p>PokeApp</p>
        </NavLink>
        <NavLink to="/contact">
          <p>Contact</p>
        </NavLink>
      </header>
    </main>
  );
};
export default Navbar;
