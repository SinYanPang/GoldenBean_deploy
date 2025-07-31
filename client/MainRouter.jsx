import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users.jsx";
import Signup from "./user/Signup.jsx";
import Signin from "./lib/Signin.jsx";
import Profile from "./user/Profile.jsx";
import PrivateRoute from "./lib/PrivateRoute.jsx";
import EditProfile from "./user/EditProfile.jsx";
import About from "./core/About.jsx";
import MenuTab from "./core/MenuTab.jsx";
import Order from "./core/Order.jsx";
import OrderList from "./core/OrderList.jsx";

import Menu from "./core/Menu";

function MainRouter() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<MenuTab />} />

        {/* Protected routes */}
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route
          path="/orderlist"
          element={
            <PrivateRoute>
              <OrderList />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default MainRouter;