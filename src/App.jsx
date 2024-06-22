import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import NavbarComponent from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArticleDetail from "./Components/ArticleDetail/ArticleDetail";

function App() {
  return (
    <>
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ArticleDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
