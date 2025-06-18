import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./components/auth/AuthorizedRoute";
import { Login } from "./components/auth/Login";
import { Home } from "./components/home/Homepage";
import { AllItems } from "./components/Items/AllItems";
import Register from "./components/auth/Register";
import { AddItem } from "./components/Items/AddItemForm";
import { MyItems } from "./components/Items/MyItems";
import { EditItem } from "./components/Items/EditItem";



export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
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
          element={<Login setLoggedInUser={setLoggedInUser} />}
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
          element={<AddItem setLoggedInUser={setLoggedInUser} loggedInUser ={loggedInUser} />}
        />

         <Route
          path="myitems"
          element={<MyItems setLoggedInUser={setLoggedInUser} loggedInUser ={loggedInUser} />}
        />

        <Route
          path="myitems/edititem/:id"
          element={<EditItem setLoggedInUser={setLoggedInUser} loggedInUser ={loggedInUser} />}
        />
      </Route>
    </Routes>
  );
}
