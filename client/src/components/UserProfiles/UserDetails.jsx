import { useState, useEffect } from "react";
import { GetUserById, GetUserProfiles } from "../managers/userprofilemanager";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
export const UserDetails = () => {

    const { id } = useParams()
    const [users, setUser] = useState([])





    useEffect(() => {
        GetUserById(id).then((data) => {
            const userObj = data
            setUser(userObj)
        })
    }, [id])




    return (
        <>
            <h3>User Details</h3>

            <div key={users.id}>

                <div className="user-profile-box">
                    {users.userPhotoUrl ? (
                        <img
                            src={users.userPhotoUrl}
                            alt="Header"
                            style={{ width: "150px", height: "150px", objectFit: "cover", marginRight: "15px" }}
                        />
                    ) : null}
                    <div className="user-details-info">
                    <div>Name: {users.name}</div>
                    <div>User Description: {users.userDescription}</div>
                    </div>

                </div>
            </div>

        </>
    )
}