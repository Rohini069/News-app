import React, { useEffect, useState } from "react";
import NavbarComponent from "./Navbar";
import { Container } from "react-bootstrap";

import PaginationComponent from "../Pagination/Pagination";
import Grid from "../Grid/Grid";
import { URL } from "../../utils/constants.js";
import { ITEMS_PER_PAGE } from "../../utils/constants.js";

const NavbarHandling = () => {
  const categories = [
    "Business",
    "Technology",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
  ];
  const [selectedCategory, setSelectedCategory] = useState("Business");
  const [mynews, setMyNews] = useState([]);
  const [page, setPage] = useState();
  const [totalPages, setTotalPages] = useState();

  const fetchData = async (category) => {
    try {
      let response = await fetch(URL);
      let data = await response.json();
      setMyNews(data.results);
      console.log(data.results);
      setTotalPages(Math.ceil(data.totalResults / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching data:", error);
      setMyNews([]);
    }
  };

  useEffect(() => {
    fetchData(selectedCategory, page);
  }, [selectedCategory, page]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <NavbarComponent
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
      <Container>
        <Grid />
        <PaginationComponent
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
};

export default NavbarHandling;
