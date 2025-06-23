import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { GetCommentById, UpdateComment } from "../managers/commentmanager"
import { GetUserById } from "../managers/userprofilemanager"


export const EditComment = (loggedInUser) => {

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
        const editedComment = {
            id: comment.id,
            message: comment.message,          
        }
        UpdateComment(editedComment).then(() => {
            navigate(-1)
        })
    }

    return (
        <form>
            <h2 className="header">Edit Comment</h2>
            <div className="form-container">
                <div className="form-box">
                    <fieldset>
                        <div className="form-group">
                            <label>Your Message: </label>
                            <input
                                type="text"
                                value={comment?.message || ""}
                                onChange={(evt) => {
                                    const copy = { ...comment }
                                    copy.message = evt.target.value
                                    setComment(copy)
                                }}
                                required
                                className="form-container" />
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