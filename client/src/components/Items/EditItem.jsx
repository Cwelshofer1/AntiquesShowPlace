import { useEffect, useState } from "react"
import { GetItemById, UpdateItem } from "../managers/itemManager"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { GetCategories } from "../managers/categorymanager"
import { useLocation } from "react-router-dom";


export const EditItem = (loggedInUser) => {

    const [item, setItem] = useState({ isAntique: false, isSeller: false });
    const [category, setAllCategories] = useState([])

    const location = useLocation();

    const { id } = useParams()



    const navigate = useNavigate()

    useEffect(() => {
        GetItemById(id).then((data) => {
            const itemObj = data
            setItem(itemObj)
        })
    }, [id])

    useEffect(() => {
        GetCategories().then(setAllCategories)
    }, [])

    const handleSave = (evt) => {
        evt.preventDefault()
        const editedItem = {
            id: item.id,
            name: item.name,
            description: item.description,
            yearMade: item.yearMade,
            isAntique: item.isAntique,
            isSeller: item.isSeller,
            price: item.price,
            itemPhotoUrl: item.itemPhotoUrl,
            userId: loggedInUser.loggedInUser.id,
            categoryId: item.categoryId

        }
        UpdateItem(editedItem).then(() => {
            if (location.pathname.includes("itemdetails")) {
                navigate(`/itemdetails/${id}/`)
            } else {
                navigate(`/myitems`)
            }
        })
    }

    return (
        <form>
            <h2 className="header">Edit Item</h2>
            <div className="form-container">
                <div className="form-box">

                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={item?.name || ""}
                            onChange={(evt) => {
                                const copy = { ...item }
                                copy.name = evt.target.value
                                setItem(copy)
                            }}
                            required
                            className="form-container" />
                    </div>


                    <div className="edit-description">
                        <label>Description:</label>
                        <input
                            type="text"
                            value={item?.description || ""}
                            onChange={(evt) => {
                                const copy = { ...item }
                                copy.description = evt.target.value
                                setItem(copy)
                            }}
                            required
                            className="form-container" />
                    </div>


                    <div className="edit-year">
                        <label>Year Made:</label>
                        <input
                            type="number"
                            placeholder="Enter year made (If known)"
                            value={item?.yearMade || ""}
                            onChange={(evt) => {
                                const copy = { ...item }
                                copy.yearMade = evt.target.value
                                setItem(copy)
                            }}
                            required
                            className="form-container" />
                    </div>



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


                    {item.isSeller === true ? (
                        <div>

                            <div className="edit-price">
                                <label><b>Price:</b> </label>
                                <input
                                    type="number"
                                    placeholder="Enter a price"
                                    value={item?.price || ""}
                                    onChange={(evt) => {
                                        const copy = { ...item }
                                        copy.price = evt.target.value
                                        setItem(copy)
                                    }}
                                    required
                                    className="form-container" />
                            </div>


                        </div>
                    ) : (
                        <></>

                    )}

                    <img
                        src={item?.itemPhotoUrl}
                        alt="Item"
                        style={{ width: "200px", height: "150px", objectFit: "cover", marginRight: "15px" }}
                    />

                    <div className="form-group">
                        <label>Item image: </label>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            {item.itemPhotoUrl ? "Change Image" : "Upload Image"}
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(evt) => {
                                const copy = { ...item }
                                const file = evt.target.files[0];
                                const reader = new FileReader();

                                reader.onloadend = () => {
                                    copy.itemPhotoUrl = reader.result;
                                    setItem(copy);
                                }
                                if (file) {
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>

                    
                    <select
                        value={item?.categoryId || 0}
                        onChange={(evt) => {
                            const copy = { ...item }
                            copy.categoryId = parseInt(evt.target.value)
                            setItem(copy)

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
                            className="new-antique-button">Save Antique</button>
                    </div>

                </div>
            </div>
        </form>
    )


}