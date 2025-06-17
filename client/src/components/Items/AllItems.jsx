import { useState, useEffect } from "react";
import { GetItems } from "../managers/itemManager";

export const AllItems = () => {

const [allItems, setAllItems] = useState([])

useEffect(() => {
GetItems().then(setAllItems)
}, [])

return (
    <>
    {allItems.map((item) =>  (
        <div key={item.id}>
        <div>Name: {item.name}</div>
        <div>Description: {item.description}</div>
        <div>Year Made: {item.yearMade}</div>
        <div>Item is an Antique?: {item.isAntique.toString()}</div>
        <div>Is for sell?: {item.isSeller.toString()}</div>
        <div>Sellers Price: {item.price}</div>

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