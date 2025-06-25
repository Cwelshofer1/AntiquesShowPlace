import { useState, useEffect } from "react";
import { GetItems } from "../managers/itemManager";
import { GetUserProfiles } from "../managers/userprofilemanager";
import { GetCategories } from "../managers/categorymanager";
import { tryGetLoggedInUser } from "../managers/authmanager";
import { Link } from "react-router-dom";
import './items.css'
export const AllItems = () => {

    const [allItems, setAllItems] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [allCategories, setAllCategories] = useState([])



    useEffect(() => {
        GetItems().then(setAllItems)
    }, [])

    useEffect(() => {
        GetUserProfiles().then(setAllUsers)
    }, [])

    useEffect(() => {
        GetCategories().then(setAllCategories)
    }, [])


    return (
        <>
            <h1 className="all-items-header">All Items</h1>
            {allItems.map((item) => (
                <div key={item.id}>
                    
                    <div className="item-box">
                        <img className="allitems-image"
                            src={item.itemPhotoUrl}
                            alt="Header"
                            style={{ width: "200px", height: "150px", objectFit: "cover", marginRight: "15px" }}
                        />
                        <div className="item-content">
                            <Link onClick={() => window.scrollTo(0, 0)} key={item.id} to={`/itemdetails/${item.id}`}>
                                <div className="item-name">{item.name}</div>
                            </Link>
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
                                </div>
                        </div>
                    </div>
            ))}
                </>
            )
}