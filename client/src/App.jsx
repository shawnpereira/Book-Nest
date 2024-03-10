import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

const App = () => {
  return (
    <div className="bg-blue-200 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBook />} />
        <Route path="/delete/:id" element={<DeleteBook />} />
        <Route path="/details/:id" element={<ShowBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </div>
  );
};

export default App;
