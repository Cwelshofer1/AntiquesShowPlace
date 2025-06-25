import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../managers/authmanager";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { GetUserProfiles } from "../managers/userprofilemanager";
import "./auth.css"

export function Login({loggedInUser, setLoggedInUser} ) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  const [allUsers, setAllUsers] = useState([])


  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then((user) => {
      if (!user) {
        setFailedLogin(true);
      } else {
        setLoggedInUser(user);
        navigate("/");
      }
    });
  };

  return (
    <>
    <h3>Antiques Showcase</h3>
    <div className="login-box">
      <h3>Login</h3>
      <div className="login-content">
      <FormGroup>
        <Label>Email: </Label>
        <Input
          invalid={failedLogin}
          type="text"
          value={email}
          onChange={(e) => {
            setFailedLogin(false);
            setEmail(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Password: </Label>
        <Input
          invalid={failedLogin}
          type="password"
          value={password}
          onChange={(e) => {
            setFailedLogin(false);
            setPassword(e.target.value);
          }}
        />
      </FormGroup>
      </div>
      </div>
          <div className="login-button">
      <Button color="primary" onClick={handleSubmit}>
        Login
      </Button>
      </div>
      <p>
        Not signed up? Register <Link to="/register">here</Link>
      </p>
    
    </>
  );
}