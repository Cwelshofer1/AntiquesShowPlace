import { useEffect, useState } from "react"
import { CreateItem } from "../managers/itemManager"
import { useNavigate } from "react-router-dom"
import { GetCategories } from "../managers/categorymanager"
import { CreateComment } from "../managers/commentmanager"
import { useParams } from "react-router-dom"
import "./comment.css"



export const AddComment = ({ loggedInUser, setLoggedInUser }) => {

    const [item, setItem] = useState({ isAntique: false, isSeller: false });
    const [comment, setComment] = useState({ message: "", datePosted: ""})

    const { id } = useParams()

    const navigate = useNavigate()


    const handleSave = (evt) => {
        evt.preventDefault()
        const newComment = {
            message: comment.message,
            datePosted: new Date().toISOString(),
            userId: loggedInUser.id,
            itemId: parseInt(id)
         

        }
        CreateComment(newComment)
        navigate(`/itemdetails/${id}`)
    }

    return (
        <form>
            <h2 className="header">Add a new Comment!</h2>
            <div className="form-container">
                <div className="form-box">
                    <fieldset>
                        <div className="form-group">
                            <label>New Comment: </label>
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
                            className="new-comment-button">Add Comment</button>
                    </div>
                   

                </div>
            </div>
        </form>
    )


}
