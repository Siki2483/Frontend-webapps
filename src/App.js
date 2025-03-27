import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Locations from "./pages/Locations";
import Restaurants from "./pages/Restaurants";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LocationDetails from "./pages/LocationDetails";
import RestaurantDetails from "./pages/RestaurantDetails";
import Profile from "./pages/Profile";
import AddLocation from "./pages/AddLocation";
import AddRestaurant from "./pages/AddRestaurants";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar /> {}

      <Routes>
        {/* tvoje rute */}
      </Routes>
    </Router>,

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lokacije" element={<Locations />} />
        <Route path="/restorani" element={<Restaurants />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lokacije/:id" element={<LocationDetails />} />
        <Route path="/restorani/:id" element={<RestaurantDetails />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/dodaj-lokaciju" element={<Admin><AddLocation /> </Admin> } />
        <Route path="/dodaj-restoran" element={<Admin><AddRestaurant /></Admin> } />
      </Routes>
    </Router>
  );
}

export default App;
