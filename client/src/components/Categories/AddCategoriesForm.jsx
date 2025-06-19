import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CreateCategory, GetCategories } from "../managers/categorymanager"



export const NewCategoryForm = () => {

    const [categorys, setAllCategories] = useState("")
    const [categoryList, setCategoryList] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
            GetCategories().then(setCategoryList)
        }, [categoryList])

    const handleSave = (evt) => {
        evt.preventDefault()
         const newCategory = {
            name: categorys.name
        }
        CreateCategory(newCategory).then(() => {
            setAllCategories("")
            
        })
    }

    return (

        <form>
            <h2 className="header">Add a new Category to the list</h2>
            <div className="form-container">
                <h3>Current list of Categories: </h3>
                <div className="form-box">
                    {categoryList.map((category) => (
                        <div key={category.id}>{category.name}</div>
                    ))}


                    <fieldset>
                        <div className="form-group">
                            <h3>Add New Category</h3>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={categorys?.name || ""}
                                onChange={(evt) => {
                                    const copy = { ...categorys }
                                    copy.name = evt.target.value
                                    setAllCategories(copy)
                                }}
                                required
                                className="form-container" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            
                            <button onClick={handleSave}
                                className="new-tag-button">Save Category</button>
                        </div>
                    </fieldset>
                </div>
            </div>
        </form>
    )
}
