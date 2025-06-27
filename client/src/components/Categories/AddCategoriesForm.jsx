import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CreateCategory, GetCategories } from "../managers/categorymanager"
import './category.css'



export const NewCategoryForm = () => {

    const [categorys, setAllCategories] = useState("")
    const [categoryList, setCategoryList] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        GetCategories().then(setCategoryList)
    }, [])


    const handleSave = (evt) => {
        evt.preventDefault()
        const newCategory = {
            name: categorys.name
        }
        CreateCategory(newCategory).then(() => {
            GetCategories().then(setCategoryList).then(setAllCategories(""))

        })
    }

    return (

        <form>
            <h2 className="category-title">Add a new Category to the list</h2>
            <div className="category-container">
                <h3>Current list of Categories: </h3>
              
                    {categoryList.map((category) => (

                        <div key={category.id} className="category-box">
                            <div className="category-list">
                                <div key={category.id}> #{category.id} {category.name}</div>
                            </div>
                        </div>
                         
                    ))}
                   



                
                    <div className="category-input">
                        <h3>Add New Category</h3>
                        <label><b>Name : </b></label>
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
               
                
                    <div>

                        <button onClick={handleSave}
                            className="add-category-button">Save Category</button>
                    </div>
                

            </div>
        </form>
    )
}
