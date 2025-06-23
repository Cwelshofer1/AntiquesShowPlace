import { useEffect, useState } from "react"
import { GetItemById, UpdateItem } from "../managers/itemManager"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { GetCategories } from "../managers/categorymanager"
import { GetCommentById, UpdateComment } from "../managers/commentmanager"


export const EditComment = (loggedInUser) => {

    const [comment, setComment] = useState([]);
   
    const { id } = useParams()
   

    const navigate = useNavigate()

    useEffect(() => {
        GetCommentById(id).then((data) => {
            const commentObj = data
            setComment(commentObj)
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