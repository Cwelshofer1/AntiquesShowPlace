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
            {allItems.map((item) => (
                <div key={item.id}>
                    <div>Name: {item.name}</div>
                    <div>Description: {item.description}</div>
                    <div>Year Made: {item.yearMade}</div>
                    <div>Item is an Antique?: {item?.isAntique.toString()}</div>
                    {item.isSeller === true ? (
                        <>
                    <div>Is for sell?: {item?.isSeller.toString()}</div>
                    <div>Sellers Price: {item.price}</div>
                    </>
                    ) : ""}

                    {allUsers
                        .filter((user) => user.id === item.userId)
                        .map((user) => (
                            <div key={user.id}>Author: {user.name}</div>
                        ))}
                    {allCategories
                        .filter((category) => category.id === item.categoryId)
                        .map((category) => (
                            <div key={category.id}>Category: {category.name}</div>
                        ))}
                    <img
                        src={item.itemPhotoUrl}
                        alt="Header"
                        style={{ width: "150px", height: "100px", objectFit: "cover", marginRight: "15px" }}
                    />
                    <div></div>

                    {loggedInUser && loggedInUser.id === item.userId && (
                        <>
                            <button onClick={() => handleItemDelete(item.id)}>Delete item</button>
                            <Link to={`edititem/${item.id}`}>
                                <button >Edit item </button>
                            </Link>
                        </>
                    )}
                    <h3>Comments:</h3>
                    {allComments
                        .filter((comment) => item.id === comment.itemId)
                        .map((comment) => (
                            <div key={comment.id}>
                                <div key={comment.id}>Comment: {comment.message}</div>

                                {allUsers
                                    .filter((user) => user.id === comment.userId)
                                    .map((user) => (
                                        <div key={user.id}>
                                            <div key={user.id}>Author:  {user.name}</div>
                                            <div>Date Posted: {comment.datePosted}</div>
                                            {commentLikes.filter((commentlike) => commentlike.commentId === comment.id)
                                                .length > 0 ? (
                                                <div>
                                                    Likes: {commentLikes.filter((commentlike) => commentlike.commentId === comment.id).length}
                                                </div>
                                            ) : null}
                                            {commentLikes.find((commentLike) => commentLike.commentId === comment.id && commentLike.userId === loggedInUser?.id) ? (
                                                <button onClick={(evt) => {
                                                    evt.preventDefault();
                                                    if (loggedInUser) {
                                                        const commentLikeToDelete = commentLikes.find((commentLike) => commentLike.commentId === comment.id && commentLike.userId === loggedInUser.id);
                                                        if (commentLikeToDelete) {
                                                            DeleteCommentLike(commentLikeToDelete.id).then(() => {
                                                                GetCommentLikes().then(setCommentLikes);
                                                            });
                                                        }
                                                    }
                                                }}>Unlike Comment</button>
                                            ) : (
                                                <button onClick={(evt) => {
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
                                                }}>Like Comment</button>
                                            )}
                                        </div>
                                    ))}

                                {loggedInUser && loggedInUser.id === comment.userId && (
                                    <>
                                        <button onClick={() => handleCommentDelete(comment.id)}>Delete Comment</button>

                                        <Link onClick={() => window.scrollTo(0, 0)} key={item.id} to={`/itemdetails/${id}/editcomment/${comment.id}`}>
                                            <button>Edit Comment</button>
                                        </Link>

                                    </>
                                )}


                            </div>
                        ))}


                    <Link onClick={() => window.scrollTo(0, 0)} key={item.id} to={`/itemdetails/${id}/addcomment`}>
                        <button>Add Comment</button>
                    </Link>
                </div>
            ))}
        </>
    )
}