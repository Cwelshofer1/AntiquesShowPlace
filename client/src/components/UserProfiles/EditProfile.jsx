import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { GetCommentById, UpdateComment } from "../managers/commentmanager"
import { GetUserById, UpdateProfile } from "../managers/userprofilemanager"


export const EditProfile = (loggedInUser) => {

    const [userProfile, setUserProfile] = useState([]);

    const { id } = useParams()


    const navigate = useNavigate()

    useEffect(() => {
        GetUserById(id).then((data) => {
            const userObj = data
            setUserProfile(userObj)
        })
    }, [id])



    const handleSave = (evt) => {
        evt.preventDefault()
        const editedProfile = {
            id: userProfile.id,
            name: userProfile.name,
            email: userProfile.email,
            userDescription: userProfile.userDescription,
            userPhotoUrl: userProfile.userPhotoUrl
        }
        UpdateProfile(editedProfile).then(() => {
            navigate(`/myprofile/${id}`)
        })
    }

    return (
        <form>
            <h2 className="header">Edit Profile</h2>
            <div className="form-container">
                <div className="form-box">
                    <fieldset>
                        <div className="form-group">
                            <label>Profile name: </label>
                            <input
                                type="text"
                                value={userProfile?.name || ""}
                                onChange={(evt) => {
                                    const copy = { ...userProfile }
                                    copy.name = evt.target.value
                                    setUserProfile(copy)
                                }}
                                required
                                className="form-container" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label>Email: </label>
                            <input
                                type="text"
                                value={userProfile?.email || ""}
                                onChange={(evt) => {
                                    const copy = { ...userProfile }
                                    copy.email = evt.target.value
                                    setUserProfile(copy)
                                }}
                                required
                                className="form-container" />
                        </div>
                    </fieldset>

                         <fieldset>
                        <div className="form-group">
                            <label>User Description: </label>
                            <input
                                type="text"
                                value={userProfile?.userDescription || ""}
                                onChange={(evt) => {
                                    const copy = { ...userProfile }
                                    copy.userDescription = evt.target.value
                                    setUserProfile(copy)
                                }}
                                required
                                className="form-container" />
                        </div>
                    </fieldset>

                           <img
                        src={userProfile?.userPhotoUrl}
                        alt="UserPhotoUrl"
                        style={{ width: "200px", height: "150px", objectFit: "cover", marginRight: "15px" }}
                    />
                    <fieldset>
                        <div className="form-group">
                            <label>User image: </label>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                {userProfile.userPhotoUrl ? "Change Image" : "Upload Image"}
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(evt) => {
                                    const copy = { ...userProfile }
                                    const file = evt.target.files[0];
                                    const reader = new FileReader();

                                    reader.onloadend = () => {
                                        copy.userPhotoUrl = reader.result;
                                        setUserProfile(copy);
                                    }
                                    if (file) {
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </div>
                    </fieldset>

                    <div className="form-group">
                        <button onClick={handleSave}
                            className="new-antique-button">Save New Comment</button>
                    </div>

                </div>
            </div>
        </form>
    )


}