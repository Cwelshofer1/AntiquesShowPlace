import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { GetUserProfiles } from "../managers/userprofilemanager";
import { GetCategories } from "../managers/categorymanager";
import { useParams, useNavigate } from "react-router-dom";
import { GetItemById } from "../managers/itemManager";
import { DeleteComment, GetComments } from "../managers/commentmanager";
import { tryGetLoggedInUser } from "../managers/authmanager";

export const ItemDetails = () => {

    const [allItems, setAllItems] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [allComments, setAllComments] = useState([])
    const [loggedInUser, setLoggedInUser] = useState(null);


    const { id } = useParams()


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
        GetUserProfiles().then(setAllUsers)
    }, [])

    useEffect(() => {
        tryGetLoggedInUser().then(user => {
            setLoggedInUser(user);
        });
    }, []);

        const handleCommentDelete = (comment) => {
            DeleteComment(comment).then(GetComments).then((commentArray) => {
                if (loggedInUser) {
                    const comments = commentArray.filter(
                        (comment) => loggedInUser && loggedInUser.id === comment.userId)
                    setAllItems(comments)
                }
            })
        }


    return (
        <>
            {allItems.map((item) => (
                <div key={item.id}>
                    <div>Name: {item.name}</div>
                    <div>Description: {item.description}</div>
                    <div>Year Made: {item.yearMade}</div>
                    <div>Item is an Antique?: {item.isAntique.toString()}</div>
                    <div>Is for sell?: {item.isSeller.toString()}</div>
                    <div>Sellers Price: {item.price}</div>
                     
                    {allUsers
                        .filter((user) => user.id === item.userId)
                        .map((user) => (
                            <div key={user.id}>Seller: {user.name}</div>
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
                                            <button>Delete Item</button><button>Edit Item</button>
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
                                        <>
                                        <div key={user.id}>Author:  {user.name}</div>
                                        </>
                                    ))}
                                    <div>Date Posted: {comment.datePosted}</div>
                                    {loggedInUser && loggedInUser.id === comment.userId && (
                                        <>
                                            <button onClick={handleCommentDelete}>Delete Comment</button><button>Edit Comment</button>
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