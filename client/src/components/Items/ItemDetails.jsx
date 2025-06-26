import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { GetUserProfiles } from "../managers/userprofilemanager";
import { GetCategories } from "../managers/categorymanager";
import { useParams, useNavigate } from "react-router-dom";
import { GetItemById } from "../managers/itemManager";
import { DeleteComment, GetComments } from "../managers/commentmanager";
import { tryGetLoggedInUser } from "../managers/authmanager";
import { CreateCommentLike, DeleteCommentLike, GetCommentLikes } from "../managers/commentlikesmanager";
import { DeleteItem } from "../managers/itemManager";
import { GetItems } from "../managers/itemManager";
import { CreateItem } from "../managers/itemManager";
import "./items.css"

export const ItemDetails = () => {

    const [allItems, setAllItems] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [allComments, setAllComments] = useState([])
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [commentLikes, setCommentLikes] = useState([])



    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        GetComments().then(setAllComments)
    }, [])

    useEffect(() => {
        GetItemById(id).then((data) => {
            const itemObj = data
            setAllItems([itemObj])
        })
    }, [id])

    useEffect(() => {
        GetUserProfiles().then(setAllUsers)
    }, [])

    useEffect(() => {
        GetCategories().then(setAllCategories)
    }, [])

    useEffect(() => {
        GetComments().then(setAllComments)
    }, [])


    useEffect(() => {
        GetCommentLikes().then(setCommentLikes)
    }, [])




    useEffect(() => {
        tryGetLoggedInUser().then(user => {
            setLoggedInUser(user);
        });
    }, []);

    const handleCommentDelete = (commentId) => {
        DeleteComment(commentId).then(GetComments).then((commentArray) => {
            setAllComments(commentArray)

        })
    }

    const handleItemDelete = (item) => {
        DeleteItem(item).then(GetItems).then(() => {
            if (loggedInUser) {
                (navigate("/myItems"))
            }
        })
    }

    const handleAddComment = (comment) => {
        GetComments.then(setAllComments)
    }



    return (
        <>
            <h3>Item Details</h3>
            {allItems.map((item) => (
                <div key={item.id}>
                    <div className="details-box">
                        <img
                            src={item.itemPhotoUrl}
                            alt="Header"
                            style={{ width: "200px", height: "150px", objectFit: "cover", marginRight: "15px" }}
                        />
                        <div><b>Name:</b> {item.name}</div>
                        <div><b>Description:</b> {item.description}</div>
                        <div><b>Year Made:</b> {item.yearMade}</div>
                        <div><b>Item is an Antique?:</b> {item?.isAntique.toString()}</div>
                        {item.isSeller === true ? (
                            <>
                                <div><b>Is for sell?:</b> {item?.isSeller.toString()}</div>
                                <div><b>Sellers Price:</b> ${item.price}</div>
                            </>
                        ) : ""}

                        {allUsers
                            .filter((user) => user.id === item.userId)
                            .map((user) => (
                                <div key={user.id}><b>Author:</b> {user.name}</div>
                            ))}
                        {allCategories
                            .filter((category) => category.id === item.categoryId)
                            .map((category) => (
                                <div key={category.id}><b>Category:</b>  {category.name}</div>
                            ))}



                        {loggedInUser && loggedInUser.id === item.userId && (
                            <>
                                <button className="user-delete-btn" onClick={() => handleItemDelete(item.id)}>Delete item</button>
                                <Link to={`edititem/${item.id}`}>
                                    <button className="user-delete-btn">Edit item </button>
                                </Link>
                            </>

                        )}
                    </div>
                    <h1>Comments:</h1>
                    {allComments
                        .filter((comment) => item.id === comment.itemId)
                        .map((comment) => (
                            <div key={comment.id} className="details-comment-box">
                                <div className="details-info">
                                    
                                    <div className="comment-content">
                                        <div className="comment-message">
                                            {comment.message}
                                        </div>
                                    </div>

                                    {allUsers
                                        .filter((user) => user.id === comment.userId)
                                        .map((user) => (
                                            <div key={user.id}>
                                                <div>
                                                    <div className="author-info">
                                                        <b></b>Author: {user.name}
                                                    </div>
                                                    <div className="date-info">
                                                        Date Posted: {new Date(comment.datePosted).toLocaleDateString('en-US', {
                                                           
                                                        })}
                                                    </div>
                                                    {commentLikes.filter((commentlike) => commentlike.commentId === comment.id).length > 0 && (
                                                        <div className="likes-info">
                                                            Likes: {commentLikes.filter((commentlike) => commentlike.commentId === comment.id).length}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                   
                                    <div className="comment-actions">
                                        <div className="like-actions">
                                            {commentLikes.find((commentLike) => commentLike.commentId === comment.id && commentLike.userId === loggedInUser?.id) ? (
                                                <button
                                                    className="unlike-btn"
                                                    onClick={(evt) => {
                                                        evt.preventDefault();
                                                        if (loggedInUser) {
                                                            const commentLikeToDelete = commentLikes.find((commentLike) => commentLike.commentId === comment.id && commentLike.userId === loggedInUser.id);
                                                            if (commentLikeToDelete) {
                                                                DeleteCommentLike(commentLikeToDelete.id).then(() => {
                                                                    GetCommentLikes().then(setCommentLikes);
                                                                });
                                                            }
                                                        }
                                                    }}
                                                >
                                                    Unlike Comment
                                                </button>
                                            ) : (
                                                <button
                                                    className="like-btn"
                                                    onClick={(evt) => {
                                                        evt.preventDefault();
                                                        if (loggedInUser) {
                                                            const newCommentLike = {
                                                                userId: loggedInUser.id,
                                                                commentId: comment.id
                                                            };
                                                            CreateCommentLike(newCommentLike).then(() => {
                                                                GetCommentLikes().then(setCommentLikes);
                                                            });
                                                        }
                                                    }}
                                                >
                                                    Like Comment
                                                </button>
                                            )}
                                        </div>

                                        {loggedInUser && loggedInUser.id === comment.userId && (
                                            <div className="user-actions">
                                                <button
                                                    className="user-edit-btns"
                                                    onClick={() => handleCommentDelete(comment.id)}
                                                >
                                                    Delete Comment
                                                </button>
                                                <Link onClick={() => window.scrollTo(0, 0)} to={`/itemdetails/${id}/editcomment/${comment.id}`}>
                                                    <button className="user-edit-btns">Edit Comment</button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}


                    <Link onClick={() => window.scrollTo(0, 0)} key={item.id} to={`/itemdetails/${id}/addcomment`}>
                        <button className="user-add-comment">Add Comment</button>
                    </Link>
                </div>
            ))}
        </>
    )
}