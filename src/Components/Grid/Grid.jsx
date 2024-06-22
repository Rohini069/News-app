import React, { useEffect, useState } from "react";
import CardComponent from "../Card/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PaginationComponent from "../Pagination/Pagination";
import { PAGE_FILTER, URL } from "../../utils/constants.js";
import { ITEMS_PER_PAGE } from "../../utils/constants.js";
// import { useNavigate } from "react-router-dom";

const Grid = () => {
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
  // const navigate = useNavigate();

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
    }
  };

  useEffect(() => {
    fetchData(selectedCategory, page);
  }, [selectedCategory, page]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handlePageChange = async (newPage) => {
    let response = await fetch(URL + PAGE_FILTER + newPage);
  };

  if (!mynews || mynews.length === 0) {
    return <p>No news available.</p>;
  }
  console.log(mynews);
  return (
    <>
      <Container>
        <h1 style={{ justifyContent: "center", textAlign: "center" }}>
          <u>WELCOME TO TOP-HEADLINES</u>
        </h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          {mynews.slice(0, -1).map((newsItem, index) => (
            <Col key={index}>
              <CardComponent
                id={newsItem.article_id}
                title={newsItem.title}
                description={newsItem.description}
                imageUrl={newsItem.image_url}
                link={newsItem.link}
                category={newsItem.category.join(", ")}
              />
            </Col>
          ))}
        </Row>
        <PaginationComponent
          currentPage={page}
          totalPages={Math.ceil(mynews.length / ITEMS_PER_PAGE)}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
};

export default Grid;
