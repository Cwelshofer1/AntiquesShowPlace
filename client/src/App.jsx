import { useEffect, useState, useCallback } from 'react'
import './App.css'
import { tryGetLoggedInUser } from './components/managers/authmanager';
import ApplicationViews from './ApplicationViews';
import NavBar from './Navbar';
import { useLocation } from 'react-router-dom'; 

function App() {

  const [loggedInUser, setLoggedInUser] = useState();
  const [loading, setLoading] = useState(true); // 1. Add loading state
  const location = useLocation();

  const memoizedSetLoggedInUser = useCallback((user) => {
    setLoggedInUser(user);
  }, []);

  

  useEffect(() => {
    tryGetLoggedInUser().then((user) => { // Remove the conditional check here
      memoizedSetLoggedInUser(user);
      setLoading(false); // 3. Set loading to false after auth check
    });
  }, [])

  return (
    
  <>
  {location.pathname !== '/login' && (
    <NavBar loggedInUser={loggedInUser}
        setLoggedInUser={memoizedSetLoggedInUser}/>
  )}
      
    {loading ? ( // 4. Conditionally render ApplicationViews
      <div>Loading...</div>
    ) : (
      <ApplicationViews
        loggedInUser={loggedInUser}
        setLoggedInUser={memoizedSetLoggedInUser}
        />
    )}
  </>
  )
  
}

export default App
