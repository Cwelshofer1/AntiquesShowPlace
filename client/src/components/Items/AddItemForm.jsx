import { useEffect, useState } from "react"
import { CreateItem } from "../managers/itemManager"
import { useNavigate } from "react-router-dom"
import { GetCategories } from "../managers/categorymanager"


export const AddItem = (loggedInUser) => {

    const [item, setItem] = useState({ isAntique: false, isSeller: false });
    const [category, setAllCategories] = useState([])


    const navigate = useNavigate()

       useEffect(() => {
        GetCategories().then(setAllCategories)
    }, [])


    const handleSave = (evt) => {
        evt.preventDefault()
        const newItem = {
            name: item.name,
            description: item.description,
            yearMade: item.yearMade,
            isAntique: item.isAntique,
            isSeller: item.isSeller,
            price: item.price,
            itemPhotoUrl: item.itemPhotoUrl,
            userId: loggedInUser.id,
            categoryId: item.categoryId

        }
        CreateItem(newItem).then(() => {
            navigate(`/allitems`)
        })
    }

    return (
        <form>
            <h2 className="header">Add a new Item to the list!</h2>
            <div className="form-container">
                <div className="form-box">
                    <fieldset>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={item?.name}
                                onChange={(evt) => {
                                    const copy = { ...item }
                                    copy.name = evt.target.value
                                    setItem(copy)
                                }}
                                required
                                className="form-container" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label>Description:</label>
                            <input
                                type="text"
                                value={item?.Description}
                                onChange={(evt) => {
                                    const copy = { ...item }
                                    copy.description = evt.target.value
                                    setItem(copy)
                                }}
                                required
                                className="form-container" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label>Year Made:</label>
                            <input
                                type="number"
                                placeholder="Enter year made (If known)"
                                value={item?.yearMade}
                                onChange={(evt) => {
                                    const copy = { ...item }
                                    copy.yearmade = evt.target.value
                                    setItem(copy)
                                }}
                                required
                                className="form-container" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label>Is it a antique? (Over 100 years old?):</label>
                                <input
                                    type="checkbox"
                                    checked={item?.isAntique}
                                    onChange={(evt) => {
                                        const copy = { ...item }
                                        copy.isAntique = evt.target.checked
                                        setItem(copy)
                                    }}
                                    required
                                    className="form-container" />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label>Do you want to post this item as for sale?:</label>
                                <input
                                    type="checkbox"
                                    checked={item?.isSeller}
                                    onChange={(evt) => {
                                        const copy = { ...item }
                                        copy.isSeller = evt.target.checked
                                        setItem(copy)
                                    }}
                                    required
                                    className="form-container" />
                            </div>
                        </fieldset>

                        {item.isSeller === true ? (
                            <div>
                                <fieldset>
                                    <div className="form-group">
                                        <label>Price: </label>
                                        <input
                                            type="number"
                                            placeholder="Enter a price"
                                            value={item?.Price}
                                            onChange={(evt) => {
                                                const copy = { ...item }
                                                copy.price = evt.target.value
                                                setItem(copy)
                                            }}
                                            required
                                            className="form-container" />
                                    </div>
                                </fieldset>

                            </div>
                        ) : (
                            <></>

                        )}
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label>Profile Image: </label>
                            <input type="file"
                                value={item.itemPhotoUrl}
                                accept="image/*"
                                onChange={(evt) => {
                                    const copy = { ...item }
                                    copy.itemPhotoUrl = evt.target.value
                                    setItem(copy)
                                }}

                            />
                        </div>
                    </fieldset>

                    <select
                        value={item?.categoryId}
                        onChange={(evt) => {
                            const copy = { ...item }
                            copy.categoryId = parseInt(evt.target.value)
                            setCategory(copy)

                        }}>
                        <option value="0">Select a category</option>
                        {category.map(categorys => (

                            <option key={categorys.id} 
                            value={categorys.id} >
                            {categorys.name}
                            </option>
                        ))}
                    </select>


                    <div className="form-group">
                        <button onClick={handleSave}
                            className="new-tag-button">Save Antique</button>
                    </div>

                </div>
            </div>
        </form>
    )


}