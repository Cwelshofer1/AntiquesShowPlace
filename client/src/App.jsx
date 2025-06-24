import { useEffect, useState, useCallback } from 'react'
import './App.css'
import { tryGetLoggedInUser } from './components/managers/authmanager';
import ApplicationViews from './ApplicationViews';
import NavBar from './Navbar';
import { useLocation } from 'react-router-dom'; 

function App() {

  const [loggedInUser, setLoggedInUser] = useState();
  const location = useLocation(); 

  const memoizedSetLoggedInUser = useCallback((user) => {
    setLoggedInUser(user);
  }, []);

  useEffect(() => {
    if(loggedInUser !== undefined){
    tryGetLoggedInUser().then((user) => {
      memoizedSetLoggedInUser(user);
    });
  }
  }, [])

  return (
    
  <>
  {location.pathname !== '/login' && (
    <NavBar loggedInUser={loggedInUser}
        setLoggedInUser={memoizedSetLoggedInUser}/>
  )}
      
    <ApplicationViews
      loggedInUser={loggedInUser}
      setLoggedInUser={memoizedSetLoggedInUser}
      />
  </>
  )
  
}

export default App
