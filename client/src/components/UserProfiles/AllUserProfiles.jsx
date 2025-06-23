import { useState, useEffect } from "react";
import { GetUserProfiles } from "../managers/userprofilemanager";
import { Link } from "react-router-dom";
export const AllUsers = ({ loggedInUser }) => {

   
    const [allUsers, setAllUsers] = useState([])


  
    useEffect(() => {
        GetUserProfiles().then(setAllUsers)
    }, [])

  


    return (
        <>
            {allUsers.map((user) => (
                <div key={user.id}>
                    <Link  onClick={() => window.scrollTo(0, 0)} to={`/userdetails/${user.id}`}>
                        <div className="user-name">{user.name}</div>
                         </Link>
                    <div>Name: {user.name}</div>
                    {user.userPhotoUrl ? (
                    <img
                        src={user.userPhotoUrl}
                        alt={user.name}
                        style={{ width: "150px", height: "100px", objectFit: "cover", marginRight: "15px" }}
                    />
                    ) : null}
                </div>
            ))}
        </>
    )
}