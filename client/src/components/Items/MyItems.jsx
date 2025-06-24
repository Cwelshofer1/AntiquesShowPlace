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
        <h3>My Items</h3>
            {allItems.map((item) => (
                <div key={item.id}>
                    <div className="item-box">
                        <img className="allitems-image"
                            src={item.itemPhotoUrl}
                            alt="Header"
                            style={{ width: "200px", height: "150px", objectFit: "cover", marginRight: "15px" }}
                        />
                        <div className="my-items-content">
                    <div>Name: {item.name}</div>
                    {allCategories
                        .filter((category) => category.id === item.categoryId)
                        .map((category) => (
                            <div key={category.id}>Category: {category.name}</div>
                        ))}
                        <div className="myitems-buttons">
                    <button onClick={() => handleItemDelete(item.id)}>Delete item</button>
                    <Link to={`edititem/${item.id}`}>
                        <button >Edit item </button>
                    </Link>
                    </div>
                     </div>
                        </div>
                </div>
            ))}
        </>
    )
}