import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { URL } from "../../utils/constants.js";
import { ITEMS_PER_PAGE } from "../../utils/constants.js";

const NavbarComponent = () => {
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      let response = await fetch(URL);
      let data = await response.json();
      setMyNews(data.results);
      console.log(data.results);
      setTotalPages(Math.ceil(data.totalResults / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching data:", error);
      setMyNews([]);
      set(1);
    }
  };

  useEffect(() => {
    fetchData(selectedCategory, page);
  }, [selectedCategory, page]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">
            <b>
              <u>My News App</u>
            </b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <Nav.Link
                    style={{ margin: "2px" }}
                    key={category}
                    active={
                      category === selectedCategory
                        ? "primary"
                        : "outline-primary"
                    }
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </Nav.Link>
                ))
              ) : (
                <Nav.Link disabled>No categories available</Nav.Link>
              )}
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
