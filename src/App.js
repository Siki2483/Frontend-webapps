import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Locations from "./components/Locations";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LocationDetails from "./pages/LocationDetails";
import RestaurantDetails from "./pages/RestaurantDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lokacije" element={<Locations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lokacije/:id" element={<LocationDetails />} />
        <Route path="/restorani/:id" element={<RestaurantDetails />} />

      </Routes>
    </Router>
  );
}

export default App;
