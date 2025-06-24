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
import { EditProfile } from "./components/UserProfiles/EditProfile";



export default function ApplicationViews({ loggedInUser, setLoggedInUser, handleLogin }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />

        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}
        />

        <Route
          path="allitems"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <AllItems setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="additem"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <AddItem setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="myitems"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <MyItems setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />


        <Route
          path="myitems/edititem/:id"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <EditItem setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="itemdetails/:id/edititem/:id"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <EditItem setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="addcategory"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <NewCategoryForm setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="itemdetails/:id"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <ItemDetails setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />


        <Route
          path="itemdetails/:id/addcomment"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <AddComment setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        
        <Route
          path="itemdetails/:id/editcomment/:id"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <EditComment setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

          
         <Route
          path="allusers"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <AllUsers setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
         <Route
          path="userdetails/:id"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <UserDetails setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="myprofile/:id"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <MyProfile setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

    <Route
          path="myprofile/editprofile/:id"
          element={
            <AuthorizedRoute setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}>
              <EditProfile setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

      </Route>
    </Routes>
  );
}
