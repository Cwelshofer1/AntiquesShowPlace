import { useState, useEffect } from "react";
import { GetItems } from "../managers/itemManager";
import { GetUserProfiles } from "../managers/userprofilemanager";
import { GetCategories } from "../managers/categorymanager";
import { Link } from "react-router-dom";
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
            {allItems.map((item) => (
                <div key={item.id}>
                    <Link  onClick={() => window.scrollTo(0, 0)}key={item.id} to={`/itemdetails/${item.id}`}>
                        <div className="item-name">{item.name}</div>
                         </Link>
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
                </div>
            ))}
        </>
    )
}