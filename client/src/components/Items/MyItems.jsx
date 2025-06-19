import { useState, useEffect } from "react";
import { GetItems } from "../managers/itemManager";
import { GetUserProfiles } from "../managers/userprofilemanager";
import { DeleteItem } from "../managers/itemManager";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GetCategories } from "../managers/categorymanager";

export const MyItems = (loggedInUser) => {

    const [allItems, setAllItems] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [allCategories, setAllCategories] = useState([])

    const navigate = useNavigate()


    useEffect(() => {
        GetUserProfiles().then(setAllUsers)
    }, [])

     useEffect(() => {
        GetCategories().then(setAllCategories)
    }, [])


    const getAndSetItems = () => {
        GetItems().then((itemsArray) => {
            if (loggedInUser) {
                const userItems = itemsArray.filter(
                    (item) => item?.userId === loggedInUser?.loggedInUser.id)
                setAllItems(userItems)
            }
        })
    }

    const handleItemDelete = (item) => {
        DeleteItem(item).then(GetItems).then((itemsArray) => {
            if (loggedInUser) {
                const userItems = itemsArray.filter(
                    (item) => item?.userId === loggedInUser?.loggedInUser.id)
                setAllItems(userItems)
            }
        })
    }

    useEffect(() => {
        getAndSetItems()
    }, [loggedInUser])

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
                    <button onClick={() => handleItemDelete(item.id)}>Delete item</button>
                    <Link to={`edititem/${item.id}`}>
                        <button>Edit item </button>
                    </Link>
                </div>
            ))}
        </>
    )
}