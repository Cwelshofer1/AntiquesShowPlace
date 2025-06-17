import { useState } from "react";
import { NavLink, NavLink as RRNavLink } from "react-router-dom";
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

            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                  setLoggedInUser(null);
                  setOpen(false);
                });
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}
