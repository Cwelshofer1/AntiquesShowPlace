import { useEffect, useState, useCallback } from 'react'
import './App.css'
import { tryGetLoggedInUser } from './components/managers/authmanager';
import ApplicationViews from './ApplicationViews';
import NavBar from './Navbar';
import { useLocation } from 'react-router-dom'; 

function App() {

  const [loggedInUser, setLoggedInUser] = useState();
  const [loading, setLoading] = useState(true); 
  const location = useLocation();

  const memoizedSetLoggedInUser = useCallback((user) => {
    setLoggedInUser(user);
  }, []);

  

  useEffect(() => {
    tryGetLoggedInUser().then((user) => { 
      memoizedSetLoggedInUser(user);
      setLoading(false); 
    });
  }, [])

  return (
    
  <>
  <div className='background-img'>
  {location.pathname !== '/login' && (
    <NavBar loggedInUser={loggedInUser}
        setLoggedInUser={memoizedSetLoggedInUser}/>
  )}
      
    {loading ? ( 
      <div>Loading...</div>
    ) : (
      <ApplicationViews
        loggedInUser={loggedInUser}
        setLoggedInUser={memoizedSetLoggedInUser}
        />
    )}
    </div>
  </>
  )
  
}

export default App
