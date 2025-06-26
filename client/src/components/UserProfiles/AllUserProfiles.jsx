import { useState, useEffect } from "react";
import { GetUserProfiles } from "../managers/userprofilemanager";
import { Link } from "react-router-dom";
import './userprofiles.css'

export const AllUsers = ({ loggedInUser }) => {


    const [allUsers, setAllUsers] = useState([])



    useEffect(() => {
        GetUserProfiles().then(setAllUsers)
    }, [])




    return (
        <>
            <h3>All Users</h3>
            {allUsers.map((user) => (
                <div key={user.id}>
                    <div className="user-profile-box">
                        {user.userPhotoUrl ? (
                            <img
                                src={user.userPhotoUrl}
                                alt={user.name}
                                style={{ width: "150px", height: "150px", objectFit: "cover", marginRight: "15px" }}
                            />
                        ) : null}
                        <div className="user-profile-names">
                        <Link onClick={() => window.scrollTo(0, 0)} to={`/userdetails/${user.id}`}>
                            <h3 className="user-name"><b>{user.name}</b></h3>
                        </Link>
                        </div>

                    </div>
                </div>
            ))}
        </>
    )
}