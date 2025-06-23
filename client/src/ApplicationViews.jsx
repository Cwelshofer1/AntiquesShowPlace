import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./components/auth/AuthorizedRoute";
import { Login } from "./components/auth/Login";
import { Home } from "./components/home/Homepage";
import { AllItems } from "./components/Items/AllItems";
import Register from "./components/auth/Register";
import { AddItem } from "./components/Items/AddItemForm";
import { MyItems } from "./components/Items/MyItems";
import { EditItem } from "./components/Items/EditItem";
import { NewCategoryForm } from "./components/Categories/AddCategoriesForm";
import { ItemDetails } from "./components/Items/ItemDetails";
import { AddComment } from "./components/comments/AddComment";
import { EditComment } from "./components/comments/EditComment";
import { AllUsers } from "./components/UserProfiles/AllUserProfiles";
import { UserDetails } from "./components/UserProfiles/UserDetails";
import { MyProfile } from "./components/UserProfiles/MyProfile";



export default function ApplicationViews({ loggedInUser, setLoggedInUser, handleLogin }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} handleLogin={handleLogin} />}
        />

        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />

        <Route
          path="allitems"
          element={<AllItems setLoggedInUser={setLoggedInUser} />}
        />

        <Route
          path="additem"
          element={<AddItem setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />

        <Route
          path="myitems"
          element={<MyItems setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />

        <Route
          path="myitems/edititem/:id"
          element={<EditItem setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />

        <Route
          path="itemdetails/:id/edititem/:id"
          element={<EditItem setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />
        <Route
          path="addcategory"
          element={<NewCategoryForm setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />

        <Route
          path="itemdetails/:id"
          element={<ItemDetails setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />

        <Route
          path="itemdetails/:id/addcomment"
          element={<AddComment setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />

        <Route
          path="itemdetails/:id/editcomment/:id"
          element={<EditComment setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />

        <Route
          path="allusers"
          element={<AllUsers setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />
         <Route
          path="userdetails/:id"
          element={<UserDetails setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />

          <Route
          path="myprofile/:id"
          element={<MyProfile setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />
      </Route>
    </Routes>
  );
}
