import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { tryGetLoggedInUser } from './components/managers/authmanager';
import { Navbar, Spinner } from 'reactstrap';
import ApplicationViews from './ApplicationViews';
import NavBar from './Navbar';

function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    })
  }, []);

  if(loggedInUser === undefined) {
    return <div>Page is loading...</div>
  }

  return (
  <>
  <NavBar loggedInUser={loggedInUser}
      setLoggedInUser={setLoggedInUser}/>
    <ApplicationViews
      loggedInUser={loggedInUser}
      setLoggedInUser={setLoggedInUser}
      />
  </>
  )
}

export default App
