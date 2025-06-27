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
            <h1>My Items</h1>
            {allItems.map((item) => (
                <div key={item.id}>
                    <div className="item-box">
                        <img className="allitems-image"
                            src={item.itemPhotoUrl}
                            alt="Header"
                            style={{ width: "250px", height: "200px", objectFit: "cover", marginRight: "15px" }}
                        />
                        <div className="my-items-content">
                            <div className="item-text">
                                <div className="my-items-info">
                                    <Link onClick={() => window.scrollTo(0, 0)} key={item.id} to={`/itemdetails/${item.id}`}>
                                    <div><b>{item.name}</b></div>
                                    </Link>
                                    {allCategories
                                        .filter((category) => category.id === item.categoryId)
                                        .map((category) => (
                                            <div key={category.id}><b>Category:</b> {category.name}</div>
                                        ))}
                                </div>
                            </div>

                            <div>
                                <button className="my-items-buttons" onClick={() => handleItemDelete(item.id)}>Delete item</button>
                                <Link to={`edititem/${item.id}`}>
                                    <button className="my-items-buttons" >Edit item </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}