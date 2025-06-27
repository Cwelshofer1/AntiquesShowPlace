import { useState } from "react";
import { NavLink as RRNavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "./components/managers/authmanager";
import "./navbar.css";

export default function NavBar({ loggedInUser, setLoggedInUser }) {

  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleNavbar = () => setOpen(!open);

  const handleLogout = (e) => {
    e.preventDefault();
    setOpen(false);
    logout().then(() => {
      navigate('/login');
      setLoggedInUser(null);
    });
  };

  const handleNavClick = () => {
    setOpen(false); 
  };

  return (
    <div className="navbar-container">
      <Navbar light expand="lg" className="navbar">
        <NavbarBrand tag={RRNavLink} to="/" onClick={handleNavClick} className="navbar-image">
      
        </NavbarBrand>
        
        {loggedInUser && loggedInUser !== undefined ? (
          <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
              <Nav className="ms-auto" navbar>
                <NavItem>
                  <Button 
                    tag={RRNavLink} 
                    to="/allitems" 
                    onClick={handleNavClick}
                    className="btn"
                  >
                    All Items
                  </Button>
                </NavItem>
                
                <NavItem>
                  <Button 
                    tag={RRNavLink} 
                    to="/additem" 
                    onClick={handleNavClick}
                    className="btn"
                  >
                    Add Item
                  </Button>
                </NavItem>

                <NavItem>
                  <Button 
                    tag={RRNavLink} 
                    to="/myitems" 
                    onClick={handleNavClick}
                    className="btn"
                  >
                    My Items
                  </Button>
                </NavItem>

                <NavItem>
                  <Button 
                    tag={RRNavLink} 
                    to="/addcategory" 
                    onClick={handleNavClick}
                    className="btn"
                  >
                    Add Category
                  </Button>
                </NavItem>

                <NavItem>
                  <Button 
                    tag={RRNavLink} 
                    to="/allusers" 
                    onClick={handleNavClick}
                    className="btn"
                  >
                    All Users
                  </Button>
                </NavItem>

                <NavItem>
                  <Button 
                    tag={RRNavLink} 
                    to={`/myprofile/${loggedInUser.id}`} 
                    onClick={handleNavClick}
                    className="btn"
                  >
                    My Profile
                  </Button>
                </NavItem>

                <NavItem>
                  <Button className="btn logout-btn" onClick={handleLogout}>
                    Logout
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </>
        ) : (
          <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
              
            </Collapse>
          </>
        )}
      </Navbar>
    </div>
  );
}