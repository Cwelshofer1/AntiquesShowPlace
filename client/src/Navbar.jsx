import { useState } from "react";
import { NavLink, NavLink as RRNavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { logout } from "./components/managers/authmanager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  const toggleNavbar = () => setOpen(!open);

  const navigate = useNavigate()

  return (
    <div>
      <Navbar light fixed="true" expand="lg">
        <NavbarBrand className="navbar-brand" tag={RRNavLink} to="/">
          Antiques ShowPlace
        </NavbarBrand>
        {loggedInUser ? (
          <>
          
              <NavLink tag={RRNavLink} to="/allitems">
                <Button color="primary">All Items</Button>
              </NavLink>
              
                <NavLink tag={RRNavLink} to="/additem">
                <Button color="primary">Add Item</Button>
              </NavLink>

              <NavLink tag={RRNavLink} to="/myitems">
                <Button color="primary">My Items</Button>
              </NavLink>

            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                  navigate('/login')
                  setLoggedInUser(null);
                  setOpen(false);
                });
              }}
            >
              Logout
            </Button>
          </>
        ) : (
         <div></div>
        )}
     
      </Navbar>
    </div>
  );
}
