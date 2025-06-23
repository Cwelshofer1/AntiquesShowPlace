import { useState, useEffect } from "react";
import { GetUserById, GetUserProfiles } from "../managers/userprofilemanager";
import { DeleteItem } from "../managers/itemManager";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { DeleteUser } from "../managers/userprofilemanager";
import { logout } from "../managers/authmanager";



export const MyProfile = (loggedInUser) => {

    const [userProfile, setUserProfile] = useState([])
    const [loggedInUsers, setLoggedInUser] = useState([])
    const [open, setOpen] = useState(false);
    const [getAllUsers, setAllUsers] = useState([])



    const navigate = useNavigate()

    const { id } = useParams()


    useEffect(() => {
        GetUserById(id).then(setUserProfile)
    }, [])

       useEffect(() => {
        GetUserProfiles(id).then(setAllUsers)
    }, [])

    const handleUserDelete = (user) => {
        DeleteUser(user).then(logout()).then(() => {
                setOpen(false);
                  navigate('/login')
                  setLoggedInUser(null);
                  setOpen(false);
                
        })
    }



    return (
        <> {loggedInUser.loggedInUser.id === userProfile.id ? (
            <>
                <h3>My Profile</h3>
                <div key={userProfile.id}>
                    <div>Name: {userProfile.name}</div>
                    <div>Description: {userProfile.userDescription}</div>
                    <div>Email: {userProfile.email}</div>
                    <img
                        src={userProfile.itemPhotoUrl}
                        alt="Header"
                        style={{ width: "150px", height: "100px", objectFit: "cover", marginRight: "15px" }}
                    />
                    <button onClick={() => handleUserDelete(userProfile.id)}>Delete Profile</button>
                    <Link to={`editProfile/${userProfile.id}`}>
                        <button >Edit Profile </button>
                    </Link>
                </div>
            </>
        ) : (
            <h3> Wrong User Profile Url</h3>
        )}
        </>
    )
}